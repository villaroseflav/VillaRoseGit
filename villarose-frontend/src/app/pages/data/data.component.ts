import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { TempTableComponent } from '../../shared/components/graphs/data/temp-table/temp-table.component';
import Sortable from '../../core/models/sortable';
import { TemperatureService } from '../../core/services/temperature.service';
import { formatDateArray, formatTimeArray } from '../../shared/utils/dateUtils';
import DisplayTemperature from '../../core/models/display-temperature';
import { HeaderComponent } from "../../layout/header/header.component";
import { SensorDataService } from '../../core/services/sensor-data.service';
import { DataType } from '../../core/models/sensor-data.interface';
import { LoadingSpinnerComponent } from '../../shared/components/loading-spinner/loading-spinner.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-data',
  standalone: true,
  templateUrl: './data.component.html',
  imports: [CommonModule, TempTableComponent, HeaderComponent, LoadingSpinnerComponent]
})
export class DataComponent implements OnInit {
  temperatures: DisplayTemperature[] = [];
  sortingColumns: Sortable[] = [];
  isLoading = true; // Set to true while data is loading

  // constructor(private temperatureService: TemperatureService) {}
  constructor(private dataService: SensorDataService) {}

  ngOnInit() {
    this.loadTemperatures();
  }

  loadTemperatures() {
    this.dataService.getSensorData().pipe(take(1)).subscribe({
      next: (data) => {
        this.temperatures = data.filter(d => d.type == DataType.temperature)
        .map(t => {
          return {
            id: t.id,
            date: formatDateArray(t.timestamp),
            time: formatTimeArray(t.timestamp), 
            temperature: t.value
          }
        })
        this.isLoading = false;
      },
      error: () => {
        console.log("error on data comp get temp");
        this.isLoading = false;
      }
    });
  }

  // loadTemperatures() {
  //   this.temperatureService.getTemperaturesSorted(this.sortingColumns).pipe(take(1)).subscribe({
  //     next: (temperatures) => {
  //       this.temperatures = temperatures.map((temp) => {
  //         return {
  //           id: temp.id,
  //           date: formatString(temp.date),
  //           time: temp.time.substring(0,5),
  //           temperature: temp.temperature
  //         };
  //       });
  //     },
  //     error: () => {
  //       // this.toastr.error('An error occurred while loading temperatures', 'Error'); todo
  //       console.log("Error on loading temperatures");
  //     }
  //   })
  // }

  updateSort(sortable: Sortable[]) {
    this.sortingColumns = sortable;
    this.loadTemperatures();
  }
}
