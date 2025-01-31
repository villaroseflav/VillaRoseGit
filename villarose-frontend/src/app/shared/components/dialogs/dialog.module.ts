import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

import { SelectDropDownModule } from 'ngx-select-dropdown';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SelectDropDownModule,
        MatDialogModule,
        MatIconModule,
        SelectDropDownModule
    ]
})
export class DialogModule {}