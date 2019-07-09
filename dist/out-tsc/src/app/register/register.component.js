import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { ToastrService } from 'ngx-toastr';
var RegisterComponent = /** @class */ (function () {
    function RegisterComponent(formBuilder, router, userService, Toastr) {
        this.formBuilder = formBuilder;
        this.router = router;
        this.userService = userService;
        this.Toastr = Toastr;
        this.loading = false;
        this.submitted = false;
    }
    RegisterComponent.prototype.ngOnInit = function () {
        this.registerForm = this.formBuilder.group({
            firstname: ['', Validators.required],
            lastname: ['', Validators.required],
            image: ['', Validators.required],
            username: ['', [Validators.required, Validators.pattern(/^[A-Za-z\d\.\_\-\+]{3,64}\@([A-Za-z\d]+)\.[A-Za-z\d]+(.[A-Za-z\d]+)?$/)]],
            // tslint:disable-next-line: max-line-length
            password: ['', [Validators.required, Validators.pattern(/^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])[\w\d!@#$%_]{8,15}$/)]]
        });
    };
    Object.defineProperty(RegisterComponent.prototype, "f", {
        get: function () { return this.registerForm.controls; },
        enumerable: true,
        configurable: true
    });
    // tslint:disable-next-line: deprecation
    RegisterComponent.prototype.onSubmit = function () {
        var _this = this;
        this.submitted = true;
        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }
        else {
            var fd = new FormData();
            fd.append('firstname', this.registerForm.value.firstname);
            fd.append('lastname', this.registerForm.value.lastname);
            fd.append('username', this.registerForm.value.username);
            fd.append('password', this.registerForm.value.password);
            fd.append('image', this.filedata);
            this.userService.insertuser(fd)
                .subscribe(function (data) {
                if (data['status'] == 200) {
                    _this.Toastr.success('Sucess');
                    _this.router.navigate(['login']);
                }
                else {
                    _this.Toastr.error(data['message']);
                }
            });
        }
    };
    RegisterComponent.prototype.onSelectFile = function (e) {
        var _this = this;
        console.log(e);
        if (e.target.files[0].name.match(/\.(gif|jpg)$/)) {
            this.filedata = e.target.files[0];
            // tslint:disable-next-line: prefer-const
            var reader_1 = new FileReader();
            reader_1.readAsDataURL(this.filedata);
            reader_1.onload = function (event) {
                _this.url = reader_1.result;
            };
        }
        else {
            this.Toastr.error('Only Image is Allow');
        }
    };
    RegisterComponent = tslib_1.__decorate([
        Component({
            selector: 'app-register',
            templateUrl: './register.component.html',
            styleUrls: ['./register.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [FormBuilder,
            Router,
            UserService,
            ToastrService])
    ], RegisterComponent);
    return RegisterComponent;
}());
export { RegisterComponent };
//# sourceMappingURL=register.component.js.map