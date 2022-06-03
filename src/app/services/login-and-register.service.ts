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
}
