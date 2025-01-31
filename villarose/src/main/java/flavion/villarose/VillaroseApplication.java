package flavion.villarose;

import flavion.villarose.application.service.MqttService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class VillaroseApplication implements CommandLineRunner {

	@Autowired(required = false)
	private MqttService mqttService;

	public static void main(String[] args) {
		SpringApplication.run(VillaroseApplication.class, args);
	}

	@Override
	public void run(String... args) {
		try {
			System.out.println("NOT STARTING MQTT, FOR TESTING"); //todo
			mqttService.startMqttClient(); // Start MQTT client and subscribe to topics
		} catch (Exception e) {
			//e.printStackTrace();
			System.out.println("MQTT client failed to start");
		}
	}
}
