//package flavion.villarose.infrastructure.web;
//
//import flavion.villarose.application.service.DeviceService;
//import flavion.villarose.mapper.TemperatureMapper;
//import flavion.villarose.model.dto.TemperatureCreateDto;
//import flavion.villarose.model.dto.TemperatureDto;
//import flavion.villarose.model.esp.TokenRequest;
//import flavion.villarose.service.EspService;
//import flavion.villarose.service.TemperatureService;
//import lombok.AllArgsConstructor;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpStatus;
//import org.springframework.web.bind.annotation.*;
//
//import java.net.URISyntaxException;
//import java.util.List;
//import java.util.UUID;
//
//// @CrossOrigin(origins = "http://localhost:8081")
//@RestController
//@AllArgsConstructor
//@RequestMapping("/api")
//public class PostController {
//    @Autowired
//    TemperatureService temperatureService;
//    @Autowired
//    DeviceService deviceService;
//
//    @ResponseStatus(HttpStatus.ACCEPTED) // or found, continue
//    @GetMapping(value = "/ping")
//    public String getAlive() {
//        // is alive
//        return "alive";
//    }
//
//    @ResponseStatus(HttpStatus.CREATED)
//    @PutMapping(value = "/temperature", consumes = "application/json", produces = "application/json")
//    public TemperatureDto saveTemperature(@RequestBody TemperatureCreateDto temperatureDto) { //} TemperatureCreateDto temperatureDto) { // @Valid
//        System.out.println("SAVE NEW TEMP");
//        System.out.println(temperatureDto); //todo
//        return TemperatureMapper.toDto(temperatureService.createTemperature(temperatureDto)); // todo void ?
//    }
//
//    @ResponseStatus(HttpStatus.ACCEPTED)
//    @PutMapping(value = "/temperatures", consumes = "application/json", produces = "application/json")
//    public boolean saveTemperatures(@RequestBody List<TemperatureCreateDto> temperatureDtoList) {
//        System.out.println("ESP SENDS MULTIPLE TEMPERATURES");
//        // returns true if success
//        return temperatureService.createTemperatures(temperatureDtoList);
//    }
//
//    @ResponseStatus(HttpStatus.ACCEPTED)
//    @PostMapping(value = "/register", consumes = "application/json", produces = "application/json")
//    public String registerEsp(@RequestBody TokenRequest body) {
////    public String registerEsp(HttpEntity<String> body) {
//        System.out.println("RECEIVED REGISTER REQUEST FROM ESP");
////        System.out.println(body.getBody());
//        StringBuilder token = new StringBuilder();
//        token.append(UUID.randomUUID().toString());
//        System.out.println("CREATED TOKEN " + token);
//        deviceService.register(body, token.toString());
//        return "{\"token\": \"" + token.toString() + "\"}";
//    }
//
//    @GetMapping(value = "/test")
//    public String test() throws URISyntaxException {
//        System.out.println("GOT TEST CALLED");
//        deviceService.test();
//        System.out.println("CALL ESP"); //todo
//        return "testing";
//    }
//}
