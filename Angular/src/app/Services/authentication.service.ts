import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRoute, Router } from '@angular/router';

//structuring user
export interface user { id: string | undefined, name: string }

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {

  constructor(public auth: AngularFireAuth, private router: Router, private route: ActivatedRoute) { }

  //variable declaration
  public users: user | undefined

  // Sign up with email/password
  SignUp(email: string, password: string) {
    return this.auth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        this.router.navigate(['/cart'])
        const x = result.user?.email?.split("@")!
        this.users = {
          id: result.user?.uid,
          name: x[0]
        }
        localStorage.setItem('currentUser', JSON.stringify(this.users))
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  // Sign in with email/password
  SignIn(email: string, password: string) {
    return this.auth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.router.navigate(['/cart'])
        const x = result.user?.email?.split("@")!
        this.users = {
          id: result.user?.uid,
          name: x[0]
        }
        localStorage.setItem('currentUser', JSON.stringify(this.users))
      })
      .catch((error) => {
        this.router.navigate(['/login'])
        window.alert(error.message);
      });
  }

  //check wheather user is login or not
  get isLoggedin(): boolean {
    return localStorage.getItem('currentUser') ? true : false
  }
}