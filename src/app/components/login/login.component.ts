import { Component, inject } from '@angular/core';
import { CardModule } from 'primeng/card';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    CardModule,
    InputTextModule,
    ButtonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  fb = inject(FormBuilder)
  router = inject(Router)

  authorizationForm = this.fb.group({
    token: ['', Validators.required]
  })

  onTokenSubmit() {
    const bearerToken = this.authorizationForm.get('token')?.value
    // Sets the bearer token in localStorage for further usage if the input is not empty and navigates to products page
    if (bearerToken!.length > 0) {
      localStorage.setItem('bearerToken', bearerToken!)
      this.router.navigateByUrl('/products')
    }
  }
}
