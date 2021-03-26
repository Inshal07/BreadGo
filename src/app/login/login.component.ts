import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { environment } from 'src/environments/environment';
import {MatDialog} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FirebaseApp } from '@angular/fire';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  windowRef:any;
  phoneNumber:any;
  verificationCode:any;
  user:any;
  status:any;
  error:any
  constructor(
    public fireauth: AuthService,
    public dialog: MatDialog,
    public router:Router,
  ) { 
    if (!firebase.apps.length) {
      firebase.initializeApp(environment.firebase)
  }
    
  }
 
  ngOnInit(): void {
    //captcha verification
    this.windowRef = this.fireauth.windowRef
    this.windowRef.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
    this.windowRef.recaptchaVerifier.render()
  }

  
  

  sendOTP(){
    const appVerifier = this.windowRef.recaptchaVerifier;
    const num = this.phoneNumber;

    firebase.auth().signInWithPhoneNumber('+91' +num, appVerifier).then(
      result =>{
        this.windowRef.confirmationRef = result;
        this.status = true;
      })
      .catch(
        err=>{
          console.log(err)
        })
  }
  verifyOTP(){
    this.windowRef.confirmationRef
    .confirm(this.verificationCode)
    .then( (result: { user: any; }) => {
      this.user = result.user;
      this.status = "OTP Verified"
      this.router.navigate(['do'])
   })
   .catch( (error: any) => {
    this.error='Invalid OTP'
    console.log(error, "Incorrect code entered?");
  })
}

reset(){
  this.phoneNumber =""
  this.status = ""
  this.verificationCode = ""
}

}
