import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';

import { CommonModule } from '@angular/common';
import DisplayTemperature from '../../../../../core/models/display-temperature';
import Sortable from '../../../../../core/models/sortable';
import { TableComponent } from '../../../../table/table.component';

@Component({
  selector: 'app-temp-table',
  standalone: true,
  imports: [TableComponent, CommonModule],
  templateUrl: './temp-table.component.html',
  styleUrl: './temp-table.component.scss',
})
export class TempTableComponent {
  @Input() temperatures: DisplayTemperature[] = [];
  @ViewChild(TableComponent) temperatureTable!: TableComponent;
  @Output() sortingChanged = new EventEmitter<Sortable[]>();

  // updateTemperatures(temperatures: Temperature[]): void {
  //   this.temperatures = temperatures;
  // }

  sortTable($event: any) {
    this.sortingChanged.emit($event);
    this.temperatureTable.sortTable($event);
  }
}
