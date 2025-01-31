import { OnInit, Component, Input } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { take } from 'rxjs';
// import { DropdownSelectComponent } from 'src/app/shared/components/dropdown-select/dropdown-select.component';
import { CommonModule } from '@angular/common';
import { isWithinInterval, startOfWeek, startOfMonth, startOfYear } from 'date-fns';
import Temperature from '../../../../core/models/temperature';
import { ToastService } from '../../../../core/services/toast.service';
import { TemperatureService } from '../../../../core/services/temperature.service';
import { formatDate, getDayMonthFromDate } from '../../../utils/dateUtils';
import { SensorData } from '../../../../core/models/sensor-data.interface';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  // labels: number[];
  labels: string[];
  title: ApexTitleSubtitle;
};

export type SearchValues = {
  periodView: string;
  from_date: string;
  to_date: string;
  date: string;
}; // todo verify

@Component({
  selector: 'app-temperature',
  standalone: true,
  templateUrl: './temperature.component.html',
  styleUrl: './temperature.component.scss',
  // imports: [DropdownSelectComponent, CommonModule, NgApexchartsModule, FormsModule, ReactiveFormsModule]
})
export class TemperatureComponent implements OnInit {
  @Input() data: SensorData[] = [];
  public chartOptions!: Partial<ChartOptions>;

  series: ApexAxisChartSeries = [];
  temperatures: (number | null)[] = [5];
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
  weekCategory = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  categories: string[] = [];
  chart!: ApexCharts;

  colorScheme!: string;

  @Input() type: string = ""; //todo rename and use

  // https://apexcharts.com/angular-chart-demos/line-charts/missing-null-values/
  // https://codesandbox.io/p/sandbox/apx-line-missing-data-94t34?file=%2Fsrc%2Fapp%2Fapp.component.ts&from-embed=
  // https://github.com/apexcharts/apexcharts.js/tree/main/samples/vanilla-js/dashboards/realtime
  // https://codepen.io/apexcharts/pen/pxZKqL

  // https://github.com/apexcharts/ng-apexcharts/issues/197

  // install deps npm install apexcharts ng-apexcharts --legacy-peer-deps

  constructor(private temperatureService: TemperatureService, private toastService: ToastService) {}

  // todo button previous next -> GET TEMP of another day

  // create first chart
  ngOnInit() {
    console.log("init temp graph"); //todo
    console.log("type is " + this.type); 
    // todo service get temp -> fill array with null
    this.series = [
      {
        name: 'temperature',
        data: this.temperatures,
      },
      // {
      //   name: 'My-series',
      //   data: [10, 20, 35, null, 11, -5, 11],
      // },
      // {
      //   name: 'David',
      //   data: [18, 22, 30, -4, null, -20, 29],
      // },
    ];

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

    console.log("new apexchart for temp"); //todo
    this.chart = new ApexCharts(document.querySelector('#chart'), this.chartOptions);
    console.log(this.chartOptions); //todo

    this.chart.render(); // todo duplicate graph?
    this.chart.updateSeries(this.series);

    //this.chart.updateSeries([{ name: 'temperature', data: this.temperatures }]);
    //this.chart.updateOptions({ xaxis: { categories: this.baseCategory } });

    this.initGraph();  
    // todo deactivated this.searchTemps();
  }

  initGraph() {
    this.temperatureService
      .getTemperaturesOfDay(formatDate(new Date()))
      .pipe(take(1))
      .subscribe({
        next: (temperatures) => {
          console.log("init temp graph function"); //todo
          console.log(temperatures);
          this.setTemperatureArray(temperatures, 'day');
        },
      });
  }

  // map temperatures objects to value array
  setTemperatureArray(temperatures: Temperature[], period: string) {
    // for every temp of today -> take value else null in new array
    // put temp in this.temperatures and hours in this.labels
    this.temperatures = []; //todo needed?
    this.categories = [];
    switch (period) {
      case 'week':
        console.log(temperatures);
        for (let i = 0; i < 7; i++) this.temperatures.push(null);
        for (let temp of temperatures) {
          let position = new Date(temp.date.toString().split(',', 3).toString()).getDay() - 1;
          if (position < 0) position = 6;
          this.temperatures[position] = temp.temperature;
        }
        console.log(this.temperatures); //todo
        this.categories = this.weekCategory;
        break;

      case 'month':
        for (let temp of temperatures) {
          this.temperatures.push(temp.temperature);
          this.categories.push(getDayMonthFromDate(new Date(temp.date.toString().split(',', 3).toString())));
        }
        this.series[0].name = 'day average';
        break;

      case 'year':
        for (let temp of temperatures) {
          this.temperatures.push(temp.temperature);
          this.categories.push(formatDate(new Date(temp.date.toString().split(',', 3).toString())));
        }
        break;

      case 'custom':
        this.toastService.showError('not yet implemented');
        this.temperatures = [];
        break;

      default: // todo what if multiple temps at same hour ??
        let newPeriod = this.getDefaultPeriod(temperatures);
        if (newPeriod != "default") {
          this.setTemperatureArray(temperatures, newPeriod);
        }
        else {
          console.log("get default temp array");
          console.log(temperatures);
          for (let i = 0; i < 24; i++) this.temperatures.push(null);
          for (let temp of temperatures) {
            console.log(+temp.date.toString() + " : " +temp.date.toString().split(',', 4)[3]);
            this.temperatures[+temp.date.toString().split(',', 4)[3]] = temp.temperature;
            // todo what should I get as data ?
            // je dois recevoir tout pour un jour ? et utiliser time plutot que date?
          }
          this.categories = this.baseCategory;
        }
    }
    // update chart with temps and xAxis
    this.series[0].data = this.temperatures; // update series
    this.chartOptions.xaxis!.categories = this.categories; // update categories
    this.chart.updateSeries(this.series);

    //this.chart.updateSeries([{ name: 'temperature', data: this.temperatures }]);
    this.chart.updateOptions({ xaxis: { categories: this.categories } });
  }

  getDefaultPeriod(temps: Temperature[]) {
    // Sort dates
    //const dates = temps.map(temp => new Date(temp.date[0], temp.date[2] - 1, temp.date[1]));
    temps.map(t => {console.log(t);});
    console.log("dates");
    //console.log(dates);
    //const sortedDates = dates.sort((a, b) => a.getTime() - b.getTime());
    // Get the earliest and latest date
    const earliestDate = new Date();// sortedDates[0];
    const latestDate = new Date();// sortedDates[sortedDates.length - 1];

    // Check if the dates are from the same day
    if (this.isSameDay(earliestDate, latestDate)) {
      return 'day';
    }

    // Check if the dates are within the same week
    if (this.isSameWeek(earliestDate, latestDate)) {
      return 'deek';
    }

    // Check if the dates are within the same month
    if (this.isSameMonth(earliestDate, latestDate)) {
      return 'donth';
    }

    // Check if the dates are within the same year
    if (this.isSameYear(earliestDate, latestDate)) {
      return 'dear';
    }

    return 'default'; // If the dates span over multiple years
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

  // // map temperatures objects to value array
  // setTemperatureArray(temperatures: Temperature[]) {
  //   // for every temp of today -> take value else null in new array
  //   // put temp in this.temperatures and hours in this.labels
  //   this.temperatures = []; //todo needed?
  //   this.categories = [];
  //   if (this.formGroup.value.periodView == 'day') {
  //     for (let i = 0; i < 24; i++) {
  //       this.temperatures.push(null);
  //     }
  //     for (let temp of temperatures) {
  //       this.temperatures[+temp.date.toString().split(',', 4)[3]] = temp.value;
  //     } // todo what if multiple temps at same hour ??
  //     this.categories = this.baseCategory;
  //   }
  //   if (this.formGroup.value.periodView == 'week') {
  //     // show only dates of given temperatures
  //     for (let i = 0; i < 7; i++) {
  //       this.temperatures.push(null);
  //     }
  //     for (let temp of temperatures) {
  //       let position = new Date(temp.date).getDay() - 1;
  //       if (position < 0) position = 6;
  //       this.temperatures[position] = temp.value;
  //     }
  //     this.categories = this.weekCategory;
  //   }
  //   if (this.formGroup.value.periodView == 'month') {
  //     // show only average
  //     for (let temp of temperatures) {
  //       this.temperatures.push(temp.value);
  //       this.categories.push(formatDate(temp.date));
  //     }
  //     this.series[0].name = 'day average';
  //   }
  //   if (this.formGroup.value.periodView == 'year') {
  //     // show average per month ? / per week
  //     for (let temp of temperatures) {
  //       this.temperatures.push(temp.value);
  //       this.categories.push(formatDate(temp.date));
  //     }
  //   }
  //   if (this.formGroup.value.periodView == 'custom') {
  //     this.toastr.error('not yet implemented');
  //   }

  //   // // update chart with temps and xAxis
  //   // this.series[0].data = this.temperatures; // update series
  //   // this.chartOptions.xaxis!.categories = this.categories; // update categories
  //   // this.chart.updateSeries(this.series);

  //   // //this.chart.updateSeries([{ name: 'temperature', data: this.temperatures }]);
  //   // this.chart.updateOptions({ xaxis: { categories: this.categories } });

  //   // todo remove this chart -> send to tempElement instead
  //   this.tempElement.updateGraph(this.temperatures, this.categories);
  // }

  // todo no data -> There is no data

  // call service get temps
  // todo make async ??
  // searchTemps() {
  //   // this.temperatureService
  //   //   .getTemperaturesOfDay(formatDate(new Date(this.formGroup.value.date!)))
  //   //   .pipe(take(1))
  //   //   .subscribe({
  //   //     next: (temperatures) => {
  //   //       this.setTemperatureArray(temperatures);
  //   //       this.updateTemps();
  //   //     },
  //   //   });

  //   //     if (resetPage) {
  //   //   this.page = 0;
  //   // }

  //   this.temperatureService
  //     .getTemperaturesOfDay(formatDate(getToday()))
  //     .pipe(take(1))
  //     .subscribe({
  //       next: (temperatures) => {
  //         this.setTemperatureArray(temperatures);
  //       },
  //       error: (err) => {
  //         this.toastr.error(err.error.message ?? 'There was a problem loading the reservations', 'Error');
  //         console.log('error on search temps'); //todo
  //       },
  //     });
  //   // let temp: Temperature = {id: 15, date: getToday(), value: 99};
  //   // this.temperatureService.saveTemperature(temp); //todo
  // }

  // delay(ms: number) {
  //   return new Promise((resolve) => setTimeout(resolve, ms));
  // }

  // updateGraph(temperatureList: (number | null)[], categoryList: string[]) {
  //   // update chart with temps and xAxis
  //   this.series[0].data = temperatureList; // update series
  //   this.chartOptions.xaxis!.categories = categoryList; // update categories
  //   this.chart.updateSeries(this.series);

  //   //this.chart.updateSeries([{ name: 'temperature', data: this.temperatures }]);
  //   this.chart.updateOptions({ xaxis: { categories: categoryList } });
  // }

  updateGraph(searchValues: SearchValues) {
    this.temperatureService
      .getSearchByParams(searchValues.date, searchValues.from_date, searchValues.to_date, searchValues.periodView)
      .pipe(take(1))
      .subscribe({
        next: (temperatures) => {
          this.setTemperatureArray(temperatures, searchValues.periodView);
        },
        error: (err) => {
          this.toastService.showError(err.error.message ?? 'There was a problem loading the reservations');
          console.log('error on search temps'); //todo
        },
      });
    // let temp: Temperature = { id: 15, date: getToday(), value: 99 };
    // this.temperatureService.saveTemperature(temp); //todo
  }
}
