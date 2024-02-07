import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-pay',
  standalone: true,
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.css'],
  imports: [CommonModule, FormsModule,ReactiveFormsModule,HttpClientModule]
})
export class PayComponent {
  paymentForm: FormGroup;
  paymentSuccess: boolean = false;

  constructor(private formBuilder: FormBuilder) {
    this.paymentForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zip: ['', [Validators.required, Validators.pattern('[0-9]{5}')]],
      cardName: ['', Validators.required],
      cardNum: ['', [Validators.required, Validators.pattern('[0-9]{16}')]],
      expMonth: ['', Validators.required],
      expYear: ['', Validators.required],
      cvv: ['', [Validators.required, Validators.pattern('[0-9]{3,4}')]],
      agree: [false, Validators.requiredTrue] // Checkbox for agreement
    });
  }

  onSubmit() {
    if (this.paymentForm.valid) {
      // Your payment submission logic goes here
      // For example:
      console.log('Payment form data:', this.paymentForm.value);
      this.paymentSuccess = true; // Simulate payment success
    } else {
      // Mark all fields as touched to display validation errors
      this.markFormGroupTouched(this.paymentForm);
    }
  }

  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
}