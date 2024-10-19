import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { IonContent, NavController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { Observable, Subscription, take } from 'rxjs';
import { ILang } from 'src/app/shared/models/Lang';
import { ISocialNetwork } from 'src/app/shared/models/Network';
import * as AppStore from './../../../shared/store/app.state';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { AnalyticsService } from 'src/app/core/services/firebase/analytics.service';


@Component({
  selector: 'rgs-sobre-nos',
  templateUrl: './sobre-nos.page.html',
  styleUrls: ['./sobre-nos.page.scss'],
})
export class SobreNosPage implements OnInit, OnDestroy {

  public currentLanguage: ILang;
  public currentLanguage$: Observable<ILang>;
  public currentLanguageSubscription: Subscription;

  @ViewChild('sobreContent') sobreContent: IonContent;

  public translatedPage: any;
  public translatedPage$: Observable<any>;

  constructor(
    private navCtrl : NavController,
    private store : Store,
    private title : Title,
    private translate : TranslateService,
    private analyticsService : AnalyticsService
  ) { }

  ngOnInit() {
    this.getCurrentLanguageFromNGRX();
  }

  ionViewDidEnter(): void {
    this.getTitleFromPage();
  }

  public getTitleFromPage(): void {
    this.translatedPage$ = this.translate.get('ABOUT_PAGE')

    this.translatedPage$
    .pipe(take(2))
    .subscribe((resp: any) => {
      this.translatedPage = resp;
      this.title.setTitle(this.translatedPage['PAGE_TITLE']);
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

  public async scrollToTop() {
    this.sobreContent.scrollToTop(600);
  }

  public ngOnDestroy(): void {
    this.currentLanguageSubscription.unsubscribe();
  }

}
