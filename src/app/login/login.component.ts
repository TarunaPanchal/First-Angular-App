import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { from } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted: Boolean = false;
  invalidLogin: Boolean = false;
  msg: string;
  messages: string[] = [];
  ad = 'admin@gmail.com';
  adp = 'Admin@123';


  constructor(private formBuilder: FormBuilder, private router: Router, private userservice: UserService, private Toastr: ToastrService
  ) { }
  get f() {
    return this.loginForm.controls;
  }
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.pattern(/^[A-Za-z\d\.\_\-\+]{3,64}\@([A-Za-z\d]+)\.[A-Za-z\d]+(.[A-Za-z\d]+)?$/)]],
      // tslint:disable-next-line: max-line-length
      password: ['', Validators.required],
      // tslint:disable-next-line: max-line-length
      // cpassword: ['', [Validators. required, Validators.pattern(/^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])[\w\d!@#$%_]{8,15}$/)]],
    });
  }
  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    else {
      var user = this.loginForm.value.username;
      var pass = this.loginForm.value.password;

      this.userservice.login(user, pass).subscribe(data => {
        if (data['status'] === 200 && data['role'] === 'user' && data['disable'] === false) {
          localStorage.removeItem('token');

          localStorage.setItem('token', JSON.stringify(data['data']));
          localStorage.setItem('id', JSON.stringify(data['id']));
          console.log('----->', data)
          let obj = {
            'status': data['status'],
            'id': data['id']
          };
          this.router.navigate(['editprofile']);

        } else if (data['status'] === 200 && data['role'] === 'user' && data['disable'] === true) {
          this.Toastr.error('User is Disable');
        }
        else if (data['status'] == 200 && data['role'] == 'Admin') {
          localStorage.removeItem('token');
          localStorage.setItem('token', JSON.stringify(data['data']));
          localStorage.setItem('id', JSON.stringify(data['id']));
          let obj = {
            'status': data['status'],
            'id': data['id']
          };
          this.router.navigate(['list']);
        }
        else {
          this.Toastr.error(data['message']);
        }
      });

    }
  }
}


