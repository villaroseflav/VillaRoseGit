package flavion.villarose.application.config;

import org.eclipse.paho.client.mqttv3.IMqttDeliveryToken;
import org.eclipse.paho.client.mqttv3.MqttCallback;
import org.eclipse.paho.client.mqttv3.MqttException;
import org.eclipse.paho.client.mqttv3.MqttMessage;
import org.springframework.stereotype.Component;

@Component
public class MqttCallbackHandler implements MqttCallback {

    // This method is called when the MQTT client receives a message
    @Override
    public void messageArrived(String topic, MqttMessage message) throws Exception {
        String payload = new String(message.getPayload());
        System.out.println("Received message from topic [" + topic + "]: " + payload);

        // Process the incoming message here (e.g., save to database, process the data)
        // Example: You can parse the payload if it's in JSON format
    }

    // This method is called when the connection is lost
    @Override
    public void connectionLost(Throwable cause) {
        System.out.println("Connection lost: " + cause.getMessage());
    }

    // This method is called when the message is delivered
    @Override
    public void deliveryComplete(IMqttDeliveryToken token) {
        try {
            System.out.println("Message delivery complete: " + token.getMessage());
        } catch (MqttException e) {
            throw new RuntimeException(e);
        }
    }
}

