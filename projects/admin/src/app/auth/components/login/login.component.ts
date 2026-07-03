import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private service: LoginService,
    private toastr: ToastrService,
    private router: Router,
    private spinner: NgxSpinnerService,
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(20),
        ],
      ],
      role: ['admin'],
    });
  }

  login() {
    
    // if (this.loginForm.invalid) {
    //   console.log("invalid");
      
    //   return;
    // }

    this.spinner.show();

    this.service.login(this.loginForm.value).subscribe({
      next: (res) => {
        console.log(res);

        // Save token if your backend returns one
        // localStorage.setItem('token', res.token);

        this.toastr.success('Login successful!');
        this.router.navigate(['/tasks']);
      },
      error: (error) => {
        console.error(error);
        this.toastr.error(error.error?.message || 'You are not authenticated!');
      },
      complete: () => {
        this.spinner.hide();
      },
    });
  }


}
