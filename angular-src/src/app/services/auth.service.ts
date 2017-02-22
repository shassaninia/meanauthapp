import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {

  authToken:any;
  user:any;

  constructor(private http: Http) { }

  registerUser(user){

    let headers = new Headers();

    headers.append('content-type','application/json');

    return this.http.post('http://localhost:3000/users/register',user,{headers:headers})
               .map(response =>response.json());
  }
}
