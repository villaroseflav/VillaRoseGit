package flavion.villarose.infrastructure.persistence;

import flavion.villarose.domain.model.Device;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DeviceRepository extends JpaRepository<Device, Long> {
}
