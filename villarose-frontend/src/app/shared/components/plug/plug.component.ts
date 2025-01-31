import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { TuyaService } from '../../../core/services/tuya.service';
import { HeaderComponent } from "../../../layout/header/header.component";

@Component({
  selector: 'app-plug',
  standalone: true,
  templateUrl: './plug.component.html',
  styleUrl: './plug.component.scss',
  imports: [HeaderComponent],
})
export class PlugComponent implements OnInit {
  constructor(private tuyaService: TuyaService) {}

  ngOnInit() {
    this.tuyaService
      .getState()
      .pipe(take(1))
      .subscribe({ next: (res) => console.log('got: ', res) });
  }

  toggle() {
    this.tuyaService
      .toggleTuya()
      .pipe(take(1))
      .subscribe({ next: (res) => console.log(res) });
  }

  on() {
    this.tuyaService
      .tuyaOn()
      .pipe(take(1))
      .subscribe({ next: (res) => console.log(res) });
  }

  off() {
    this.tuyaService
      .tuyaOff()
      .pipe(take(1))
      .subscribe({ next: (res) => console.log(res) });
  }
}
