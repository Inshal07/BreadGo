import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(
    public auth:AuthService,
    public fireStore:AngularFirestore,
    public router:Router
  ) {
    
   }
  user:any;
  number:any;
  userdetails:any;
  userHistory:any= [];
  ngOnInit(): void {
   this.user = this.auth.getUser().subscribe(
     res => {
       this.number = res.phoneNumber
      //  this.getUserHistory(this.number)
     }
   )
  }
  // getUserHistory(phnumber){
  //   console.log(this.number);
  //    this.fireStore.firestore.collection('PickupOrders').where(
  //     'phone', '==', this.number).get().then(posts => {
  //       this.userdetails = posts.docs.map(e => {
  //         console.log(e.data());
  //         this.userHistory.push(e.data())
  //         return {
  //           Phone: e.data()['phone'],
  //           Description: e.data()['status'],
  //         };
  //       })
  //   })
  // }
 
  logout(){
    this.auth.logOutUser()
    this.router.navigate([''])
  }
}
