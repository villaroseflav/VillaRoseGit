import { Component, OnInit } from '@angular/core';
import { SensorDataService } from '../../core/services/sensor-data.service';
import { SensorData } from '../../core/models/sensor-data.interface';
import { ToastService } from '../../core/services/toast.service';
import { BarComponent } from "../../shared/components/graphs/bar/bar.component";
import { BartwoComponent } from "../../shared/components/graphs/bartwo/bartwo.component";
import { DonutComponent } from "../../shared/components/graphs/donut/donut.component";
import { RadialComponent } from "../../shared/components/graphs/radial/radial.component";
import { LineComponent } from "../../shared/components/graphs/line/line.component";
import { ProgressComponent } from "../../shared/components/graphs/progress/progress.component";
import { DateFilterComponent } from "../../shared/components/graphs/date-filter/date-filter.component";
import { TemperatureComponent } from "../../shared/components/graphs/temperature/temperature.component";
import { HeaderComponent } from "../../layout/header/header.component";

@Component({
  selector: 'app-olddashboard-page',
  standalone: true,
  templateUrl: './olddashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
  // imports: [BarComponent, BartwoComponent, DonutComponent, RadialComponent, LineComponent, ProgressComponent, DateFilterComponent, TemperatureComponent, HeaderComponent],
})
export class OldDashboardPageComponent implements OnInit {
  sensorData: SensorData[] = [];
  chartData: SensorData[] = [];

  eventData: string = "default";
  
  constructor(private dataService: SensorDataService, private toastService: ToastService) {}

  ngOnInit(): void {
    this.dataService.getSensorData().subscribe({
      next: (data: SensorData[]) => {
      this.sensorData = data;
      this.chartData = data;  // Use the data to render charts
      },
      error: (error) => {
        this.toastService.showError(error.message || 'Error on getting sensor data');
      }
    });
  }

  handleTypeChange(type: string) {
    console.log("toggle " + type);
    this.eventData = type;
  }
}
