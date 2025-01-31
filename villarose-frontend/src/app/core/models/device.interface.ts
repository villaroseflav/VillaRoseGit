import { Sensor } from "./sensor.interface";

// device.interface.ts
export interface Device {
  // status: 'active' | 'inactive'; // The current status of the device
  // location: string; // Location where the device is placed (e.g., "Living Room", "Outdoor")
  
  id: number;
  name: string;
  domain: string;
  endpoint: string;
  ssid: string;
  password: string;
  status: boolean;
  sensors: Sensor[];
}

export interface CreateUpdateDevice {
  id: number | undefined;
  name: string;
  domain: string;
  endpoint: string;
  ssid: string;
  password: string;
}
  