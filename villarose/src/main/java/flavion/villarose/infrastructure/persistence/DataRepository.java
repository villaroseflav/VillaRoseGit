package flavion.villarose.infrastructure.persistence;

import flavion.villarose.domain.model.Sensor;
import flavion.villarose.domain.model.SensorData;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface DataRepository extends JpaRepository<SensorData, Long> {
    List<SensorData> findBySensorAndTimestampAfter(Sensor sensor, LocalDateTime timestamp);
    List<SensorData> findBySensor(Sensor sensor);
    List<SensorData> findBySensorAndTimestampBetween(Sensor sensor, LocalDateTime start, LocalDateTime end);
}
