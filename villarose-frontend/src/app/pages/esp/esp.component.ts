import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../../layout/header/header.component";
import { take } from 'rxjs';
import { ToastService } from '../../core/services/toast.service';
import { MatDialog } from '@angular/material/dialog';
import { EspDialogComponent } from '../../shared/components/dialogs/esp-dialog/esp-dialog.component';
import { TableComponent } from "../../shared/table/table.component";
import { CommonModule } from '@angular/common';
import { DeviceService } from '../../core/services/device.service';
import { Device } from '../../core/models/device.interface';
import { mapToCreateUpdateDevice } from '../../core/mapper/device-mapper';

@Component({
  selector: 'app-esp',
  standalone: true,
  imports: [CommonModule, HeaderComponent, TableComponent],
  templateUrl: './esp.component.html',
})
export class EspComponent implements OnInit {
  espList: Device[] = [];

  constructor(private deviceService: DeviceService, private toastService: ToastService, private dialog: MatDialog) {}

  ngOnInit() {
    this.getEsps();
  }

  getEsps() {
    this.deviceService.getDevices().pipe(take(1))
    .subscribe({
      next: (esps) => {
        this.espList = esps;
      },
      error: (err) => {
        this.toastService.showError(err.error.message ?? 'There was a problem loading the esps');
        console.log('error on get esps'); //todo
      },
    });
  }

  editDevice(id: number) {
    // Find the device with the given id from espList
    const deviceToEdit = this.espList.find(device => device.id === id);

    if (deviceToEdit) {
      const dialogRef = this.dialog.open(EspDialogComponent, {
        data: mapToCreateUpdateDevice(deviceToEdit),
      });

      dialogRef.afterClosed().pipe(take(1)).subscribe({
        next: () => {
          this.getEsps();
        }
      });
    } else {
      this.toastService.showError('Device not found');
    }
  }

  createDevice() {
    const dialogRef = this.dialog.open(EspDialogComponent, {
      data: {}
    });

    dialogRef.afterClosed().pipe(take(1)).subscribe({
      next: () => {
        this.getEsps();
      }
    });
  }

  iconClicked($event: any) {
    console.log("clicked");
    this.editDevice($event.id);
  }
}
