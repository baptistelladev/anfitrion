import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { ILang } from 'src/app/shared/models/ILang';
import * as AppStore from './../../shared/store/app.state';
import { NavController } from '@ionic/angular';
import { IUSer } from 'src/app/shared/models/IUser';
import * as UserStore from './../../shared/store/user.state';
import { AnimationOptions } from 'ngx-lottie';
import { AnimationItem } from 'lottie-web';

@Component({
  selector: 'anfitrion-links',
  templateUrl: './links.page.html',
  styleUrls: ['./links.page.scss'],
})
export class LinksPage implements OnInit, OnDestroy {

  public currentLanguage: ILang;
  public currentLanguage$: Observable<ILang>;
  public currentLanguageSubscription: Subscription;

  public user: IUSer;
  public user$: Observable<IUSer>;
  public userSubscription: Subscription;

  public options: AnimationOptions = {
    path: './../../../assets/movie/anfitrion-around-the-world.json',
    autoplay: true,
    loop: true
  };

  constructor(
    private store : Store,
    private navCtrl : NavController
  ) { }

  ngOnInit() {
    this.getUserFromNGRX();
    this.getCurrentLanguageFromNGRX();
  }

  public getUserFromNGRX(): void {
    this.user$ = this.store.select(UserStore.selectUser);

    this.userSubscription = this.user$
    .subscribe((user: IUSer) => {
      this.user = user;
    })
  }

  public getCurrentLanguageFromNGRX(): void {
    this.currentLanguage$ = this.store.select(AppStore.selectAppCurrentLanguage);

    this.currentLanguageSubscription = this.currentLanguage$
    .subscribe((language: ILang) => {
      this.currentLanguage = language;
    })
  }

  public navTo(route: any): void {
    this.navCtrl.navigateForward(route);
  }

  public navToMainPage(): void {
    if (this.user.uid) {
      this.navTo(['/logado/explorar']);
    } else {
      this.navTo(['/login']);
    }
  }

  public animationCreated(animationItem: AnimationItem): void {
    animationItem.setSpeed(0.8)
  }

  public ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
    this.currentLanguageSubscription.unsubscribe();
  }

}
