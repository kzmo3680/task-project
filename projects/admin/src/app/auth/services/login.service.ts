import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from '../contexts/DTO';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http : HttpClient ) { }

  login(model : Login){
    return this.http.post(`http://localhost:8080/auth/login` , model);
  }

}
