import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../Models/user';
import { UserLogin } from '../Models/userLogin';

const baseUrl = 'http://localhost:8080/api/v1/';

@Injectable({
  providedIn: 'root'
})
export class LoginAndRegisterService {

  constructor(private http: HttpClient) { }

  login(data: any):Observable<User>{
    return this.http.post<User>(`${baseUrl}login`, data);
  }

  saveUser(data: any):Observable<User>{
    return this.http.post<User>(`${baseUrl}User`, data);
  }

  getUser():Observable<User[]>{
    return this.http.get<User[]>(`${baseUrl}users`);
  }

  UserBy(data):Observable<User[]>{
    return this.http.post<User[]>(`${baseUrl}UserBy`, data);
  }

  deleteUser(id: any): Observable<User[]> {
    return this.http.delete<User[]>(`${baseUrl}User/${id}`);
  }

  sendEmail(data:any){
    return this.http.get<any>(`${baseUrl}msg`,data);
  }
}
