import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors } from '@angular/forms';
// import { TemperatureService } from 'src/app/core/services/temperature.service';
// import { getToday, formatDate } from 'src/app/shared/utils/dateUtils';
import { take } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
// import { DropdownSelectComponent } from 'src/app/shared/components/dropdown-select/dropdown-select.component';
import { CommonModule } from '@angular/common';
import { TemperatureComponent } from '../temperature/temperature.component';
// import { NgxDropdownConfig, SelectDropDownModule } from 'ngx-select-dropdown';
import { formatDate, getToday } from '../../../utils/dateUtils';
import { DropdownSelectComponent } from '../../dropdown-select/dropdown-select.component';
import { SelectDropDownModule } from 'ngx-select-dropdown';

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
  selector: 'app-date-filter',
  standalone: true,
  templateUrl: './date-filter.component.html',
  styleUrl: './date-filter.component.scss',
  imports: [DropdownSelectComponent, CommonModule, ReactiveFormsModule, SelectDropDownModule],
})
export class DateFilterComponent implements OnInit {
  public chartOptions!: Partial<ChartOptions>;
  graphOptions: string[] = [];

  // @ViewChild('temperature') tempElement!: TemperatureComponent;

  // series: ApexAxisChartSeries = [];
  // temperatures: (number | null)[] = [];
  // labels: string[] = [];
  // baseCategory = [
  //   '0h',
  //   '1h',
  //   '2h',
  //   '3h',
  //   '4h',
  //   '5h',
  //   '6h',
  //   '7h',
  //   '8h',
  //   '9h',
  //   '10h',
  //   '11h',
  //   '12h',
  //   '13h',
  //   '14h',
  //   '15h',
  //   '16h',
  //   '17h',
  //   '18h',
  //   '19h',
  //   '20h',
  //   '21h',
  //   '22h',
  //   '23h',
  // ];
  // weekCategory = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  // categories: string[] = [];
  // chart!: ApexCharts;

  // startDate: string = '';
  // endDate: string = '';

  formGroup = new FormGroup(
    {
      periodView: new FormControl(''),
      from_date: new FormControl(''),
      to_date: new FormControl(''),
      date: new FormControl(''),
      // graph: new FormControl('')
    },
    { validators: [this.customValidator] },
  );

  searchValues: {
    periodView: string;
    from_date: string;
    to_date: string;
    date: string;
  } | null = null; // todo verify

  // graphDropdownConfig: NgxDropdownConfig = {
  //   clearOnSelection: false,
  //   customComparator(): number { return 0; },
  //   displayKey: 'graph',
  //   height: 'auto',
  //   inputDirection: '',
  //   limitTo: 0,
  //   moreText: 'more',
  //   noResultsFound: 'No results found!',
  //   searchOnKey: '',
  //   searchPlaceholder: '',
  //   search: true,
  //   placeholder: 'Select a graph',
  // };
  // state: any;

  constructor(
    // private temperatureService: TemperatureService,
    // private toastr: ToastrService,
    // private router: Router,
    private route: ActivatedRoute,
  ) {
    // this.state = this.router.getCurrentNavigation()?.extras.state; // todo use ?
  }

  ngOnInit() {
    this.route.params.pipe(take(1)).subscribe((params) => {
      if (params['title']) console.log('came from ' + params['title']);
    });

    console.log('init filter'); //todo
    this.formGroup.patchValue({
      date: formatDate(getToday()),
      periodView: 'day',
      to_date: formatDate(getToday()),
      from_date: formatDate(getToday()),
    });
    // todo on get temp -> if temps -> show, if too old (only gemiddelde temp) -> show one

    // this.graphOptions = ['temperature']; //todo
  }

  customValidator(group: AbstractControl): ValidationErrors | null {
    const periodView = group.get('periodView')?.value;
    const fromDate = group.get('from_date')?.value;
    const toDate = group.get('to_date')?.value;

    if (periodView === 'custom') {
      if (!fromDate || !toDate) {
        return {
          customValidation: {
            message: 'A start and end date is required when selecting custom period view',
          },
        };
      }
      if (fromDate > toDate) {
        return {
          customValidation: {
            message: 'Start date cannot be after end date',
          },
        };
      }
    }

    return null;
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

  // update form input period
  updatePeriod($event: string) {
    this.formGroup.patchValue({
      periodView: $event,
    });
    // todo call like getTemperatures: the service for temps of period
    // set temps
    // update temps
  }

  // call service get temps
  // todo make async ??
  search() {
    // this.temperatureService
    //   .getTemperaturesOfDay(formatDate(new Date(this.formGroup.value.date!)))
    //   .pipe(take(1))
    //   .subscribe({
    //     next: (temperatures) => {
    //       this.setTemperatureArray(temperatures);
    //       this.updateTemps();
    //     },
    //   });

    //     if (resetPage) {
    //   this.page = 0;
    // }
    this.searchValues = {
      periodView: this.formGroup.value.periodView!,
      from_date: this.formGroup.value.from_date!,
      to_date: this.formGroup.value.to_date!,
      date: this.formGroup.value.date!,
    };
    // this.tempElement.updateGraph(this.searchValues); TODO ACTION UPDATE ICI
    // this.temperatureService
    //   .getSearchByParams(
    //     this.formGroup.value.date!,
    //     this.formGroup.value.from_date!,
    //     this.formGroup.value.to_date!,
    //     this.formGroup.value.periodView!,
    //   )
    //   .pipe(take(1))
    //   .subscribe({
    //     next: (temperatures) => {
    //       this.setTemperatureArray(temperatures);
    //     },
    //     error: (err) => {
    //       this.toastr.error(err.error.message ?? 'There was a problem loading the reservations', 'Error');
    //       console.log('error on search temps'); //todo
    //     },
    //   });
    // let temp: Temperature = { id: 15, date: getToday(), value: 99 };
    // this.temperatureService.saveTemperature(temp); //todo
  }

  // delay(ms: number) {
  //   return new Promise((resolve) => setTimeout(resolve, ms));
  // }

  // showGraph() {
  //   console.log("showing " + this.formGroup.value.graph);
  // }
}

