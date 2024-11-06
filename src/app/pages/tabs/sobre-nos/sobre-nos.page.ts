import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { IonContent, NavController, Platform } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { ILang } from 'src/app/shared/models/ILang';
import * as AppStore from './../../../shared/store/app.state';
import { Title } from '@angular/platform-browser';
import { AnalyticsService } from 'src/app/core/services/firebase/analytics.service';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'anfitrion-sobre-nos',
  templateUrl: './sobre-nos.page.html',
  styleUrls: ['./sobre-nos.page.scss'],
})
export class SobreNosPage implements OnInit, OnDestroy {

  public currentLanguage: ILang;
  public currentLanguage$: Observable<ILang>;
  public currentLanguageSubscription: Subscription;

  @ViewChild('sobreContent') sobreContent: IonContent;

  public backButtonSubscription: Subscription;

  constructor(
    private navCtrl : NavController,
    private store : Store,
    private title : Title,
    private analyticsService : AnalyticsService,
    private translateService : TranslateService,
    private platform : Platform
  ) { }

  ngOnInit() {
    this.getCurrentLanguageFromNGRX();
  }

  ionViewWillEnter(): void {
    this.title.setTitle('Sobre nós');
    this.listeningBackButton();
  }

  public listeningBackButton(): void {
    this.backButtonSubscription = this.platform.backButton.subscribeWithPriority(0, async () => {
      this.back();
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

  public ionViewWillLeave(): void {
    this.backButtonSubscription.unsubscribe();
  }

  public ngOnDestroy(): void {
    this.currentLanguageSubscription.unsubscribe();
  }

}
