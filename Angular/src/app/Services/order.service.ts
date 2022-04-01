import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  
  constructor(public afs: AngularFirestore) { }

  //getting data as per user id
  getData(userID:string){
    return this.afs.collection('orders', (ref: any) => ref.where("userID", "==", userID)).get()
  }
}