package flavion.villarose.application.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

@Service
@EnableScheduling
public class MqttReconnectService {

    @Autowired
    private MqttService mqttService;

    @Scheduled(fixedDelay = 10000) // Retry every 10 seconds
    public void attemptReconnect() {
        try {
            mqttService.startMqttClient();  // Try to reconnect
        } catch (Exception e) {
            // If still unable to connect, log and try again later
            System.out.println("Still unable to connect to MQTT broker. Will try again later.");
        }
    }
}
