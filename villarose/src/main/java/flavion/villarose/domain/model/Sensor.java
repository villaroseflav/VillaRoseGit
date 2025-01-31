package flavion.villarose.domain.model;

import flavion.villarose.domain.enums.DataType;
import flavion.villarose.domain.enums.SensorType;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class Sensor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;
    @Column(name = "name")
    private String name;
    @Column(name = "location")
    private String location;
    @Enumerated(EnumType.STRING)
    @Column(name = "type")
    private SensorType type;

    @ManyToOne
    @JoinColumn(name = "device_id", referencedColumnName = "id")
    private Device device;

    @OneToMany(mappedBy = "sensor", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<SensorData> sensorData;

    @Override
    public String toString() {
        return "Sensor [id=" + id + ", name=" + name + ", location=" + location + ", type=" + type.name() + ", data=" + sensorData + "]";
    }
}
