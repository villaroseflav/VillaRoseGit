import { Device, CreateUpdateDevice } from "../models/device.interface";

export function mapToCreateUpdateDevice(device: Device): CreateUpdateDevice {
  return {
    id: device.id,
    name: device.name,
    domain: device.domain,
    endpoint: device.endpoint,
    ssid: device.ssid,
    password: device.password,
  };
}
