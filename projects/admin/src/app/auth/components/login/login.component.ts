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
    console.log(this.loginForm.value);
    this.spinner.show();
    this.service.login(this.loginForm.value).subscribe(
      (res) => {
        console.log(res);
        this.toastr.success('Hello world!', 'Toastr fun!');
        this.router.navigate(['/tasks']);


        this.spinner.hide();
        
      },
      (error) => {
        this.spinner.hide();
        this.toastr.error('Your Not Authenitcated !');
      },
    );
  }
}
