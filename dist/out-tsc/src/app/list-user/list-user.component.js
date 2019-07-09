import * as tslib_1 from "tslib";
import { Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { ToastrService } from 'ngx-toastr';
function _window() {
    // return the global native browser window object
    return window;
}
var DataTablesResponse = /** @class */ (function () {
    function DataTablesResponse() {
    }
    return DataTablesResponse;
}());
var ListUserComponent = /** @class */ (function () {
    function ListUserComponent(zone, router, userservice, Toastr) {
        this.zone = zone;
        this.router = router;
        this.userservice = userservice;
        this.Toastr = Toastr;
        this.dtOptions = {};
        this.imgUrl = 'http://localhost:1802/';
    }
    ListUserComponent.prototype.ngOnInit = function () {
        // this.main();
        _window().my = _window().my || {};
        _window().my.notimgmt = _window().my.notimgmt || {};
        _window().my.notimgmt.editUser = this.editUser.bind(this);
        _window().my.notimgmt.deleteUser = this.deleteUser.bind(this);
        _window().my.notimgmt.disableUser = this.disableUser.bind(this);
        if (typeof (_window().isScriptLoadednotimgmt) == 'undefined')
            _window().isScriptLoadednotimgmt = false;
    };
    // main() {
    //   console.log('!1111111111');
    //   this.userservice.getalldata().subscribe((data) => {
    //     console.log('!11111111112');
    //     if (data['status'] == 200) {
    //       console.log('!1111111113');
    //       this.Toastr.success('Sucess');
    //       console.log('DATAAAA', data);
    //     }
    //   });
    // }
    ListUserComponent.prototype.ngAfterViewInit = function () {
        var that = this;
        $(document).ready(function () {
            $('#m_modal_6').hide();
            $(document).on('click', '.close', function (e) {
                $('#m_modal_6').hide();
            });
            $(document).on('click', '.btn-secondary', function (e) {
                $('#m_modal_6').hide();
            });
            $(document).on('click', '.btn-primary', function (e) {
                $('#m_modal_6').hide();
            });
            $('#usertable').DataTable({
                serverSide: true,
                ajax: {
                    'url': 'http://localhost:1802/api/allUser',
                    'type': 'POST',
                    'beforeSend': function (request) {
                        console.log('jhfhdgfh');
                        var localdata = JSON.parse(localStorage.getItem('token'));
                        request.setRequestHeader('Authorization', localdata);
                    },
                    'dataFilter': function (data) {
                        console.log('llllllllllllllllllllllllllll');
                        console.log('Data', data);
                        var json = $.parseJSON(data);
                        console.log('Data1', data);
                        if (json['status'] === 200) {
                            json.recordsTotal = json.data.totalDocs;
                            json.recordsFiltered = json.data.totalDocs;
                            json.data = json.data.docs;
                        }
                        return JSON.stringify(json);
                    }
                },
                columns: [
                    {
                        title: 'FirstName',
                        data: 'firstname'
                    },
                    {
                        title: 'LastName',
                        data: 'lastname'
                    },
                    {
                        title: 'UserName',
                        data: 'username'
                    }
                ],
                columnDefs: [
                    {
                        targets: 3,
                        title: 'Image',
                        orderable: !1,
                        render: function (a, e, t, n) {
                            return '<img style="height : 30px ; width :40px;" src="' + that.imgUrl + t.image + '">';
                        }
                    },
                    {
                        targets: 4,
                        title: 'Actions',
                        orderable: !1,
                        render: function (a, e, t, n) {
                            var id = (t._id);
                            return '\n<button class="btn btn-danger" data-id="' + id + '" data-toggle="modal" data-target="#m_modal_6" title="Delete" onclick="window.my.notimgmt.deleteUser(this)">Delete</button><button data-id="' + id + '" class="btn btn-primary" onclick="window.my.notimgmt.editUser(this)" style="margin-left: 20px;">Edit</button>&nbsp;&nbsp;&nbsp;&nbsp;<button class="btn btn-warning" data-id="' + id + '" data-toggle="modal"  data-target="#m_modal_6" title="Disable" onclick="window.my.notimgmt.disableUser(this)">Disable</button>';
                        }
                    }
                ],
                lengthMenu: [5, 10, 15, 20]
            });
        });
    };
    ListUserComponent.prototype.logOut = function () {
        localStorage.removeItem('token');
        this.router.navigate(['login']);
    };
    ListUserComponent.prototype.deleteUser = function (e) {
        $('#m_modal_6').show();
        this.deleteId = $(e).data('id');
    };
    ListUserComponent.prototype.deleteSure = function () {
        var _this = this;
        this.userservice.deleteUser(this.deleteId).subscribe(function (data) {
            if (data['status'] === 200) {
                _this.Toastr.success('Record Deleted SuccessFully');
                _this.deleteId = '';
                var table = $('#usertable');
                var auditorTable = table.DataTable();
                auditorTable.ajax.reload();
            }
            else {
                _this.Toastr.error(data['message']);
            }
        });
    };
    ListUserComponent.prototype.editUser = function (e) {
        var _this = this;
        $(e).data('id');
        localStorage.removeItem('Editid');
        localStorage.setItem('Editid', $(e).data('id').toString());
        this.zone.run(function () { _this.router.navigate(['user-edit']); });
        // this.router.navigate(['edit-user']);
    };
    ListUserComponent.prototype.disableUser = function (e) {
        $('#m_modal_6').show();
        this.disableId = $(e).data('id');
    };
    ListUserComponent.prototype.disableSure = function () {
        var _this = this;
        this.userservice.disableUser(this.disableId).subscribe(function (data) {
            if (data['status'] === 200) {
                _this.Toastr.success('User Disable SuccessFully');
                _this.deleteId = '';
                var table = $('#usertable');
                var auditorTable = table.DataTable();
                auditorTable.ajax.reload();
            }
            else {
                _this.Toastr.error(data['message']);
            }
        });
    };
    ListUserComponent = tslib_1.__decorate([
        Component({
            selector: 'app-list-user',
            templateUrl: './list-user.component.html',
            styleUrls: ['./list-user.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [NgZone,
            Router,
            UserService,
            ToastrService])
    ], ListUserComponent);
    return ListUserComponent;
}());
export { ListUserComponent };
//# sourceMappingURL=list-user.component.js.map