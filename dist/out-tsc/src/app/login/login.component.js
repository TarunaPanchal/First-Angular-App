import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
var LoginComponent = /** @class */ (function () {
    function LoginComponent(formBuilder, router, userservice, Toastr) {
        this.formBuilder = formBuilder;
        this.router = router;
        this.userservice = userservice;
        this.Toastr = Toastr;
        this.submitted = false;
        this.invalidLogin = false;
        this.messages = [];
        this.ad = 'admin@gmail.com';
        this.adp = 'Admin@123';
    }
    Object.defineProperty(LoginComponent.prototype, "f", {
        get: function () {
            return this.loginForm.controls;
        },
        enumerable: true,
        configurable: true
    });
    LoginComponent.prototype.ngOnInit = function () {
        this.loginForm = this.formBuilder.group({
            username: ['', [Validators.required, Validators.pattern(/^[A-Za-z\d\.\_\-\+]{3,64}\@([A-Za-z\d]+)\.[A-Za-z\d]+(.[A-Za-z\d]+)?$/)]],
            // tslint:disable-next-line: max-line-length
            password: ['', [Validators.required, Validators.pattern(/^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])[\w\d!@#$%_]{8,15}$/)]],
        });
    };
    LoginComponent.prototype.onSubmit = function () {
        var _this = this;
        this.submitted = true;
        if (this.loginForm.invalid) {
            return;
        }
        else {
            var user = this.loginForm.value.username;
            var pass = this.loginForm.value.password;
            this.userservice.login(user, pass).subscribe(function (data) {
                if (data['status'] == 200 && data['role'] == 'user') {
                    localStorage.removeItem('token');
                    localStorage.setItem('token', JSON.stringify(data['data']));
                    localStorage.setItem('id', JSON.stringify(data['id']));
                    console.log('----->', data);
                    var obj = {
                        'status': data['status'],
                        'id': data['id']
                    };
                    _this.router.navigate(['editprofile']);
                }
                else if (data['status'] == 200 && data['role'] == 'Admin') {
                    localStorage.removeItem('token');
                    localStorage.setItem('token', JSON.stringify(data['data']));
                    localStorage.setItem('id', JSON.stringify(data['id']));
                    var obj = {
                        'status': data['status'],
                        'id': data['id']
                    };
                    _this.router.navigate(['list']);
                }
                else {
                    _this.Toastr.error(data['message']);
                }
            });
        }
    };
    LoginComponent = tslib_1.__decorate([
        Component({
            selector: 'app-login',
            templateUrl: './login.component.html',
            styleUrls: ['./login.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [FormBuilder, Router, UserService, ToastrService])
    ], LoginComponent);
    return LoginComponent;
}());
export { LoginComponent };
//# sourceMappingURL=login.component.js.map