import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { ToastrService } from 'ngx-toastr';
var EditProfileComponent = /** @class */ (function () {
    function EditProfileComponent(formBuilder, router, userService, Toastr) {
        this.formBuilder = formBuilder;
        this.router = router;
        this.userService = userService;
        this.Toastr = Toastr;
        this.loading = false;
        this.submitted = false;
        this.imgUrl = 'http://localhost:1802/';
    }
    EditProfileComponent.prototype.ngOnInit = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.updateForm = this.formBuilder.group({
                            firstname: ['', Validators.required],
                            lastname: ['', Validators.required],
                            image: [''],
                            username: ['', Validators.required],
                            // tslint:disable-next-line: max-line-length
                            password: ['']
                        });
                        console.log('----1--');
                        this.userId = JSON.parse(localStorage.getItem('id'));
                        console.log('----2--');
                        if (!!this.userId) return [3 /*break*/, 1];
                        this.Toastr.error("Data not Fetch");
                        console.log("------3");
                        // await this.router.navigate(['login']);
                        return [2 /*return*/];
                    case 1:
                        console.log('----4--');
                        return [4 /*yield*/, this.userService.getData(this.userId).subscribe(function (data) {
                                console.log('----5--');
                                if (data['status'] === 200) {
                                    console.log('----6--');
                                    _this.result = data['data'];
                                    _this.Toastr.success('user retrived SuccessFully');
                                    console.log('----7--', data['data']);
                                    _this.updateForm.patchValue({
                                        firstname: _this.result.firstname
                                    });
                                    _this.updateForm.patchValue({ lastname: _this.result.lastname });
                                    _this.updateForm.patchValue({ username: _this.result.username });
                                    console.log('----7--');
                                    _this.url = _this.result.image;
                                }
                                else {
                                    _this.Toastr.error(data['message']);
                                }
                            })];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Object.defineProperty(EditProfileComponent.prototype, "f", {
        get: function () { return this.updateForm.controls; },
        enumerable: true,
        configurable: true
    });
    EditProfileComponent.prototype.onSubmit = function () {
        var _this = this;
        console.log('----8--');
        this.submitted = true;
        if (this.updateForm.invalid) {
            return;
        }
        else {
            console.log('----9--');
            var fd = new FormData();
            console.log(this.updateForm.value);
            fd.append('firstname', this.updateForm.value.firstname);
            fd.append('lastname', this.updateForm.value.lastname);
            fd.append('username', this.updateForm.value.username);
            fd.append('password', this.updateForm.value.password);
            // tslint:disable-next-line: triple-equals
            console.log('filedata', this.filedata);
            // tslint:disable-next-line: triple-equals
            if (this.filedata != undefined) {
                fd.append('image', this.filedata);
            }
            this.userService.updateUser(this.userId, fd).subscribe(function (data) {
                console.log('----10--');
                // // tslint:disable-next-line: triple-equals
                if (data['status'] == 200) {
                    _this.Toastr.success('record updated SuccessFully.');
                    localStorage.removeItem('editUserId');
                    //           // alert("Your quote was updated");
                }
                else {
                    _this.Toastr.error(data['message']);
                    //           // alert("Some Problem");
                }
            });
        }
    };
    EditProfileComponent.prototype.onFileChange = function (e) {
        var _this = this;
        this.imgUrl = '';
        this.url = '';
        if (e.target.files[0]) {
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
        }
    };
    EditProfileComponent.prototype.logOut = function () {
        localStorage.removeItem('token');
        this.router.navigate(['login']);
    };
    EditProfileComponent = tslib_1.__decorate([
        Component({
            selector: 'app-edit-profile',
            templateUrl: './edit-profile.component.html',
            styleUrls: ['./edit-profile.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [FormBuilder,
            Router,
            UserService,
            ToastrService])
    ], EditProfileComponent);
    return EditProfileComponent;
}());
export { EditProfileComponent };
//# sourceMappingURL=edit-profile.component.js.map