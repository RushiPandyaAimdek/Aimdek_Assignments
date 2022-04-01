import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { map } from 'rxjs';

export interface product { name: string; price: number; category: string }

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(public readonly afs: AngularFirestore) {
    this.productCollection = afs.collection<product>('products');
  }

  private productCollection: AngularFirestoreCollection<product>;

  //getting all products
  getProducts() {
     return this.productCollection.snapshotChanges().pipe(
       map(actions => actions.map(a => {
         const data = a.payload.doc.data() as product;
         const id = a.payload.doc.id;
         return { id, ...data };
       }))
     );
  }

  //for getting product by id
  getProduct(id: any) {
    return this.afs.collection('products').doc(id).valueChanges()
  }
}