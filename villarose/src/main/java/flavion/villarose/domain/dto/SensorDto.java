package flavion.villarose.domain.dto;

import flavion.villarose.domain.enums.SensorType;
import flavion.villarose.domain.model.SensorData;
import lombok.*;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@Builder
public class SensorDto {
    private Long id;
    private String name;
    private String location;
    private SensorType type;

    private List<SensorData> sensorData;
}
