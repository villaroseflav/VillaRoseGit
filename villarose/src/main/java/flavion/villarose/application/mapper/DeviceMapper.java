package flavion.villarose.application.mapper;

import flavion.villarose.domain.dto.device.DeviceCreateDto;
import flavion.villarose.domain.dto.device.DeviceDto;
import flavion.villarose.domain.model.Device;

import java.util.Collections;
import java.util.List;

public class DeviceMapper {
    public static Device toEntity(DeviceDto dto) {
        if (dto == null) return null;
        return Device.builder()
                .id(dto.getId())
                .name(dto.getName())
                .token(dto.getToken())
                .domain(dto.getDomain())
                .endpoint(dto.getEndpoint())
                .ssid(dto.getSsid())
                .password(dto.getPassword())
                .status(dto.getStatus() ? 1 : 0)
                .sensors(SensorMapper.toEntities(dto.getSensors()))
                .build();
    }

    public static Device toEntity(DeviceCreateDto dto) {
        if (dto == null) return null;
        return Device.builder()
                .id(dto.getId())
                .name(dto.getName())
                .domain(dto.getDomain())
                .endpoint(dto.getEndpoint())
                .ssid(dto.getSsid())
                .password(dto.getPassword())
                .status(dto.getStatus() ? 1 : 0)
                .build();
    }

    public static DeviceDto toDto(Device entity) {
        if (entity == null) return null;
        return DeviceDto.builder()
                .id(entity.getId())
                .name(entity.getName())
                .token(entity.getToken())
                .domain(entity.getDomain())
                .endpoint(entity.getEndpoint())
                .ssid(entity.getSsid())
                .password(entity.getPassword())
                .status(entity.getStatus() == 1)
                .sensors(SensorMapper.toDtos(entity.getSensors()))
                .build();
    }

    public static List<DeviceDto> toDtos(List<Device> deviceList) {
        if (deviceList == null) return Collections.emptyList();
        return deviceList.stream().map(DeviceMapper::toDto).toList();
    }

    public static List<Device> toEntities(List<DeviceDto> deviceDtoList) {
        if (deviceDtoList == null) return Collections.emptyList();
        return deviceDtoList.stream().map(DeviceMapper::toEntity).toList();
    }
}
