import { Component, OnInit, ViewChild } from "@angular/core";
import { DataType, SensorData } from "../../core/models/sensor-data.interface";
import { SensorDataService } from "../../core/services/sensor-data.service";
import { ToastService } from "../../core/services/toast.service";
import { ProgressComponent } from "../../shared/components/graphs/progress/progress.component";
import { LineComponent } from "../../shared/components/graphs/line/line.component";
import { RadialComponent } from "../../shared/components/graphs/radial/radial.component";
import { BarComponent } from "../../shared/components/graphs/bar/bar.component";
import { DonutComponent } from "../../shared/components/graphs/donut/donut.component";
import { BartwoComponent } from "../../shared/components/graphs/bartwo/bartwo.component";
import { TemperatureComponent } from "../../shared/components/graphs/temperature/temperature.component";
import { DateFilterComponent } from "../../shared/components/graphs/date-filter/date-filter.component";
import { CommonModule } from "@angular/common";
import { LoadingSpinnerComponent } from "../../shared/components/loading-spinner/loading-spinner.component";

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
  imports: [CommonModule, DateFilterComponent, TemperatureComponent, ProgressComponent, LineComponent, RadialComponent, BarComponent, DonutComponent, BartwoComponent, LoadingSpinnerComponent],
})
export class DashboardPageComponent implements OnInit {
  @ViewChild('progress') progressChart?: ProgressComponent;
  @ViewChild('line') lineChart?: LineComponent;

  sensorData: SensorData[] = [];
  graphData: { [key in DataType]?: SensorData[] } = {};
  eventData: string = "default";
  isLoading = true; // Set to true while data is loading

  // To control visibility and size of charts
  // todo update for progress, line, donut..
  chartSizes: { [key in DataType]?: 'small' | 'large' } = {
    temperature: 'large',
    pressure: 'small',
    humidity: 'small',
    distance: 'large',
  };

  constructor(private dataService: SensorDataService, private toastService: ToastService) {}

  ngOnInit(): void {
    this.fetchSensorData();
    this.startPeriodicUpdate();
  }

  fetchSensorData(): void {
    this.dataService.getSensorData().subscribe({
      next: (data: SensorData[]) => {
        this.sensorData = data;
        this.processGraphData(data);
        this.isLoading = false;
      },
      error: (error) => {
        this.toastService.showError(error.message || 'Error on getting sensor data');
        this.isLoading = false;
      }
    });
  }

  processGraphData(data: SensorData[]): void {
    if (!data || data.length == 0) return;

    // // Group data by sensor type
    this.graphData = data.reduce((acc, sensorData) => {
      const sensorType = sensorData.type as DataType;
      if (!acc[sensorType]) {
        acc[sensorType] = [];
      }
      acc[sensorType].push(sensorData);
      return acc;
    }, {} as { [key in DataType]?: SensorData[] });
  }

  startPeriodicUpdate(): void {
    setInterval(() => {
      this.fetchSensorData(); // Fetch new data every 15 minutes (900000ms)

      // update progress
      if (this.progressChart) this.progressChart.updateGraph(20, 35, 45);
      if (this.lineChart) this.lineChart.updateGraph(this.getRandom(), this.getRandom()); // todo fully remove getRandom())
    }, 5000); // 900000);
  }

  trigoStrength = 3;
  iteration = 11;
  
  getRandom() {
    var i = this.iteration;
    return (
      (Math.sin(i / this.trigoStrength) * (i / this.trigoStrength) + i / this.trigoStrength + 1) *
      (this.trigoStrength * 2)
    );
  }

  handleTypeChange(type: string) {
    this.eventData = type;
    this.processGraphData(this.sensorData); // Process based on selected type
  }
}