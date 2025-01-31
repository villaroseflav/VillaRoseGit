import { CommonModule } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { IconComponent } from '../../icon/icon.component';
import { ToastService } from '../../../../core/services/toast.service';
import { DeviceService } from '../../../../core/services/device.service';
import { CreateUpdateDevice } from '../../../../core/models/device.interface';

@Component({
  selector: 'app-esp-dialog',
  standalone: true,
  imports: [IconComponent, CommonModule, FormsModule],
  templateUrl: './esp-dialog.component.html',
})
export class EspDialogComponent implements OnInit, OnDestroy {
  device!: CreateUpdateDevice;

  editing = false;
  passwordVisible = false;  // Add this property to toggle password visibility

  private subscriptions: Subscription = new Subscription();

  constructor(
    private dialogRef: MatDialogRef<EspDialogComponent>,
    private deviceService: DeviceService,
    @Inject(MAT_DIALOG_DATA) public deviceDetailData: CreateUpdateDevice,
    private toastService: ToastService
  ) {}

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  ngOnInit(): void {
    if (this.deviceDetailData.id) {
      this.device = { ...this.deviceDetailData };
      console.log("editing");
      console.log(this.device);
      this.editing = true;
    } else {
      this.device = { id: undefined, name: '', domain: '', endpoint: '', ssid: '', password: '' };
    }
  }

  // onSelfAssignableChange() {
    //todo this.domain.selfAssignable = !this.domain.selfAssignable;
  // }

  stopPropagation($event: any) {
    $event?.stopPropagation();
  }

  closeDialog() {
    this.dialogRef.close();
  }

  onDelete() {
    if (!this.editing || this.device.id == undefined) {
      this.toastService.showError(`This device doesn't exist yet`);
      return;
    }

    const deleteSubscription = this.deviceService.deleteDevice(this.device.id!).subscribe({
      next: () => {
        this.toastService.showSuccess(`Successfully deleted device`);
        this.closeDialog();
      },
      error: () => {
        this.toastService.showError(`Failed to delete device`);
      }
    });
    this.subscriptions.add(deleteSubscription);
  }

  onSave() {
    if (!this.device.name) {
      this.toastService.showError(`Name is required`);
      return;
    }
    if (!this.device.domain) {
      this.toastService.showError(`Domain is required`);
      return;
    }
    if (!this.device.endpoint) {
      this.toastService.showError(`Endpoint is required`);
      return;
    }
    if (!this.device.ssid) {
      this.toastService.showError(`Ssid is required`);
      return;
    }
    if (!this.device.password) {
      this.toastService.showError(`Password is required`);
      return;
    }
    // this.domain.color = this.domain.color.replace('#', '');
    let updateDeviceSubscription;
    if (this.editing) {
      updateDeviceSubscription = this.deviceService.updateDevice(this.device).subscribe({
        next: () => {
          this.toastService.showSuccess(`Successfully updated domain`);
          this.closeDialog();
        },
        error: (err) => {
          this.toastService.showError(err.error.message);
        }
      });
    } else {
      updateDeviceSubscription = this.deviceService.createDevice(this.device).subscribe({
        next: () => {
          this.toastService.showSuccess(`Successfully updated domain`);
          this.closeDialog();
        },
        error: (err) => {
          this.toastService.showError(err.error.message);
        }
      });
    }
    this.subscriptions.add(updateDeviceSubscription);
  }

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;  // Toggle password visibility
  }
}
