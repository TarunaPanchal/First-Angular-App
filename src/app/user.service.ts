import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url = 'http://localhost:1802/api';
  constructor(private http: HttpClient) { }


  login(user: String, pass: String) {
    const loginData = { username : user, password: pass };
    return this.http.post( '/api/login', loginData);
  }

  insertuser(user: any){
    return this.http.post('/api/register' , user);
  }

  getHeaderFormData() {
    let headers = new HttpHeaders();
    const token = JSON.parse(localStorage.getItem('token'));
    console.log('token', token);
    headers = headers.set('authorization', token);
    headers = headers.set('Accept', '*/*');
    return headers;
  }

  getHeader() {
    let headers = new HttpHeaders();
    const token = JSON.parse(localStorage.getItem('token'));
    headers = headers.set('authorization', token);
    headers = headers.set('Content-Type', 'application/json');
    console.log('headerrr', headers);
    return headers;
  }

  updateUser(id, data) {
    return this.http.put('/api/update' + '/' + id, data, { headers: this.getHeaderFormData() });
  }
  userList() {
    return this.http.get('/api/allUser', { headers: this.getHeaderFormData() });
  }

  getData(id){
       return this.http.get('/api' + '/' + id , {  headers: this.getHeaderFormData()});
  }

  deleteUser(id) {
    return this.http.delete('/api' + '/delete/' + id, { headers: this.getHeader() });
  }

  disableUser(id) {
    return this.http.put('/api' + '/disable/' + id, {  });
  }

  // getalldata() {
  //   console.log('welcome to servercie ')
  //   return this.http.get('/api/getalldata');
  // }
}
