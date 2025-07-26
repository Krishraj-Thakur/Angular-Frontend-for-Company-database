import { Component,inject,Inject, NgModule } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonService } from '../../Service/common.service';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatIcon } from '@angular/material/icon';
import { CommonModule, NgClass } from '@angular/common';
import { MatOption } from '@angular/material/autocomplete';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-create-request-dialog.components',
  standalone: true,
  imports: [MatTableModule, MatFormFieldModule, MatInputModule, MatButtonModule, ReactiveFormsModule, MatDialogModule,MatIcon,MatOption, NgClass,MatDatepicker,MatSelectModule,CommonModule],
  templateUrl: './create-request-dialog.components.html',
  styleUrl: './create-request-dialog.components.scss'
})
export class CreateRequestDialogComponents {
   
  requestForm: FormGroup;

  prTypeOptions = [
    { id: 1, name: 'Asset' },
    { id: 2, name: 'Service' },
    { id: 3, name: 'Source' }
  ];

  materialOptions = [
    { id: 1, name: 'Rice' },
    { id: 2, name: 'Wheat' },
    { id: 3, name: 'Barley' },
    { id: 4, name: 'Maize' },
    { id: 5, name: 'Millet' },
    { id: 6, name: 'Sorghum' },
    { id: 7, name: 'Green Gram' },
    { id: 8, name: 'Black Gram' },
    { id: 9, name: 'Bengal Gram' },
    { id: 10, name: 'Lentils' },
    { id: 11, name: 'Mustard Seeds' },
    { id: 12, name: 'Groundnut' },
    { id: 13, name: 'Soybean' },
    { id: 14, name: 'Cotton Seeds' },
    { id: 15, name: 'Chickpeas' }
  ];

  constructor(
    private dialogRef: MatDialogRef<CreateRequestDialogComponents>,
    private fb: FormBuilder,
    private commonService: CommonService
  ) {
    this.requestForm = this.fb.group({
      refNum: [null, Validators.required],
      prtype: [null, Validators.required],
      company: ['', Validators.required],
      prComsumed: ['', Validators.required],
      currency: [null, Validators.required],
      remarks: [''],
      pritemDetails: this.fb.array([this.createMaterialGroup()])
    });
  }

  get pritemDetails(): FormArray {
    return this.requestForm.get('pritemDetails') as FormArray;
  }

  createMaterialGroup(): FormGroup {
    return this.fb.group({
      matId: [null, Validators.required],
      availableQuantity: [null, [Validators.required, Validators.min(1)]],
      deliveryDate: ['', Validators.required],
      currentStatus: ['', Validators.required]
    });
  }

  addMaterial() {
    this.pritemDetails.push(this.createMaterialGroup());
  }

  removeMaterial(index: number) {
    if (this.pritemDetails.length > 1) {
      this.pritemDetails.removeAt(index);
    }
  }

  onSubmit() {
    if (this.requestForm.valid) {
      const formData = this.requestForm.value;
      this.commonService.postCreateRequest(formData).subscribe({
        next: (res) => {
          console.log('Success:', res);
          this.dialogRef.close(formData);
        },
        error: (err) => {
          console.error('Error:', err);
        }
      });
    } else {
      this.requestForm.markAllAsTouched();
    }
  }

  onCancel() {
    this.dialogRef.close(false);
  }
}
