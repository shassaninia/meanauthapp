import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {tokenNotExpired} from 'angular2-jwt';

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

  getProfile(){
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization',this.authToken);
    headers.append('content-type','application/json');

    return this.http.get('http://localhost:3000/users/profile',{headers:headers})
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

  loadToken(){
    const token = localStorage.getItem('id_token');
    this.authToken = token;

  }

  loggedIn(){
    return tokenNotExpired();
  }
  logout(){

    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
}
