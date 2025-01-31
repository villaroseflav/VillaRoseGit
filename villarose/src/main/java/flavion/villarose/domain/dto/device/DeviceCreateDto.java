package flavion.villarose.domain.dto.device;

import flavion.villarose.domain.dto.SensorDto;
import lombok.*;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@Builder
public class DeviceCreateDto {
    private Long id;

    private String name;

    private String domain;

    private String endpoint;

    private String ssid;

    private String password;

    private Boolean status;
}