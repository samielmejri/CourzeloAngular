import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RegisterRequest} from "../../model/RegisterRequest";
import {AuthenticationService} from "../../../service/user/auth/authentication.service";
import { Router } from '@angular/router';
import { AbstractControl } from '@angular/forms';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerRequest: RegisterRequest = {};
  message = '';
  messageSuccess = '';
  registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', [Validators.required, Validators.maxLength(20), Validators.minLength(3)]],
      lastname: ['', [Validators.required, Validators.maxLength(20), Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.maxLength(50), Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required, Validators.maxLength(50), Validators.minLength(8)]],
    },
    {
      validator: this.ConfirmedValidator('password', 'confirmPassword'),
    }
  );

  constructor(
    private authService: AuthenticationService,
    private formBuilder: FormBuilder,
    private router : Router
  ) {
  }

  ConfirmedValidator(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (matchingControl.errors) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({confirmedValidator: true});
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  registerUser() {
    if (this.registerForm.valid) {
      this.registerRequest.email = this.registerForm.controls['email'].value!.toLowerCase().trim();
      this.registerRequest.name = this.registerForm.controls['name'].value!.toLowerCase().trim();
      this.registerRequest.lastname = this.registerForm.controls['lastname'].value!.toLowerCase().trim();
      this.registerRequest.password = this.registerForm.controls['password'].value!;
      this.registerRequest.name = this.registerRequest.name!.charAt(0).toUpperCase() + this.registerRequest.name!.slice(1);
      this.registerRequest.lastname = this.registerRequest.lastname!.charAt(0).toUpperCase() + this.registerRequest.lastname!.slice(1);
  
      console.log(this.registerRequest);
      this.authService.register(this.registerRequest)
        .subscribe(data => {
            console.log(data)
            this.messageSuccess = data.msg!;
            // Navigate to login page only after successful registration
            this.router.navigateByUrl('/login');
          },
          error => {
            console.log("register error :", error);
            if (error.status === 409 && error.error.msg === 'Email already exists') {
              // Display an alert informing the user that the email is already taken
              alert('This email is already taken. Please use a different email.');
            } else {
              // Display a generic error message
              this.message = 'An error occurred while registering. Please try again later.';
            }
          });
    } else {
      // Display an alert indicating required fields
      alert('Please fill in all required fields.');
    }
  }
}