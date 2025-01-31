package flavion.villarose.application.mapper;

import flavion.villarose.domain.dto.SensorDto;
import flavion.villarose.domain.enums.SensorType;
import flavion.villarose.domain.model.Sensor;

import java.util.Collections;
import java.util.List;

public class SensorMapper {
    public static Sensor toEntity(SensorDto dto) {
        if (dto == null) return null;
        return Sensor.builder()
                .id(dto.getId())
                .name(dto.getName())
                .location(dto.getLocation())
                .type(dto.getType())
                .build();
    }

    public static SensorDto toDto(Sensor sensor) {
        if (sensor == null) return null;
        return SensorDto.builder()
                .id(sensor.getId())
                .name(sensor.getName())
                .location(sensor.getLocation())
                .type(sensor.getType())
                .build();
    }

    public static List<SensorDto> toDtos(List<Sensor> sensorList) {
        if (sensorList == null) return Collections.emptyList();
        return sensorList.stream().map(SensorMapper::toDto).toList();
    }

    public static List<Sensor> toEntities(List<SensorDto> sensorDtoList) {
        if (sensorDtoList == null) return Collections.emptyList();
        return sensorDtoList.stream().map(SensorMapper::toEntity).toList();
    }
}
