package flavion.villarose.infrastructure.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import flavion.villarose.application.service.MqttService;

@RestController
public class HealthCheckController {

    @Autowired
    private MqttService mqttService;

    @GetMapping("/health")
    public String healthCheck() {
        if (mqttService.isMqttClientReady()) {
            return "OK";
        } else {
            return "WAIT";  // Return WAIT until MQTT client is connected
        }
    }
}
