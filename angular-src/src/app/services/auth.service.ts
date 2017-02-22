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

  authenticateUser(user){

    let headers = new Headers();

    headers.append('content-type','application/json');

    return this.http.post('http://localhost:3000/users/authenticate',user,{headers:headers})
               .map(response =>response.json());
  }

  storeUserData(token, user){
    //passport jwt will automatically look for id_token by default
    localStorage.setItem('id_token',token);

    //local storage only stores strings, so we stringify our user object
    localStorage.setItem('user',JSON.stringify(user));

    this.authToken = token;
    this.user = user;
  }
}
