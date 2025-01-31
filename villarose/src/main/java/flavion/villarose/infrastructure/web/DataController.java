package flavion.villarose.infrastructure.web;

import flavion.villarose.application.mapper.SensorDataMapper;
import flavion.villarose.application.service.DataService;
import flavion.villarose.domain.dto.SensorDataDto;
import flavion.villarose.domain.model.SensorData;
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
    public SensorData recordData(@PathVariable Long sensorId, @RequestBody SensorData sensorData) {
        return dataService.recordSensorData(sensorId, sensorData);
    }

    // Endpoint to fetch sensor data by type (e.g., temperature readings)
    @GetMapping("/{sensorId}/data")
    public List<SensorData> getSensorDataByType(@PathVariable Long sensorId, @RequestParam String type) {
        return dataService.getSensorDataByType(sensorId, type);
    }
}
