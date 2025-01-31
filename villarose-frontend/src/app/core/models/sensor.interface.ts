// sensor.interface.ts
export interface Sensor {
    id: string; // Unique identifier for the sensor
    type: 'dht' | 'cb' | 'h'; // Type of sensor
    name: string; // Name of the sensor (e.g., "Temperature Sensor", "Humidity Sensor")
    status: 'active' | 'inactive'; // Status of the sensor (active or inactive)
    unit: string; // Unit of measurement (e.g., 'C' for Celsius, 'kg/m^2' for pressure)
    deviceId: string; // The device this sensor belongs to (linked with Device's id)
    lastReading?: number; // Latest reading from the sensor
    lastUpdated: string; // Timestamp of the last update from the sensor
  }
  