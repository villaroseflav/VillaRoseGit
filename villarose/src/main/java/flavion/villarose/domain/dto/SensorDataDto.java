package flavion.villarose.domain.dto;

import flavion.villarose.domain.enums.DataType;
import jakarta.persistence.Column;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.*;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@Builder
public class SensorDataDto {
    private Long id;

    private DataType type;

    private Double value;  // For storing measurements (temperature, humidity, pressure, etc.)

    private String unit;

    private LocalDateTime timestamp;
}
