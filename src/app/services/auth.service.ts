import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    public fireAuth:AngularFireAuth
  ) { }

  get windowRef(){
    return window
  }
  getUser(){
    return this.fireAuth.authState;
  }

  logOutUser(){
    return this.fireAuth.signOut();
  }
}
