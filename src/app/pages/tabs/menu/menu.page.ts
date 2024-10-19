import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { Observable, Subscription, take } from 'rxjs';
import { ILang } from 'src/app/shared/models/Lang';
import * as AppStore from './../../../shared/store/app.state';
import { TranslateService } from '@ngx-translate/core';
import { Title } from '@angular/platform-browser';
import { AnalyticsService } from 'src/app/core/services/firebase/analytics.service';
import { AnalyticsEventnameEnum } from 'src/app/shared/enums/Analytics';


@Component({
  selector: 'rgs-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit, OnDestroy {

  public menuOptions: any[] = [
    {
      text: {
        pt: 'Contato',
        en: 'Contact',
        es: 'Contacto'
      },
      icon: 'call',
      route: 'contato'
    },
    {
      text: {
        pt: 'Sobre',
        en: 'About',
        es: 'Sobre'
      },
      icon: 'terminal',
      route: 'sobre-nos'
    }
  ]

  public currentLanguage: ILang;
  public currentLanguage$: Observable<ILang>;
  public currentLanguageSubscription: Subscription;

  public translatedPage: any;
  public translatedPage$: Observable<any>;

  constructor(
    private navCtrl : NavController,
    private store : Store,
    private translate : TranslateService,
    private title : Title,
    private analyticsService : AnalyticsService
  ) { }

  ngOnInit() {
    this.getCurrentLanguageFromNGRX();
    this.analyticsService.tagViewInit(AnalyticsEventnameEnum.PAGE_VIEW);
  }

  ionViewDidEnter(): void {
    this.getTitleFromPage();
  }

  public getTitleFromPage(): void {
    this.translatedPage$ = this.translate.get('COMPONENTS.TABS')

    this.translatedPage$
    .pipe(take(2))
    .subscribe((resp: any) => {
      this.translatedPage = resp;
      this.title.setTitle(this.translatedPage['MENU']);
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

  public goToPage(page: string): void {
    this.navCtrl.navigateForward([page])
  }

  public ngOnDestroy(): void {
    this.currentLanguageSubscription.unsubscribe();
  }

}
