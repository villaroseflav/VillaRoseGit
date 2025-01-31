package flavion.villarose.application.service;

import flavion.villarose.application.exception.ResourceNotFoundException;
import flavion.villarose.domain.model.Device;
import flavion.villarose.infrastructure.persistence.DeviceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.util.List;

@Service
public class DeviceService {
    @Autowired
    private DeviceRepository deviceRepository;

    public List<Device> getDevices() {
        List<Device> devices = deviceRepository.findAll();
//        for (Device d: devices) {
//            d.setStatus(pingEsp(d.getDomain()));
//        }
        return devices;
    }

    public boolean pingEsp(String domain) {
        try {
            RestClient restClient = RestClient.create();

            String result = restClient.get()
//                    .uri("http://" + domain + "/ping")
                    .uri("http://esp8266-1.local/LED")
                    .retrieve()
                    .body(String.class);
            return result != null && result.equals("alive");
//        } catch (UnresolvedAddressException x) {
        } catch (Exception x) {
            return false;
        }
    }

    public Device getDevice(Long id) {
        return deviceRepository.findById(id).orElse(null);
    }

    public Device saveDevice(Device device) {
        return deviceRepository.save(device);
    }

    public Device updateDevice(Device device) {
        // Fetch the device from the repository
        Device existingDevice = deviceRepository.findById(device.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Device not found with id: " + device.getId()));

        // Update the existing device fields with the provided data
        existingDevice.setName(device.getName());
        existingDevice.setDomain(device.getDomain());
        existingDevice.setEndpoint(device.getEndpoint());
        existingDevice.setSsid(device.getSsid());
        existingDevice.setPassword(device.getPassword());
//        existingDevice.setStatus(device.getStatus());
        existingDevice.setSensors(device.getSensors());

        // Save and return the updated device
        return deviceRepository.save(existingDevice);
    }

    public void deleteDevice(Long id) {
        deviceRepository.deleteById(id);
    }
}
