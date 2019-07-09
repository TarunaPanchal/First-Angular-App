import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
var UserService = /** @class */ (function () {
    function UserService(http) {
        this.http = http;
        this.url = 'http://localhost:1802/api';
    }
    UserService.prototype.login = function (user, pass) {
        var loginData = { username: user, password: pass };
        return this.http.post('/api/login', loginData);
    };
    UserService.prototype.insertuser = function (user) {
        return this.http.post('/api/register', user);
    };
    UserService.prototype.getHeaderFormData = function () {
        var headers = new HttpHeaders();
        var token = JSON.parse(localStorage.getItem('token'));
        console.log("token", token);
        headers = headers.set('authorization', token);
        headers = headers.set('Accept', '*/*');
        return headers;
    };
    UserService.prototype.getHeader = function () {
        var headers = new HttpHeaders();
        var token = JSON.parse(localStorage.getItem('token'));
        headers = headers.set('authorization', token);
        headers = headers.set('Content-Type', 'application/json');
        console.log('headerrr', headers);
        return headers;
    };
    UserService.prototype.updateUser = function (id, data) {
        return this.http.put('/api/update' + '/' + id, data, { headers: this.getHeaderFormData() });
    };
    UserService.prototype.userList = function () {
        return this.http.get('/api/allUser', { headers: this.getHeaderFormData() });
    };
    UserService.prototype.getData = function (id) {
        return this.http.get('/api' + '/' + id, { headers: this.getHeaderFormData() });
    };
    UserService.prototype.deleteUser = function (id) {
        return this.http.delete('/api' + '/delete/' + id, { headers: this.getHeader() });
    };
    UserService.prototype.disableUser = function (id) {
        return this.http.put('/api' + '/disable/' + id, { headers: this.getHeader() });
    };
    UserService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [HttpClient])
    ], UserService);
    return UserService;
}());
export { UserService };
//# sourceMappingURL=user.service.js.map