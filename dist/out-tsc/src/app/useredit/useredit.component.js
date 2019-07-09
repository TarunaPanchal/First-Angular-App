import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { ToastrService } from 'ngx-toastr';
var UsereditComponent = /** @class */ (function () {
    function UsereditComponent(formBuilder, router, userService, Toastr) {
        this.formBuilder = formBuilder;
        this.router = router;
        this.userService = userService;
        this.Toastr = Toastr;
        this.loading = false;
        this.submitted = false;
        this.imgUrl = 'http://localhost:1802/';
    }
    UsereditComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.updateForm = this.formBuilder.group({
            firstname: ['', Validators.required],
            lastname: ['', Validators.required],
            image: [''],
            username: ['', Validators.required],
            // tslint:disable-next-line: max-line-length
            password: ['']
        });
        console.log('----1--');
        this.userId = localStorage.getItem('Editid');
        console.log(this.userId);
        console.log('----2--');
        if (!this.userId) {
            this.Toastr.error("Data not Fetch");
            console.log("------3");
            // await this.router.navigate(['login']);
            return;
        }
        else {
            console.log('----4--');
            this.userService.getData(this.userId).subscribe(function (data) {
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
            });
        }
    };
    Object.defineProperty(UsereditComponent.prototype, "f", {
        get: function () { return this.updateForm.controls; },
        enumerable: true,
        configurable: true
    });
    UsereditComponent.prototype.onSubmit = function () {
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
                    localStorage.removeItem('id');
                    //           // alert("Your quote was updated");
                }
                else {
                    _this.Toastr.error(data['message']);
                    //           // alert("Some Problem");
                }
            });
        }
    };
    UsereditComponent.prototype.onFileChange = function (e) {
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
    UsereditComponent.prototype.backToList = function () {
        this.router.navigate(['list']);
    };
    UsereditComponent = tslib_1.__decorate([
        Component({
            selector: 'app-useredit',
            templateUrl: './useredit.component.html',
            styleUrls: ['./useredit.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [FormBuilder,
            Router,
            UserService,
            ToastrService])
    ], UsereditComponent);
    return UsereditComponent;
}());
export { UsereditComponent };
// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { UserService } from '../user.service';
// import { ToastrService } from 'ngx-toastr';
// @Component({
//   selector: 'app-useredit',
//   templateUrl: './useredit.component.html',
//   styleUrls: ['./useredit.component.css']
// })
// export class UsereditComponent implements OnInit {
//   result: any;
//   updateForm: FormGroup;
//   loading = false;
//   submitted: Boolean = false;
//   url: any;
//   filedata: any;
//   imgUrl: any = 'http://localhost:1802/';
//   arr: any;
//   userId: any;
//   constructor(private formBuilder: FormBuilder,
//     private router: Router,
//     private userService: UserService,
//     private Toastr: ToastrService) { }
//   ngOnInit() {
//     this.updateForm = this.formBuilder.group({
//       firstname: ['', Validators.required],
//       lastname: ['', Validators.required],
//       image: [''],
//       username: ['', Validators.required],
//       // tslint:disable-next-line: max-line-length
//       password: ['']
//     });
//     console.log('----1--')
//     this.userId = JSON.parse(localStorage.getItem('id'));
//     console.log(this.userId);
//     console.log('----2--')
//     if (!this.userId) {
//       this.Toastr.error("Data not Fetch");
//       console.log("------3");
//       // await this.router.navigate(['login']);
//       return;
//     }
//     else {
//       console.log('----4--')
//       this.userService.getData(this.userId).subscribe((data) => {
//         console.log('----5--')
//         if (data['status'] === 200) {
//           console.log('----6--')
//           this.result = data['data'];
//           this.Toastr.success('user retrived SuccessFully');
//           console.log('----7--', data['data'])
//           this.updateForm.patchValue({
//             firstname: this.result.firstname
//           });
//           this.updateForm.patchValue({ lastname: this.result.lastname });
//           this.updateForm.patchValue({ username: this.result.username });
//           console.log('----7--')
//           this.url = this.result.image;
//         } else {
//           this.Toastr.error(data['message']);
//         }
//       });
//     }
//   }
//   get f() { return this.updateForm.controls; }
//   onSubmit() {
//     console.log('----8--')
//     this.submitted = true;
//     if (this.updateForm.invalid) {
//       return;
//     } else {
//       console.log('----9--')
//       const fd = new FormData();
//       console.log(this.updateForm.value);
//       fd.append('firstname', this.updateForm.value.firstname);
//       fd.append('lastname', this.updateForm.value.lastname);
//       fd.append('username', this.updateForm.value.username);
//       fd.append('password', this.updateForm.value.password);
//       // tslint:disable-next-line: triple-equals
//       console.log('filedata', this.filedata);
//       // tslint:disable-next-line: triple-equals
//       if (this.filedata != undefined) {
//         fd.append('image', this.filedata);
//       }
//       this.userService.updateUser(this.userId, fd).subscribe((data) => {
//         console.log('----10--')
//         // // tslint:disable-next-line: triple-equals
//         if (data['status'] == 200) {
//           this.Toastr.success('record updated SuccessFully.');
//           localStorage.removeItem('id');
//           //           // alert("Your quote was updated");
//         } else {
//           this.Toastr.error(data['message']);
//           //           // alert("Some Problem");
//         }
//       });
//     }
//   }
//   onFileChange(e) {
//     this.imgUrl = '';
//     this.url = '';
//     if (e.target.files[0]) {
//       if (e.target.files[0].name.match(/\.(gif|jpg)$/)) {
//         this.filedata = e.target.files[0];
//         // tslint:disable-next-line: prefer-const
//         let reader = new FileReader();
//         reader.readAsDataURL(this.filedata);
//         reader.onload = (event) => {
//           this.url = reader.result;
//         };
//       } else {
//         this.Toastr.error('Only Image is Allow');
//       }
//     }
//   }
//   backToList() {
//     this.router.navigate(['list']);
//   }
//# sourceMappingURL=useredit.component.js.map