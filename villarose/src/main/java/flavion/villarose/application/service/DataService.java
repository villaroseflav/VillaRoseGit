package flavion.villarose.application.service;

import flavion.villarose.application.exception.NoDataFoundException;
import flavion.villarose.application.exception.SensorNotFoundException;
import flavion.villarose.domain.enums.DataType;
import flavion.villarose.domain.enums.SensorType;
import flavion.villarose.domain.model.Sensor;
import flavion.villarose.domain.model.SensorData;
import flavion.villarose.infrastructure.persistence.DataRepository;
import flavion.villarose.infrastructure.persistence.SensorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;

@Service
public class DataService {
    private final DataRepository dataRepository;
    private final SensorRepository sensorRepository;

    @Autowired
    public DataService(DataRepository dataRepository, SensorRepository sensorRepository) {
        this.dataRepository = dataRepository;
        this.sensorRepository = sensorRepository;
    }

    public List<SensorData> getSensorData() {
        return dataRepository.findAll();
    }

    public SensorData getMostRecentSensorData() {
        List<SensorData> sensorData = dataRepository.findAll();
        return sensorData.stream()
                .max(Comparator.comparing(SensorData::getTimestamp))
//                .max(Comparator.comparing(data -> data.getTimestamp()))
                .orElse(null);  // Return null if no data is available
    }

    public double getMostRecentTemperature() {
        // Filter for temperature readings and sort by timestamp (descending)
        return dataRepository.findAll().stream()
                .filter(data -> data.getDataType() == DataType.TEMPERATURE)  // Filter by temperature
                .sorted((data1, data2) -> data2.getTimestamp().compareTo(data1.getTimestamp()))  // Sort by most recent
                .findFirst()  // Get the first result (most recent)
                .map(SensorData::getValue).orElseThrow(() -> new IllegalStateException("Temperature data not found"));  // Get the value of the most recent temperature
//                .map(data -> data.getValue()).orElseThrow(() -> new IllegalStateException("Temperature data not found"));  // Get the value of the most recent temperature
    }

    public double getMostRecentHumidity() {
        return dataRepository.findAll().stream()
                .filter(data -> data.getDataType() == DataType.HUMIDITY)  // Filter by humidity
                .sorted((data1, data2) -> data2.getTimestamp().compareTo(data1.getTimestamp()))  // Sort by most recent
                .findFirst()  // Get the first result (most recent)
                .map(SensorData::getValue)  // Get the value of the most recent humidity
//                .map(data -> data.getValue())
                .orElseThrow(() -> new IllegalStateException("Humidity data not found"));
    }

    public List<SensorData> getDataFromLast15Minutes(Sensor sensor) {
        LocalDateTime fifteenMinutesAgo = LocalDateTime.now().minusMinutes(15);
        return dataRepository.findBySensorAndTimestampAfter(sensor, fifteenMinutesAgo);
    }


    // Method to fetch data based on sensor and type
    public List<SensorData> getSensorDataByType(Long sensorId, String type) {
        Sensor sensor = sensorRepository.findById(sensorId).orElseThrow(() -> new SensorNotFoundException("Sensor not found"));
        if (sensor.getType().equals(SensorType.valueOf(type))) return dataRepository.findBySensor(sensor);
        return null; //todo bad method
    }

    public SensorData recordSensorData(Long sensorId, SensorData sensorData) {
        // Fetch the sensor
        Sensor sensor = sensorRepository.findById(sensorId).orElseThrow(() -> new SensorNotFoundException("Sensor not found"));

        sensorData.setTimestamp(LocalDateTime.now());
        sensorData.setSensor(sensor);  // Link to the sensor

        // Save the sensor data
        return dataRepository.save(sensorData);
    }

    // Example: Calculate the average temperature for a specific sensor in a date range
    public Double calculateAverageTemperature(Sensor sensor, LocalDateTime start, LocalDateTime end) {
        List<SensorData> data = dataRepository.findBySensorAndTimestampBetween(sensor, start, end);
        return data.stream()
                .filter(d -> d.getSensor().getType().name().equals("DHT"))
                .mapToDouble(SensorData::getValue)
                .average()
                .orElseThrow(() -> new NoDataFoundException("No temperature data found"));
    }

    // todo actually get temp
//    public double getTemperatureFromLastHour(Sensor sensor) {
//        LocalDateTime oneHourAgo = LocalDateTime.now().minusHours(1);
//        List<SensorData> lastHourData = dataRepository.findBySensorAndTimestampAfter(sensor, oneHourAgo);
//
//        return lastHourData.stream()
//                .mapToDouble(SensorData::getValue)  // assuming getValue returns temperature
//                .average()
//                .orElse(0.0);
//    }

    // todo actually get temp
//    public double getAverageTemperatureLastHour(Sensor sensor) {
//        LocalDateTime oneHourAgo = LocalDateTime.now().minusHours(1);
//        List<SensorData> recentData = dataRepository.findBySensorAndTimestampAfter(sensor, oneHourAgo);
//
//        return recentData.stream()
//                .mapToDouble(SensorData::getValue)
//                .average()
//                .orElse(0.0);
//    }








    //    public double getTemperature() {
//        // Assuming DHT data is stored in the first sensorData object
//        return sensorData.get(0).getValue();  // Fetch the temperature from SensorData
//    }
    // todo bof, faire fonction get all temps (trier par type) ou get last temp etc
    // trier par timestamp
    public List<Double> getTemperatures() {
        return dataRepository.findAll().stream()
                .filter(data -> data.getDataType() == DataType.TEMPERATURE)
                .sorted((data1, data2) -> data2.getTimestamp().compareTo(data1.getTimestamp()))
                .map(SensorData::getValue).toList();
    }

    public List<Double> getHumidityList() {
        return dataRepository.findAll().stream()
                .filter(data -> data.getDataType() == DataType.HUMIDITY)
                .sorted((data1, data2) -> data2.getTimestamp().compareTo(data1.getTimestamp()))
                .map(SensorData::getValue).toList();
    }

    public List<Double> getDistance() {
        return dataRepository.findAll().stream()
                .filter(data -> data.getDataType() == DataType.DISTANCE)
                .sorted((data1, data2) -> data2.getTimestamp().compareTo(data1.getTimestamp()))
                .map(SensorData::getValue).toList();
    }

    public List<Double> getPressure() {
        return dataRepository.findAll().stream()
                .filter(data -> data.getDataType() == DataType.PRESSURE)
                .sorted((data1, data2) -> data2.getTimestamp().compareTo(data1.getTimestamp()))
                .map(SensorData::getValue).toList();
    }

}
