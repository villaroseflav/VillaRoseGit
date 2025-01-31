import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IconComponent } from '../icon/icon.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dropdown-select',
  templateUrl: './dropdown-select.component.html',
  styleUrls: ['./dropdown-select.component.scss'],
  standalone: true,
  imports: [IconComponent, CommonModule, FormsModule],
})
export class DropdownSelectComponent<T> {
  @Input() options: T[] | undefined = [];
  @Input() selectedOption: any | undefined = undefined;
  @Input() disabled: boolean = false;
  @Input() label: string = '';
  isDropdownOpen = false;

  @Output() selectedOptionChange = new EventEmitter<any>();

  getOptionKey(option: T): any {
    return (option as any).id;
  }

  getOptionValue(option: T): string {
    return (option as any).name;
  }

  onSelectedOptionChange(value: any): void {
    this.selectedOption = value;
    this.selectedOptionChange.emit(value);
    this.isDropdownOpen = false;
  }
}
