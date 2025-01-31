// data.interface.ts
export enum DataType {
  temperature = 'temperature',
  humidity = 'humidity',
  pressure = 'pressure',
  distance = 'distance'
}

export interface SensorData {
  id: string;
  type: DataType; // Type of sensor
  value: number; // Value from the sensor (e.g., temperature, humidity)
  timestamp: string; // Date and time when the data was recorded
  // sensorId: string; // The sensor that recorded this data
  // unit: string; // The unit of the value, e.g., 'C' for Celsius, '%' for humidity
  // deviceId: string; // The device that is associated with the sensor
}
