import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './Components/cart/cart.component'
import { LoginComponent } from './Components/login/login.component'
import { OrderComponent } from './Components/order/order.component'
import { RegisterComponent } from './Components/register/register.component'
import { ProductInfoComponent } from './Components/product-info/product-info.component'
import { HomeComponent } from './Components/home/home.component';
import { GuardService } from './Services/guard.service';
import { PlaceorderComponent } from './Components/placeorder/placeorder.component';

const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'cart', component: CartComponent },
  { path: 'product/:id', component: ProductInfoComponent },
  { path: 'order', component: OrderComponent,canActivate:[GuardService] },
  { path: 'placeorder', component: PlaceorderComponent,canActivate:[GuardService] },
  { path: '', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
