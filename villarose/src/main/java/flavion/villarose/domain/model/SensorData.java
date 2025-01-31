package flavion.villarose.domain.model;

import flavion.villarose.domain.enums.DataType;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class SensorData {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "data_type")
    private DataType dataType;

    @Column(name = "value")
    private Double value;  // For storing measurements (temperature, humidity, pressure, etc.)

    @Column(name = "unit")
    private String unit;

    @Column(name = "timestamp")
    private LocalDateTime timestamp;

    @ManyToOne
    @JoinColumn(name = "sensor_id", referencedColumnName = "id")
    private Sensor sensor;

    @Override
    public String toString() {
        return "SensorData [id=" + id + ", type=" + dataType.name() + ", value=" + value + ", timestamp=" + timestamp + ", sensor id=" + sensor + "]";
    }
}
