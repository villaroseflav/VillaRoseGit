package flavion.villarose.application.config;

import jakarta.annotation.PostConstruct;
import org.eclipse.paho.client.mqttv3.MqttClient;
import org.eclipse.paho.client.mqttv3.MqttConnectOptions;
import org.eclipse.paho.client.mqttv3.MqttException;
import org.eclipse.paho.client.mqttv3.MqttMessage;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Lazy;

@Configuration
public class MqttConfig {

    // Define MQTT Broker URL (replace with your broker's address)
    private static final String BROKER_URL = "tcp://192.168.1.42:1883";
    private static final String CLIENT_ID = "SpringBootMQTTClient";
    private static final int MAX_RETRIES = 5; // Maximum number of retries
    private static final long RETRY_DELAY = 5000L; // Delay between retries in milliseconds

    @Value("${app.mqtt.username}")
    private String mqttUsername;

    @Value("${app.mqtt.password}")
    private String mqttPassword;

    private MqttClient mqttClient;

    @Bean
//    @Lazy
    public MqttClient mqttClient() {
        return mqttClient;
    }

    @PostConstruct
    public void initalizeMqttClient() {
        // tenter de ne pas bloquer le serveur pendant la connexion mqtt
//        new Thread(() -> {

            try {

                // Attempt to connect to the broker
                mqttClient = new MqttClient(BROKER_URL, CLIENT_ID);
                // Setup MQTT connection options (username, password, etc.)
                MqttConnectOptions options = new MqttConnectOptions();
                options.setCleanSession(true); // Keep a clean session
                options.setUserName(mqttUsername); // Optional: if your MQTT broker requires authentication
                options.setPassword(mqttPassword.toCharArray()); // Optional

                int attempts = 0;
                while (attempts < MAX_RETRIES) {
                    try {
//                        Thread.sleep(5000); //todo try run server before mqtt
                        mqttClient.connect(options);
                        System.out.println("Connected to MQTT broker.");
                        break;
                    } catch (MqttException e) {
                        attempts++;
                        System.out.println("Failed to connect. Attempt " + attempts + " of " + MAX_RETRIES);
                        if (attempts >= MAX_RETRIES) {
                            System.err.println("Max retry attempts reached. Unable to connect to MQTT broker.");
                            //throw e; // Rethrow exception after max attempts
                            return;
                        }
                        try {
                            // Wait before retrying
                            Thread.sleep(RETRY_DELAY);
                        } catch (InterruptedException interruptedException) {
                            Thread.currentThread().interrupt(); // Restore the interrupted status
                            //throw new MqttException(interruptedException);
                            System.out.println("Interrupted while waiting for MQTT broker.");
                            break;
                        }
//                    } catch (InterruptedException e) {
////                    throw new RuntimeException(e);
//                        System.out.println("Interrupted while waiting for MQTT broker.");
//                        break;
                    }
                }
            } catch (MqttException e) {
                e.printStackTrace();
                System.out.println("Failed to connect to MQTT broker.");
            }
        //}).start();
    }

    // Subscribe to a topic
    public void subscribeToTopic(MqttClient client) throws MqttException {
        if (client != null) {
            String topic = "sensor/data";
            client.setCallback(new MqttCallbackHandler());
            try {
                client.subscribe(topic, 1);
            } catch (MqttException e) {
                e.printStackTrace();
                System.out.println("Subscribing to topic " + topic + " failed.");
            }
        } else {
            System.out.println("No MQTT client available to subscribe to the topic.");
        }
    }

    // Publish a message
    public void publishMessage(MqttClient client, String payload) throws MqttException {
        if (client != null) {
            String topic = "sensor/data";  // Replace with your topic
            MqttMessage message = new MqttMessage(payload.getBytes());
            message.setQos(1);  // Set Quality of Service (QoS)
            client.publish(topic, message);
        }
        else {
            System.out.println("No MQTT client available to publish message.");
        }
    }
}
