package flavion.villarose.application.service;

import flavion.villarose.application.exception.NoDataFoundException;
import flavion.villarose.application.exception.SensorNotFoundException;
import flavion.villarose.domain.enums.SensorType;
import flavion.villarose.domain.model.SensorData;
import flavion.villarose.domain.model.Sensor;
import flavion.villarose.infrastructure.persistence.DataRepository;
import flavion.villarose.infrastructure.persistence.SensorRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
//@AllArgsConstructor
public class SensorService {
    @Autowired
    SensorRepository sensorRepository;

//    @Autowired
//    public SensorService(SensorRepository sensorRepository, DataRepository dataRepository) {
//        this.sensorRepository = sensorRepository;
//        this.dataRepository = dataRepository;
//    }

//    public Sensor createSensor(String sensorName) {
//        Sensor sensor = new Sensor(sensorName);
//        return sensorRepository.save(sensor);
//    }

    public Sensor saveSensor(Sensor sensor) {
        // You could add validation or other business logic here if needed
        return sensorRepository.save(sensor);
    }

    public Sensor getSensor(Long id) {
        return sensorRepository.findById(id).orElseThrow(() -> new SensorNotFoundException("Sensor not found"));
    }

}
