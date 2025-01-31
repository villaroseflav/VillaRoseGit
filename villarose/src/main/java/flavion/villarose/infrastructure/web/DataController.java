package flavion.villarose.infrastructure.web;

import flavion.villarose.application.mapper.SensorDataMapper;
import flavion.villarose.application.service.DataService;
import flavion.villarose.domain.dto.SensorDataDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/data")
public class DataController {
    private final DataService dataService;

    @Autowired
    public DataController(DataService dataService) {
        this.dataService = dataService;
    }

    @GetMapping
    public List<SensorDataDto> getData() {
        return SensorDataMapper.toDtos(dataService.getSensorData());
    }

    // Endpoint to record sensor data (e.g., temperature, humidity)
    @PostMapping("/{sensorId}/record")
    public SensorDataDto recordData(@PathVariable Long sensorId, @RequestBody SensorDataDto sensorData) {
        return SensorDataMapper.toDto(dataService.recordSensorData(sensorId, SensorDataMapper.toEntity(sensorData)));
    }

    // Endpoint to fetch sensor data by type (e.g., temperature readings)
    @GetMapping("/{sensorId}/data")
    public List<SensorDataDto> getSensorDataByType(@PathVariable Long sensorId, @RequestParam String type) {
        return SensorDataMapper.toDtos(dataService.getSensorDataByType(sensorId, type));
    }
}
