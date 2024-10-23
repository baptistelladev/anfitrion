// auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map, take } from 'rxjs/operators';
import { AuthService } from '../../services/firebase/auth.service';
import { Auth, authState } from '@angular/fire/auth';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private afAuth: Auth, private navCtrl: NavController) {}

  canActivate(
  ): Observable<boolean> {
    return authState(this.afAuth)
    .pipe(
      take(1),
      map(user => {
        if (user) {
          console.log(user);

          return true;
        } else {
          this.navCtrl.navigateRoot(['/login']);
          return false;
        }
      })
    );
  }
}
