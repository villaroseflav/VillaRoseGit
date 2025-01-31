import { OnInit, Component, Input } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import * as ApexCharts from 'apexcharts';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexStroke,
  ApexTitleSubtitle,
  ApexXAxis,
  NgApexchartsModule,
} from 'ng-apexcharts';
import { take } from 'rxjs';
import Temperature from 'src/app/modules/dashboard/models/temperature';
import { TemperatureService } from 'src/app/core/services/temperature.service';
import { getDayMonthFromDate, formatDate } from 'src/app/shared/utils/dateUtils';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { isWithinInterval, startOfWeek, startOfMonth, startOfYear } from 'date-fns';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  labels: string[];
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-temperature',
  standalone: true,
  imports: [CommonModule, NgApexchartsModule, FormsModule, ReactiveFormsModule],
  templateUrl: './temperature.component.html',
  styleUrls: ['./temperature.component.scss'],
})
export class TemperatureComponent implements OnInit {
  public chartOptions!: Partial<ChartOptions>;

  series: ApexAxisChartSeries = [];
  temperatures: (number | null)[] = [];
  labels: string[] = [];
  categories: string[] = [];
  chart!: ApexCharts;

  @Input() type: string = ''; // This can be used for type-specific settings

  constructor(private temperatureService: TemperatureService, private toastr: ToastrService) {}

  ngOnInit() {
    this.initializeChart();
    this.fetchTemperatures();
  }

  // Initialize chart
  private initializeChart() {
    this.chartOptions = {
      series: this.series,
      chart: {
        height: 350,
        type: 'line',
        zoom: { enabled: false },
        animations: { enabled: true },
      },
      stroke: { curve: 'smooth' },
      labels: this.labels,
      title: { text: 'Temperature Data' },
      xaxis: { categories: [] },
    };
    this.chart = new ApexCharts(document.querySelector('#chart'), this.chartOptions);
    this.chart.render();
  }

  // Fetch temperatures from the service
  private fetchTemperatures(period: string = 'day') {
    this.temperatureService
      .getTemperaturesByPeriod(period)
      .pipe(take(1))
      .subscribe({
        next: (temperatures) => {
          this.setTemperatureArray(temperatures, period);
        },
        error: (err) => {
          this.toastr.error('Error fetching temperatures', 'Error');
        },
      });
  }

  // Map temperatures to the correct format for the chart
  private setTemperatureArray(temperatures: Temperature[], period: string) {
    this.temperatures = [];
    this.categories = [];

    switch (period) {
      case 'week':
        this.setWeekData(temperatures);
        break;
      case 'month':
        this.setMonthData(temperatures);
        break;
      case 'year':
        this.setYearData(temperatures);
        break;
      default:
        this.setDayData(temperatures);
    }

    this.updateChart();
  }

  // Set data for day period
  private setDayData(temperatures: Temperature[]) {
    const hours = Array(24).fill(null);
    temperatures.forEach((temp) => {
      const hour = new Date(temp.date).getHours();
      hours[hour] = temp.temperature;
    });
    this.temperatures = hours;
    this.categories = Array.from({ length: 24 }, (_, i) => `${i}h`);
  }

  // Set data for week period
  private setWeekData(temperatures: Temperature[]) {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const weekTemps = Array(7).fill(null);

    temperatures.forEach((temp) => {
      const day = new Date(temp.date).getDay();
      weekTemps[day === 0 ? 6 : day - 1] = temp.temperature; // Adjust to start from Monday
    });

    this.temperatures = weekTemps;
    this.categories = days;
  }

  // Set data for month period
  private setMonthData(temperatures: Temperature[]) {
    const daysInMonth = Array(31).fill(null); // Max 31 days
    temperatures.forEach((temp) => {
      const day = new Date(temp.date).getDate() - 1;
      daysInMonth[day] = temp.temperature;
    });
    this.temperatures = daysInMonth;
    this.categories = Array.from({ length: 31 }, (_, i) => `${i + 1}d`);
  }

  // Set data for year period
  private setYearData(temperatures: Temperature[]) {
    const months = Array(12).fill(null);
    temperatures.forEach((temp) => {
      const month = new Date(temp.date).getMonth();
      months[month] = temp.temperature;
    });
    this.temperatures = months;
    this.categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  }

  // Update chart with the new data
  private updateChart() {
    this.series = [{ name: 'Temperature', data: this.temperatures }];
    this.chart.updateOptions({ xaxis: { categories: this.categories } });
    this.chart.updateSeries(this.series);
  }

  // Call this method periodically to fetch and update the chart (e.g., every 15 minutes)
  startPeriodicUpdates() {
    setInterval(() => {
      this.fetchTemperatures();
    }, 15 * 60 * 1000); // 15 minutes
  }

  // This method is used to handle changes to the selected period
  onPeriodChange(period: string) {
    this.fetchTemperatures(period);
  }
}
