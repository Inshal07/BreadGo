import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  constructor(
    public auth:AuthService,
    public fireStore:AngularFirestore,
    public router:Router
  ) { }
  user:any;
  number:any;
  userdetails:any;
  userHistory:any= [];
  
  ngOnInit(): void {
    this.user = this.auth.getUser().subscribe(
      res => {
        this.number = res.phoneNumber
        this.getUserHistory(this.number)
      })
  }
  histStatus = true
  getUserHistory(phnumber){
    console.log(this.number);
     this.fireStore.firestore.collection('PickupOrders').where(
      'phone', '==', this.number).get().then(posts => {
        this.userdetails = posts.docs.map(e => {
         
          this.userHistory.push(e.data())
          this.histStatus =false
       
        })
    })
  }
}
