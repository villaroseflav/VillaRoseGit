package flavion.villarose.infrastructure.persistence;

import flavion.villarose.domain.enums.DataType;
import flavion.villarose.domain.enums.SensorType;
import flavion.villarose.domain.model.Device;
import flavion.villarose.domain.model.Sensor;
import flavion.villarose.domain.model.SensorData;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
@Profile("development")
@Slf4j
public class DbInit {
    private final DeviceRepository deviceRepository;
    private final SensorRepository sensorRepository;
    private final DataRepository dataRepository;

    private Device esp1;
    private Device esp2;
    private Sensor dht;
    private Sensor cb;
    private Sensor h;

    public DbInit(DeviceRepository deviceRepository, SensorRepository sensorRepository, DataRepository dataRepository) {
        this.deviceRepository = deviceRepository;
        this.sensorRepository = sensorRepository;
        log.info("DbInit");
        log.info("Database initialized with sensor data.");
        this.dataRepository = dataRepository;
        //createEntities();
    }

    private void createEntities() {
        initDevices();
        initSensors();
        initData();
    }

    private void initDevices() {
        esp1 = Device.builder()
                .name("Esp 1")
                .endpoint("192.168.4.22")
                .ssid("Esp8266_1")
                .password("testpassword")
                .domain("esp8266_dom.local")
                .status(0)
                .build();

        esp2 = Device.builder()
                .name("Esp 2")
                .endpoint("192.168.5.23")
                .ssid("Esp8266_2")
                .password("testpassword")
                .domain("esp8266_dom2.local")
                .status(0)
                .build();

        deviceRepository.save(esp1);
        deviceRepository.save(esp2);
    }

    private void initSensors() {
//        sensor = new Sensor("dht", "loc", device);
        dht = Sensor.builder()
                .name("dht")
                .location("loc")
                .type(SensorType.DHT)
                .device(esp1)
                .build();
        cb = Sensor.builder()
                .name("cb")
                .location("out")
                .type(SensorType.CB)
                .device(esp2)
                .build();
        h = Sensor.builder()
                .name("h202")
                .location("puit")
                .type(SensorType.H)
                .device(esp2)
                .build();
        sensorRepository.save(dht);
        sensorRepository.save(cb);
        sensorRepository.save(h);
    }

    private void initData() {
//        SensorData tempData = new SensorData(22.1, LocalDateTime.now(), sensor);
        SensorData tempData = SensorData.builder()
                .dataType(DataType.TEMPERATURE)
                .value(22.1)
                .unit("°C")
                .timestamp(LocalDateTime.now())
                .sensor(dht)
                .build();
//        SensorData humidityData = new SensorData(55.5, LocalDateTime.now(), sensor);
        SensorData humidityData = SensorData.builder()
                .dataType(DataType.HUMIDITY)
                .value(55.3)
                .unit("%")
                .timestamp(LocalDateTime.now())
                .sensor(dht)
                .build();
        SensorData cbData = SensorData.builder()
                .dataType(DataType.PRESSURE)
                .value(1025.1)
                .unit("hPa")
                .timestamp(LocalDateTime.now())
                .sensor(cb)
                .build();
        SensorData distance = SensorData.builder()
                .dataType(DataType.DISTANCE)
                .value(257.56)
                .unit("cm")
                .timestamp(LocalDateTime.of(2025, 1, 29, 17, 18, 10))
                .sensor(h)
                .build();
        dataRepository.save(tempData);
        dataRepository.save(humidityData);
        dataRepository.save(cbData);
        dataRepository.save(distance);
    }
}
