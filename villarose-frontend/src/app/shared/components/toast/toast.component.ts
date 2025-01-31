import { Component } from '@angular/core';
import {NgClass, NgFor, NgIf} from '@angular/common';

import { ToastService, ToastType } from '../../../core/services/toast.service';
import {NgbToastModule} from '@ng-bootstrap/ng-bootstrap';
import {ButtonStyle} from "../../../core/enum/button-type.enum";

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss',
  host: {class: 'toast-container position-fixed'},
  standalone: true,
    imports: [NgbToastModule, NgFor, NgIf, NgClass]
})
export class ToastComponent {
  constructor(public toastService: ToastService) {}

  protected readonly ToastType = ToastType;
  protected readonly ButtonStyle = ButtonStyle;
}