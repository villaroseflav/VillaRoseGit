import { Component, Input, OnInit } from '@angular/core';
import ApexCharts from 'apexcharts';
// forms module really used?
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexStroke,
  ApexTitleSubtitle,
  ApexXAxis,
  NgApexchartsModule,
} from 'ng-apexcharts';
import { SensorData } from '../../../../core/models/sensor-data.interface';
import { isWithinInterval, startOfWeek } from 'date-fns';
import { formatDate, getDayMonthFromDate } from '../../../utils/dateUtils';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  // labels: number[];
  labels: string[];
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-temperature',
  standalone: true,
  templateUrl: './temperature.component.html',
  styleUrl: './temperature.component.scss'
})
export class TemperatureComponent implements OnInit {
  @Input() data: SensorData[] = [];
  chart!: ApexCharts;
  public chartOptions!: Partial<ChartOptions>;

  series: ApexAxisChartSeries = [{name: 'temperature', data: []}];
  temperatures: (number | null)[] = [];

  weekCategory = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  categories: string[] = [];

  labels: string[] = [];
  baseCategory = [
    '0h',
    '1h',
    '2h',
    '3h',
    '4h',
    '5h',
    '6h',
    '7h',
    '8h',
    '9h',
    '10h',
    '11h',
    '12h',
    '13h',
    '14h',
    '15h',
    '16h',
    '17h',
    '18h',
    '19h',
    '20h',
    '21h',
    '22h',
    '23h',
  ];

  // Initialize chart when component is first loaded
  ngOnInit(): void {
    this.chartOptions = {
        series: [],
        chart: {
          height: 350,
          type: 'line',
          zoom: {
            enabled: false,
          },
          animations: {
            enabled: true,
          },
        },
        stroke: {
          curve: 'straight',
        },
        labels: this.labels,
        title: {
          text: 'My First Angular Chart',
        },
        xaxis: {
          categories: this.baseCategory,
        },
    };

    // this.series = [
    //     {
    //         name: 'temperature',
    //         data: this.data.map((d) => d.value)
    //     }
    // ]
      
    this.chart = new ApexCharts(document.querySelector('#chart'), this.chartOptions);
    this.chart.render();
    this.updateChartData();
  }

  updateChartData() {
    this.setDataArray();
// todo should temp be int instead of float?
// why is max y value only 6 when temp is 22.1?
    // Update the series data with the new temperature values
    console.log(this.series);
    this.series[0].data = this.temperatures;
    // Update the xAxis categories
    this.chartOptions.xaxis!.categories = this.categories;
    // Refresh the chart to reflect the changes
    this.chart.updateSeries(this.series);
    this.chart.updateOptions({ xaxis: { categories: this.categories } });
  }

  setDataArray() {
    let period = this.getPeriod();

    // Reset values to avoid previous data interfering
    this.temperatures = [];
    this.categories = [];

    // Helper function to get the day of the week (0-6) from a date object
    const getDayOfWeek = (date: string) => new Date(date).getDay();

    // Helper function to format date for month and year views
    const formatDateForCategory = (date: string, period: string) => {
        const dateObj = new Date(date);
        switch (period) {
          case 'month':
            return getDayMonthFromDate(dateObj);  // Assuming this returns day of the month as a string
          case 'year':
            return formatDate(dateObj);  // Assuming this formats the date for the year category
          default:
            return '';
        }
    };

    switch(period) {
      case 'week':
        this.handleWeekView(getDayOfWeek);
        break;

      case 'month':
        this.handleMonthView(formatDateForCategory, 'month');
        break;

      case 'year':
        this.handleMonthView(formatDateForCategory, 'year');
        break;

      case 'custom':
        // this.toastService.showError('not yet implemented');
        break;

      default: // day
        for (let i = 0; i < 24; i++) this.temperatures.push(null);
        for (let temp of this.data) {
            let hour = +temp.timestamp.toString().split(',',4)[3];
            this.temperatures[hour] = temp.value;
        }
    }
  }

  getPeriod(): string {
    const sortedDates = this.data.map(d => new Date(d.timestamp)).sort((a, b) => new Date(a).getTime() - new Date(b).getTime());
    const earliestDate = sortedDates[0];
    const latestDate = sortedDates[sortedDates.length - 1];

    // Check if the dates are from the same day
    if (this.isSameDay(earliestDate, latestDate)) {
    return 'day';
    }
    
    // Check if the dates are within the same week
    if (this.isSameWeek(earliestDate, latestDate)) {
        return 'week';
    }
    
    // Check if the dates are within the same month
    if (this.isSameMonth(earliestDate, latestDate)) {
        return 'month';
    }
    
    // Check if the dates are within the same year
    if (this.isSameYear(earliestDate, latestDate)) {
        return 'year';
    }
    return 'default';
  }

    // Helper method to check if the two dates are from the same day
    private isSameDay(date1: Date, date2: Date): boolean {
      return date1.getDate() === date2.getDate() &&
              date1.getMonth() === date2.getMonth() &&
              date1.getFullYear() === date2.getFullYear();
    }
  
    // Helper method to check if the two dates are from the same week
    private isSameWeek(date1: Date, date2: Date): boolean {
      return isWithinInterval(date1, { start: startOfWeek(date2), end: date2 });
    }
  
    // Helper method to check if the two dates are from the same month
    private isSameMonth(date1: Date, date2: Date): boolean {
      return date1.getMonth() === date2.getMonth() && date1.getFullYear() === date2.getFullYear();
    }
  
    // Helper method to check if the two dates are from the same year
    private isSameYear(date1: Date, date2: Date): boolean {
      return date1.getFullYear() === date2.getFullYear();
    }
  

  // Handle 'week' view where each day of the week is represented
  private handleWeekView(getDayOfWeek: (date: string) => number) {
    // Initialize temperatures with null values for the 7 days of the week
    this.temperatures = new Array(7).fill(null);
  
    this.data.forEach(temp => {
      let position = getDayOfWeek(temp.timestamp) - 1;
      if (position < 0) position = 6;  // Adjust for Sunday (getDay() returns 0 for Sunday)
      this.temperatures[position] = temp.value;
    });
  
    this.categories = this.weekCategory;  // Use predefined week categories
  }
  
  // Handle 'month' and 'year' views which share a similar structure
  private handleMonthView(formatDateForCategory: (date: string, period: string) => string, period: string) {
    this.data.forEach(temp => {
      this.temperatures.push(temp.value);
      this.categories.push(formatDateForCategory(temp.timestamp, period));
    });
    // If it's the month view, set the series name to "day average"
    if (period === 'month') {
      this.series[0].name = 'day average';
    }
  }
}
