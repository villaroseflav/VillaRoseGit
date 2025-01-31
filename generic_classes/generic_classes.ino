#include <ESP8266WiFi.h>
#include <ESP8266WiFiMulti.h>
#include <PubSubClient.h>
#include <Wire.h>
#include <time.h>
#include <FS.h> // File System Library for SPIFFS

// DHT22 (temperature, humidite)
#include <DHT.h>

// CB temperature, capteur etanche
#include <OneWire.h>
#include <DallasTemperature.h>

// capteur debit YF‐ S201 Water Flow Sensor
volatile int flow_frequency = 0; // Measures flow sensor pulsesunsigned 
int l_hour; // Calculated litres/hour
unsigned char flowsensor = 4; // Sensor Input
unsigned long currentTime;
unsigned long cloopTime;

#define SEALEVELPRESSURE_HPA (1013.25)

// Wi-Fi and MQTT Setup
const char* ssid = "WiFi-2.4-...";        // Wi-Fi SSID
const char* password = "XXXXXXX"; // Wi-Fi Password
const char* mqtt_server = "192.168.1.42"; // MQTT Broker IP (use your actual broker IP)
const int mqtt_port = 1883;               // MQTT Broker port
const char* mqtt_topic = "sensor/data";   // MQTT Topic for sending data
const char* heartbeat_topic = "sensor/heartbeat"; // MQTT Topic for heartbeat todo works with multiple esps?

// MODIFIER: RENDRE UNIQUE POUR CHAQUE ESP
const char* client_id = "ESP8266Client";  // Client ID for MQTT

WiFiClient espClient;
PubSubClient mqttClient(espClient);

// Retry variables
unsigned long lastReconnectAttempt = 0;
unsigned long lastSensorReadTime = 0;
const long sensorReadInterval = 60000; // 1 minute for sensor readings
const long failureInterval = 10000;    // Retry every 10 seconds if failure
const int maxReconnectAttempts = 5;    // Max reconnect attempts before giving up

// Sensor data retry
#define MAX_RETRIES 5
#define RETRY_INTERVAL 5000   // 5 seconds between retries (initially)
#define MAX_RETRY_INTERVAL 30000  // Maximum backoff (30 seconds)
#define INTERVAL 900000 // 15 minutes in milliseconds
unsigned long previousMillis = 0;
boolean errorReading = false;

int retryCount = 0;   // Number of connection retries
int backoffDelay = 1000; // Initial backoff delay (1 second)

/*
 * PARAMETRES POUR LES SENSORS
 * 
 */

// Sensor Setup
#define DHTPIN 5         // Pin connected to DHT sensor
#define DHTTYPE DHT22    // DHT22 sensor type
//DHT dht(DHTPIN, DHTTYPE);

// SENSOR TEMPERATURE
//https://github.com/milesburton/Arduino-Temperature-Control-Library/blob/master/DallasTemperature.cpp
#define CB_SENSOR_PIN 4 // D2
#define TEMPERATURE_PRECISION 10

// Abstract base class for sensors
class Sensor {
public:
  virtual bool read(float &value1, float &value2) = 0;  // Read sensor data (temperature, humidity, etc.)
  virtual void begin() = 0;  // Initialize the sensor
};

class DHTSensor : public Sensor {
private:
  uint8_t pin;
  uint8_t type;
  DHT dht;

public:
  DHTSensor(uint8_t pin, uint8_t type) : pin(pin), type(type), dht(pin, type) {}
  
  void begin() override {
    dht.begin();
  }

  bool read(float &temperature, float &humidity) override {
    temperature = dht.readTemperature();
    humidity = dht.readHumidity();
    return !isnan(temperature) && !isnan(humidity);
  }
};

class CBSensor : public Sensor {
private:
  uint8_t pin;
  OneWire oneWire;

public:
  CBSensor(uint8_t pin): pin(pin), oneWire(pin) {}

  void begin() override {
    Serial.println("begin of dallas");
    DallasTemperature tempSensors(&oneWire); // fonctionne bien ?
    tempSensors.begin(); // a tester !
  }

  bool read(float &temperature, float &ignore) override {
    tempSensors.requestTemperatures();
    float tempC = tempSensors.getTempCByIndex(0);
    return (tempC != -127.00); 
  }
}

DHTSensor dhtSensor(DHTPIN, DHTTYPE);  // Instantiate the DHT sensor
CBSensor cbSensor(TEMP_SENSOR_PIN);






void setup() {
  Serial.begin(115200);
  delay(1000);
    
  // Initialize file system (SPIFFS)
  if (!SPIFFS.begin()) {
    Serial.println("SPIFFS mount failed. Data storage won't be available.");
  } else {
    Serial.println("SPIFFS mounted successfully.");
  }

  // Start Wi-Fi connection
  connectToWiFi();

  // Start DHT sensor
  dht.begin();
  cbSensor.begin(); //todo utile?

  // Set up MQTT client
  mqttClient.setServer(mqtt_server, mqtt_port);
}

void loop() {
  if (!mqttClient.connected()) {
    reconnectMQTT();
  }
  
  mqttClient.loop();

  // Periodically read sensor data and send it
  unsigned long currentMillis = millis();
  if (currentMillis - lastSensorReadTime >= sensorReadInterval) {
    lastSensorReadTime = currentMillis;
    readAndSendSensorData();
  }

  // Send heartbeat every 30 seconds (or adjust as needed)
  static unsigned long lastHeartbeatTime = 0;
  if (currentMillis - lastHeartbeatTime >= 30000) {
    lastHeartbeatTime = currentMillis;
    sendHeartbeat();
  }
}

void connectToWiFi() {
  Serial.println("Connecting to WiFi...");
  WiFi.begin(ssid, password); // Try connecting to saved Wi-Fi credentials

  int attempt = 0;

  while (WiFi.status() != WL_CONNECTED && attempt < 30) { // Retry for up to 30 seconds
    delay(1000);
    Serial.print(".");
    attempt++;
  }
  
  if (WiFi.status() == WL_CONNECTED) {
    Serial.println("Connected to WiFi");
    Serial.print("IP Address: ");
    Serial.println(WiFi.localIP()); // todo remove
  } else {
    Serial.println("Failed to connect, starting hotspot for configuration");
    WiFi.softAP("ESP_Config_Hotspot", "config_password");
    // Web server can be used to configure WiFi credentials here
  }
}

void reconnectMQTT() {
  // Attempt to reconnect to the MQTT broker with exponential backoff
  if (millis() - lastReconnectAttempt > backoffDelay) {
    lastReconnectAttempt = millis();

    if (mqttClient.connect(client_id)) {
      Serial.println("Connected to MQTT broker");
      retryCount = 0;  // Reset retry count on successful connection
      backoffDelay = 1000; // Reset backoff delay to 1 second

      // After reconnect, try to send locally saved data
      sendSavedData();
    } else {
      retryCount++;
      Serial.print("Failed to connect to MQTT broker. Retry count: ");
      Serial.println(retryCount);
      
      // Exponential backoff for retries
      backoffDelay = min(backoffDelay * 2, 30000); // Max backoff delay of 30 seconds

      if (retryCount >= maxReconnectAttempts) {
        Serial.println("Max reconnect attempts reached. Will retry in 30 seconds.");
        delay(30000); // Wait before trying again
      } else {
        delay(backoffDelay); // Wait before the next reconnect attempt
      }
    }
  }
}

void readAndSendSensorData() {
  unsigned long sensorReadMillis = millis();
  float dhtTemperature;
  float humidity;
  float cbtemperature;

  String dhtData = "";
  String cbData = "";

  if ((sensorReadMillis - previousMillis >= INTERVAL) || errorReading) {
    previousMillis = sensorReadMillis;

    int retries = 0;
    int retryInterval = RETRY_INTERVAL;

    // DHT Sensor retry logic
    bool dhtSuccess = false;
    int dhtRetries = 0;
    while (dhtRetries < MAX_RETRIES && !dhtSuccess) {
      if (dhtSensor.read(dhttemperature, humidity)) {
        dhtSuccess = true;
        dhtData = "{\"name\": \"dht\", \"location\": \"bureau\", \"temperature\": " + String(dhttemperature) + ", \"humidity\": " + String(humidity) + "}";
      } else {
        dhtRetries++;
        Serial.println("Failed to read DHT sensor, retrying...");
        delay(RETRY_INTERVAL);
      }
    }

    // CB Sensor retry logic
    bool cbSuccess = false;
    int cbRetries = 0;
    while (cbRetries < MAX_RETRIES && !cbSuccess) {
      if (cbSensor.read(cbtemperature, humidity)) {
        cbSuccess = true;
        cbData = "{\"name\": \"cb\", \"location\": \"puit\", \"temperature\": " + String(cbtemperature) + "}";
      } else {
        cbRetries++;
        Serial.println("Failed to read CB sensor, retrying...");
        delay(RETRY_INTERVAL);
      }
    }

    String payload = "{\"name\": \"esp\", \"data\": [";
    if (dhtData != "") payload += dhtData + ",";
    if (cbData != "") payload += cbData;
    payload += "]";
    
    String readTime = getNTPtime();
    if (readTime != "NTP Failed") {
      payload += ", \"time\": \"" + readTime + "\}";
    }

    if (dhtSuccess || cbSuccess) {
      if (mqttClient.publish(mqtt_topic, payload.c_str(), true)) {
        Serial.println("Data sent: " + payload);
      } else {
        Serial.println("Failed to send data via MQTT. Saving locally.");
        saveDataLocally(payload); // Save data to the local file system
      }
    }
    else {
      Serial.println("Failed reading from sensors");
    }
/*
    while(retries < MAX_RETRIES) {
      // Check if sensor readings are valid
      if (!dhtSensor.read(dhttemperature, humidity) || !cbSensor.read(cbtemperature)) {
        Serial.println("Failed to read sensor data!");
        retries++;
        if (retries < MAX_RETRIES) {
          delay(retryInterval);
          retryInterval = min(retryInterval * 2, MAX_RETRY_INTERVAL);
        }
      }
      else {
        errorReading = false;
        String readTime = getNTPtime();
        if (readTime != "NTP Failed") {
          // Create JSON payload
          String payload = "{\"sensor\": \"ESP8266\", \"temperature\": " + String(dhttemperature) + 
                   ", \"humidity\": " + String(humidity) + ", \"time\": \"" + readTime + "\"}";

          // Send data via MQTT
          if (mqttClient.publish(mqtt_topic, payload.c_str(), true)) {
            Serial.println("Data sent: " + payload);
          } else {
            Serial.println("Failed to send data via MQTT. Saving locally.");
            saveDataLocally(payload); // Save data to the local file system
          }
        }
        return;
      }
    }
*/ 
    // if all retries failed
    Serial.println("Failed to read sensor after " + String(MAX_RETRIES) + " attempts.");
    errorReading = true;  // Set flag to indicate error state

    // Optionally, wait before the next retry (instead of waiting for the full interval)
    delay(RETRY_INTERVAL);  // You can adjust this delay as needed
  }
}

String getNTPtime() {
  configTime(0, 0, "pool.ntp.org");
  time_t now;
  struct tm timeinfo;
  
  int retryCount = 0;
  while (retryCount < 5) {
    time(&now);
    localtime_r(&now, &timeinfo);
    if (timeinfo.tm_year > (2016 - 1900)) { // Ensure NTP succeeded
      char date[12];
      strftime(date, 12, "%F", localtime(&now));
      char timec[10];
      strftime(timec, 10, "%T", localtime(&now));
      return String("\"time\": \"" + String(timec) + "\", \"date\": \"" + String(date) + "\"");
    }
    retryCount++;
    delay(500);
  }
  return "NTP Failed";
}
/*
String getNTPTime() {
  configTime(0, 0, "pool.ntp.org");
  time_t now;
  struct tm timeinfo;
  if (!getLocalTime(&timeinfo)) {
    Serial.println("Failed to obtain time");
    return "NTP Failed";
  }

  char timeStr[20];
  strftime(timeStr, sizeof(timeStr), "%Y-%m-%d %H:%M:%S", &timeinfo);
  return String(timeStr);
}
*/

void sendHeartbeat() {
  String heartbeatPayload = "{\"device\": \"" + String(client_id) + "\", \"heartbeat\": \"alive\"}"; // Create a heartbeat message
  if (mqttClient.publish(heartbeat_topic, heartbeatPayload.c_str(), true)) {//, 1)) {
    Serial.println("Heartbeat sent via MQTT.");
  } else {
    Serial.println("Failed to send heartbeat via MQTT.");
  }
}

void saveDataLocally(String payload) {
  File file = SPIFFS.open("/data.txt", "a"); // Open file for appending
  if (!file) {
    Serial.println("Failed to open file for saving data.");
    return;
  }

  file.println(payload); // Append the payload to the file
  file.close();
  Serial.println("Data saved locally.");
}

void sendSavedData() {
  File file = SPIFFS.open("/data.txt", "r"); // Open file for reading
  if (!file) {
    Serial.println("No local data found.");
    return;
  }

  while (file.available()) {
    String savedData = file.readStringUntil('\n');
    Serial.println("Sending locally saved data: " + savedData);

    // Attempt to send saved data via MQTT
    if (mqttClient.publish(mqtt_topic, savedData.c_str(), true)) {
      Serial.println("Sent: " + savedData);
    } else {
      Serial.println("Failed to send saved data.");
      break; // Stop attempting to send saved data if we can't send it
    }
  }

  file.close();
  // Optionally, delete the saved data after successful transmission
  SPIFFS.remove("/data.txt");
  Serial.println("Local data sent and file cleared.");
}
