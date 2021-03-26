import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { DatePipe } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-do-charity',
  templateUrl: './do-charity.component.html',
  styleUrls: ['./do-charity.component.css']
})
export class DoCharityComponent implements OnInit {

  constructor(
    public fireStore:AngularFirestore,
    public auth:AuthService,
    private datePipe: DatePipe,
    private snackBar: MatSnackBar
  ) { 
    this.date=new Date()
    this.date = this.datePipe.transform(this.date, 'yyyy-MM-dd');
  }
  phoneNumber:any;
  quantity:any
  timeOfPickup:any
  address:any
  status: any;
  date:any
  contactNo:any
  alert = "Congrats you just feed someones!"
  ngOnInit(): void {
    this.auth.getUser().subscribe(
      res => 
      this.phoneNumber = res.phoneNumber
    )
  }
  

  SubmitPost(){
    this.fireStore.collection('PickupOrders').add({
      contactNo:this.contactNo,
      quantity: this.quantity,
      Date: this.date,
      pickUpTime: this.timeOfPickup,
      address:this.address,
      status: 'pending',
      phone:this.phoneNumber,
      postTime:new Date().toLocaleTimeString()
     }
    )
    .then(res=>{
      this.status = "Success"
      this.openSnackBar()
      console.log(res)
      this.reset()
    })
    .catch(error=>{
      console.log(error)
    })
  }
  openSnackBar() {
    this.snackBar.open(this.alert,'Congrats', {
      duration:3000,
      verticalPosition: 'top'
    })
  }
  reset(){
    this.contactNo =""
    this.timeOfPickup =""
    this.address = ""
    this.quantity = ""
  }
}
