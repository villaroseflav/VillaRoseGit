package flavion.villarose.application.service;

import flavion.villarose.application.config.MqttConfig;
import org.eclipse.paho.client.mqttv3.MqttClient;
import org.eclipse.paho.client.mqttv3.MqttException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MqttService {

    @Autowired
    private MqttClient mqttClient;

    @Autowired
    private MqttConfig mqttConfig;

    public void startMqttClient() {
        if (mqttClient == null) {
            System.out.println("Mqtt client not available. Skipping setup");
            return;
        }

        // Connect and subscribe to topics
        try {
            mqttConfig.subscribeToTopic(mqttClient);
        } catch (MqttException e) {
            e.printStackTrace();
        }
    }

    // Method to publish message (can be used for sending commands to the devices)
    public void sendMqttMessage(String message) throws MqttException {
        if (mqttClient != null) {
            mqttConfig.publishMessage(mqttClient, message);
        } else {
            System.out.println("MQTT Client not available.");
        }
    }
}
