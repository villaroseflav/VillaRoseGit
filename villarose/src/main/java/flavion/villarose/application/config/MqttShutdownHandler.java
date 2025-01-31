package flavion.villarose.application.config;

import org.eclipse.paho.client.mqttv3.MqttClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.ContextClosedEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

@Component
public class MqttShutdownHandler {

    @Autowired
    private MqttClient mqttClient;

    @EventListener(ContextClosedEvent.class)
    public void onApplicationShutdown() {
        if (mqttClient != null && mqttClient.isConnected()) {
            try {
                mqttClient.disconnect();
                System.out.println("MQTT client disconnected on shutdown.");
            } catch (Exception e) {
                System.out.println("Error while disconnecting MQTT client: " + e.getMessage());
            }
        }
    }
}

