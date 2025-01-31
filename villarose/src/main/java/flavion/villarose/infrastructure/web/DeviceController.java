package flavion.villarose.infrastructure.web;

import flavion.villarose.application.mapper.DeviceMapper;
import flavion.villarose.application.service.DeviceService;
import flavion.villarose.domain.dto.device.DeviceCreateDto;
import flavion.villarose.domain.dto.device.DeviceDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/devices")
public class DeviceController {

    private final DeviceService deviceService;

    @Autowired
    public DeviceController(DeviceService deviceService) {
        this.deviceService = deviceService;
    }

    @ResponseStatus(HttpStatus.OK)
    @GetMapping(produces = "application/json")
    public List<DeviceDto> getDevices() {
        return DeviceMapper.toDtos(deviceService.getDevices());
    }

    @GetMapping("/{id}")
    public DeviceDto getDevice(@PathVariable Long id) {
        return DeviceMapper.toDto(deviceService.getDevice(id));
    }

    @PostMapping
    public DeviceDto saveDevice(@RequestBody DeviceCreateDto deviceDto) {
        return DeviceMapper.toDto(deviceService.saveDevice(DeviceMapper.toEntity(deviceDto)));
    }

    @PutMapping
    public DeviceDto updateDevice(@RequestBody DeviceCreateDto deviceDto) {
        return DeviceMapper.toDto(deviceService.updateDevice(DeviceMapper.toEntity(deviceDto)));
    }

    @DeleteMapping("/{id}")
    public void deleteDevice(@PathVariable Long id) {
        deviceService.deleteDevice(id);
    }
}
