import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import Icon from '../../core/models/icon';
import Sortable from '../../core/models/sortable';
import { IconComponent } from '../components/icon/icon.component';
import { Color } from '../../core/enum/color';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, IconComponent],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent implements OnInit {
  @Input() data: any[] = [];
  @Input() allHeaders: string[] = [];
  @Input() sortableColumns: string[] = [];
  @Input() importantHeaders: string[] = [];
  @Input() emptyTableText: string = "";
  @Input() icon: Icon = { name: '', color: 'black' };
  @Input() secondaryIcon: Icon = { name: '', color: 'black' };
  @Input() prefix: string = "";
  @Input() suffix: string = "";

  @Output() rowClicked = new EventEmitter<any>();
  @Output() iconClicked = new EventEmitter<any>();
  @Output() secondaryIconClicked = new EventEmitter<any>();
  @Output() colorClicked = new EventEmitter<any>();
  @Output() headerClicked = new EventEmitter<Sortable[]>();
  headers: string[] = [];
  sortingColumns: Sortable[] = [];

  ngOnInit(): void {
    if (this.allHeaders.length === 0) {
      this.allHeaders = this.data.length > 0 ? Object.keys(this.data[0]) : [];
    }
    if (this.importantHeaders.length === 0) {
      this.importantHeaders = this.allHeaders;
    }
    this.getDisplayedColumns();

    window.onresize = () => {
      this.getDisplayedColumns();
    };
  }

  getDisplayedColumns() {
    const width = window.innerWidth;
    if (width < 768) {
      this.headers = this.importantHeaders;
    } else {
      this.headers = this.allHeaders;
    }
  }

  shouldShowText(columnName: string, cell: any) {
    if (columnName === 'color') {
      return false;
    }

    const iconstrings = ['yes', 'no', 'maybe', 'pending'];
    if (typeof cell === 'boolean') {
      return false;
    }
    if (typeof cell === 'string') {
      if (iconstrings.includes(cell)) {
        return false;
      }
    }
    return true;
  }

  shouldDisplayColor(columnName: string) {
    if (columnName.toLocaleLowerCase() === 'color') {
      return true;
    }
    return false;
  }

  shouldDisplayIcon(cell: any) {
    const iconstrings = ['yes', 'no', 'maybe', 'pending'];
    if (typeof cell === 'boolean') {
      return true;
    }
    if (typeof cell === 'string') {
      if (iconstrings.includes(cell)) {
        return true;
      }
    }
    return false;
  }

  isPreOrSuffix(columnName: string) {
    return columnName == this.prefix.split(':')[0] || columnName == this.suffix.split(':')[0];
  }

  showPrefix(columnName: string) {
    if (this.prefix.split(':')[0] == columnName) return this.prefix.split(':')[1];
    return "";
  }

  showSuffix(columnName: string) {
    if (this.suffix.split(':')[0] == columnName) return this.suffix.split(':')[1];
    return "";
  }

  generateIcon(column: any) {
    if (typeof column === 'boolean') {
      if (column) {
        return { name: 'circle', color: Color.Green };
      }
      return { name: 'circle', color: Color.Red };
    }
    if (typeof column === 'string') {
      switch (column) {
        case 'yes':
          return { name: 'check', color: Color.Green };
        case 'no':
          return { name: 'times', color: Color.Red };
        case 'maybe':
          return { name: 'question', color: Color.Yellow };
        case 'pending':
          return { name: 'clock', color: Color.Blue };
      }
    }
    return { name: '', color: '' };
  }

  onRowHover(hover: boolean, item: any) {
    item.hover = hover;
  }

  onColorClick($event: any, row: any) {
    $event.stopPropagation();
    this.colorClicked.emit(row);
  }

  onRowClick(row: any) {
    this.rowClicked.emit(row);
  }

  onIconClick($event: any, item: any) {
    $event.stopPropagation();
    this.iconClicked.emit(item);
  }

  onSecondaryIconClick($event: any, item: any) {
    $event.stopPropagation();
    this.secondaryIconClicked.emit(item);
  }

  onColomnClick($event: any, column: any) {
    $event.stopPropagation();
    if (this.sortableColumns.includes(column)) {
      let found = false;
      for (let i = 0; i < this.sortingColumns.length; i += 1) {
        if (this.sortingColumns[i].name === column) {
          found = true;
          if (this.sortingColumns[i].direction === 'asc') {
            this.sortingColumns[i].direction = 'desc';
          } else if (this.sortingColumns[i].direction === 'desc') {
            this.sortingColumns.splice(i, 1);
          } else {
            this.sortingColumns[i].direction = 'asc';
          }
          this.headerClicked.emit(this.sortingColumns);
        }
      }
      if (!found) {
        this.sortingColumns.push({ name: column, direction: 'asc' });
      }
      this.headerClicked.emit(this.sortingColumns);
    }
  }

  getSortIcon(column: any) {
    for (const element of this.sortingColumns) {
      if (element.name === column) {
        return `-${element.direction}`;
      }
    }
    return '';
  }

  sortTable(sortableArray: Sortable[]) {
    if (!sortableArray.length) {
      this.data.sort((a, b) => this.compare(a.id, b.id));
    } else {
      this.data.sort((a, b) => {
        for (const sortOption of sortableArray) {
          const valueA = a[sortOption.name];
          const valueB = b[sortOption.name];
          const result = this.compare(valueA, valueB);

          if (result !== 0) {
            return sortOption.direction === 'asc' ? result : -result;
          }
        }
        return 0;
      });
    }
  }

  compare(a: any, b: any): number {
    if (typeof a === 'string' && typeof b === 'string') {
      return a.localeCompare(b);
    }
    if (typeof a === 'number' && typeof b === 'number') {
      return a - b;
    }
    if (typeof a === 'boolean' && typeof b === 'boolean') {
      return a === b ? 0 : a ? 1 : -1;
    }
    if (a instanceof Date && b instanceof Date) {
      return a.getTime() - b.getTime();
    }
    if (typeof a === 'object' && typeof b === 'object' && a !== null && b !== null) {
      return JSON.stringify(a).localeCompare(JSON.stringify(b));
    }

    return String(a).localeCompare(String(b));
  }
}