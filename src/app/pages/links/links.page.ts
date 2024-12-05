import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription, take } from 'rxjs';
import { ILang } from 'src/app/shared/models/ILang';
import * as AppStore from './../../shared/store/app.state';
import { NavController } from '@ionic/angular';
import { IUSer } from 'src/app/shared/models/IUser';
import * as UserStore from './../../shared/store/user.state';
import { AnimationOptions } from 'ngx-lottie';
import { AnimationItem } from 'lottie-web';
import { OverlayService } from 'src/app/shared/services/overlay.service';
import { TranslateService } from '@ngx-translate/core';
import { Title } from '@angular/platform-browser';
import { AnalyticsService } from 'src/app/core/services/firebase/analytics.service';
import { AnalyticsEventnameEnum } from 'src/app/shared/enums/Analytics';

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

  public hasTranslation: boolean = false;

  public options: AnimationOptions = {
    path: './../../../assets/movie/anfitrion-around-the-world.json',
    autoplay: true,
    loop: true
  };

  constructor(
    private store : Store,
    private navCtrl : NavController,
    private overlayService : OverlayService,
    private translate : TranslateService,
    private title : Title,
    private analyticsService : AnalyticsService
  ) { }

  ngOnInit() {
    this.getUserFromNGRX();
    this.getCurrentLanguageFromNGRX();
    this.isInstagramBrowser();
  }

  ionViewWillEnter(): void {
    this.title.setTitle('Links');
    this.analyticsService.tagViewInit(AnalyticsEventnameEnum.PAGE_VIEW);
  }

  public async isInstagramBrowser() {

    this.translate.get('LINKS_PAGE')
    .pipe(take(1))
    .subscribe(async (res: any) => {
      if (res) {
        const alert = await this.overlayService.fireAlert({
          mode: 'ios',
          subHeader: res.HI_VISITANT,
          message: res.RECOMMEND,
          buttons: [res.ALERT_BTN]
        })

        const userAgent: string = navigator.userAgent || (window as any).opera;
        // Verificando se o user-agent contém referências ao Instagram
        let isInstagragramBroswer = /Instagram/i.test(userAgent);

        if (isInstagragramBroswer) {
          await alert.present();
        }
      }
    })
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
      this.navTo(['/logado']);
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
