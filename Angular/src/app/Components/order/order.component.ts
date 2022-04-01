import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { OrderService } from 'src/app/Services/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  constructor(public afs: AngularFirestore,public orderService:OrderService) {}

  //variable declaration
  items:  any[] = new Array()
  userID = JSON.parse(localStorage.getItem('currentUser')!!)

  ngOnInit(): void {
    //getting data as per user logged in
    this.orderService.getData(this.userID.id).subscribe((ss: any) => {
      ss.docs.forEach((doc: any) => {
        this.items.push(doc.data())
      })
    })
   }
}