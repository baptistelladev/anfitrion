import { Component, OnDestroy, OnInit } from '@angular/core';
import { AlertController, NavController, Platform } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { Observable, Subscription, take } from 'rxjs';
import { ILang } from 'src/app/shared/models/ILang';
import { Title } from '@angular/platform-browser';
import { AnalyticsService } from 'src/app/core/services/firebase/analytics.service';
import { AnalyticsEventnameEnum } from 'src/app/shared/enums/Analytics';
import { AuthService } from 'src/app/core/services/firebase/auth.service';
import { IUSer } from 'src/app/shared/models/IUser';
import * as UserStore from './../../../shared/store/user.state';
import * as AppStore from './../../../shared/store/app.state';
import { TranslateService } from '@ngx-translate/core';
import { UserTypeEnum } from 'src/app/shared/enums/UserType';

@Component({
  selector: 'anfitrion-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit, OnDestroy {

  public UserTypeEnum = UserTypeEnum;

  public menuOptions: any[] = [
    {
      text: {
        pt: 'Conta',
        en: 'Account',
        es: 'Cuenta'
      },
      icon: 'id-card',
      route: 'sua-conta',
      soon: false
    },
    {
      text: {
        pt: 'Dados',
        en: 'Data',
        es: 'Datos'
      },
      icon: 'finger-print',
      route: 'seus-dados',
      soon: false
    },
    {
      text: {
        pt: 'Contato',
        en: 'Contact',
        es: 'Contacto'
      },
      icon: 'call',
      route: 'contato',
      soon: false
    },
    {
      text: {
        pt: 'Sobre',
        en: 'About',
        es: 'Sobre'
      },
      icon: 'terminal',
      route: 'sobre-nos',
      soon: false
    },
    {
      text: {
        pt: 'Termos',
        en: 'Terms',
        es: 'Términos'
      },
      icon: 'document-text',
      route: 'termos-e-condicoes-de-uso',
      soon: false
    },
    {
      text: {
        pt: 'Favoritos',
        en: 'Favorits',
        es: 'Favoritos'
      },
      icon: 'star',
      route: 'sua-conta',
      soon: true
    },
  ]

  public currentLanguage: ILang;
  public currentLanguage$: Observable<ILang>;
  public currentLanguageSubscription: Subscription;

  public user: IUSer;
  public user$: Observable<IUSer>;
  public userSubscription: Subscription;

  constructor(
    private navCtrl : NavController,
    private store : Store,
    private title : Title,
    private analyticsService : AnalyticsService,
    private alertCtrl : AlertController,
    private authService : AuthService,
    private translate : TranslateService
  ) { }

  ngOnInit() {
    this.getUserFromNGRX();
    this.getCurrentLanguageFromNGRX();
  }

  ionViewWillEnter(): void {
    this.title.setTitle('Menu');
    this.analyticsService.tagViewInit(AnalyticsEventnameEnum.PAGE_VIEW);
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

  public back(): void {
    this.navCtrl.back()
  }

  public goToPage(option: any): void {
    if (option.route === 'sobre-nos') {
      this.navCtrl.navigateForward(['/' + option.route ])
    } else {
      this.navCtrl.navigateForward(['/logado/' + option.route])
    }
  }

  public async logoutAlert(): Promise<HTMLIonAlertElement> {
    const alert = await this.alertCtrl.create({
      mode: 'ios',
      cssClass: 'anf-alert negative-btn',
      subHeader: `${this.translate.instant('MENU_PAGE.LOG_OFF_TITLE')}`,
      message: `${this.translate.instant('MENU_PAGE.LOG_OFF_TEXT')}?`,
      buttons: [
        {
          text: `${this.translate.instant('SHARED.CANCEL')}`,
          role: 'cancel',
          handler: () => {

          }
        },
        {
          text: `${this.translate.instant('SHARED.EXIT_APP_YES')}`,
          role: 'confirm',
          handler: async () => {
            await this.authService.logout().then(() => {
              this.navCtrl.navigateBack(['/login']);
            })
          }
        }
      ]
    })

    await alert.present();

    return alert;
  }

  public ngOnDestroy(): void {
    this.currentLanguageSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }

}
