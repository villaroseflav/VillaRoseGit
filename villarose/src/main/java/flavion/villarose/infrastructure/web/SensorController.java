package flavion.villarose.infrastructure.web;

import flavion.villarose.application.service.SensorService;
import flavion.villarose.domain.model.Sensor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/sensors")
public class SensorController {

    private final SensorService sensorService;

    @Autowired
    public SensorController(SensorService sensorService) {
        this.sensorService = sensorService;
    }

    @PostMapping
    public Sensor saveSensor(@RequestBody Sensor sensor) {
        return sensorService.saveSensor(sensor);
    }

    @GetMapping("/{id}")
    public Sensor getSensor(@PathVariable Long id) {
        return sensorService.getSensor(id);
    }
}
