package flavion.villarose.application.mapper;

import flavion.villarose.domain.dto.SensorDataDto;
import flavion.villarose.domain.model.SensorData;

import java.util.Collections;
import java.util.List;

public class SensorDataMapper {
    public static SensorData toEntity(SensorDataDto dto) {
        if (dto == null) return null;
        return SensorData.builder()
                .id(dto.getId())
                .dataType(dto.getType())
                .value(dto.getValue())
                .unit(dto.getUnit())
                .timestamp(dto.getTimestamp())
                .build();
    }

    public static SensorDataDto toDto(SensorData sensorData) {
        if (sensorData == null) return null;
        return SensorDataDto.builder()
                .id(sensorData.getId())
                .type(sensorData.getDataType())
                .value(sensorData.getValue())
                .unit(sensorData.getUnit())
                .timestamp(sensorData.getTimestamp())
                .build();
    }

    public static List<SensorDataDto> toDtos(List<SensorData> dataList) {
        if (dataList == null) return Collections.emptyList();
        return dataList.stream().map(SensorDataMapper::toDto).toList();
    }

    public static List<SensorData> toEntities(List<SensorDataDto> dataDtoList) {
        if (dataDtoList == null) return Collections.emptyList();
        return dataDtoList.stream().map(SensorDataMapper::toEntity).toList();
    }
}
