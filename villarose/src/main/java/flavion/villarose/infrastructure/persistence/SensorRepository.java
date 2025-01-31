package flavion.villarose.infrastructure.persistence;

import flavion.villarose.domain.model.Sensor;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SensorRepository extends JpaRepository<Sensor, Long> {
}
