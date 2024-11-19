// auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { from, Observable, of } from 'rxjs';
import { catchError, map, switchMap, take } from 'rxjs/operators';
import { AuthService } from '../../services/firebase/auth.service';
import { Auth, authState } from '@angular/fire/auth';
import { NavController } from '@ionic/angular';
import { UsersService } from '../../services/firebase/users.service';
import { CollectionsEnum } from 'src/app/shared/enums/Collection';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private afAuth: Auth,
    private navCtrl: NavController,
    private userService : UsersService,
  ) {}

  canActivate(): Observable<boolean> {
    return authState(this.afAuth).pipe(
      take(1),
      switchMap(user => {
        if (user) {
          return from(this.userService.getUserByUID(CollectionsEnum.USERS, user)).pipe(
            map((resp) => {
              if (resp) {
                return true
              } else {
                return false
              } // resp é true ou false baseado no resultado do getUserByUID
            })
          );
        } else {
          this.navCtrl.navigateRoot(['/login']);
          return of(false); // Usuário não autenticado
        }
      })
    );
  }
}
