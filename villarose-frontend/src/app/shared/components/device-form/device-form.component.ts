import { Component } from '@angular/core';
import { SensorDataService } from '../../../core/services/sensor-data.service';

@Component({
  selector: 'app-device-form',
  standalone: true,
  templateUrl: './device-form.component.html',
  styleUrl: './device-form.component.scss'
})
export class DeviceFormComponent {
  device = { name: '', location: '', type: '' };

  constructor(private dataService: SensorDataService) {}

  addDevice() {
    this.dataService.addDevice(this.device).subscribe((response) => {
      console.log('Device added successfully', response);
    });
  }
}
