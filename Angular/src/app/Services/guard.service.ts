import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class GuardService implements CanActivate {

  constructor(private userService: AuthenticationService, private router: Router) { }

  //creating guard
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (this.userService.isLoggedin !== true) {
      this.router.navigate(['/login']);
      return false
    }
    return true;
  }
}