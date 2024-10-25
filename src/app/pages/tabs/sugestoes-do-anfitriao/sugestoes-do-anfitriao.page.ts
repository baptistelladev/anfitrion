import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { IonContent, NavController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { ILang } from 'src/app/shared/models/Lang';
import * as AppStore from './../../../shared/store/app.state';
import Swiper from 'swiper';

@Component({
  selector: 'rgs-sugestoes-do-anfitriao',
  templateUrl: './sugestoes-do-anfitriao.page.html',
  styleUrls: ['./sugestoes-do-anfitriao.page.scss'],
})
export class SugestoesDoAnfitriaoPage implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('sugestoesCitySwiper')
  citySwiperRef: ElementRef | undefined;
  citySwiper?: Swiper;

  @ViewChild('baixadaSantistaSwiper')
  baixadaSantistaSwiperRef: ElementRef | undefined;
  baixadaSantistaSwiper?: Swiper;

  @ViewChild('sugestoesContent') sugestoesContent: IonContent;

  public currentLanguage: ILang;
  public currentLanguage$: Observable<ILang>;
  public currentLanguageSubscription: Subscription;

  public suggestionsCity: any;
  public suggestionsCity$: Observable<any>
  public suggestionsCitySubscription: Subscription;

  public suggestionsBaixadaSantista: any;
  public suggestionsBaixadaSantista$: Observable<any>
  public suggestionsBaixadaSantistaSubscription: Subscription;

  constructor(
    private store : Store,
    private navCtrl : NavController
  ) { }

  ngOnInit() {
    this.getCurrentLanguageFromNGRX();
  }

  ngAfterViewInit(): void {
    this.citySwiper = this.citySwiperRef?.nativeElement.swiper;
    this.baixadaSantistaSwiper = this.baixadaSantistaSwiperRef?.nativeElement.swiper;
  }

  public getCurrentLanguageFromNGRX(): void {
    this.currentLanguage$ = this.store.select(AppStore.selectAppCurrentLanguage);

    this.currentLanguageSubscription = this.currentLanguage$
    .subscribe((language: ILang) => {
      this.currentLanguage = language;
    })
  }

  public backToHome(): void {
    this.navCtrl.navigateBack(['/logado/explorar'])
  }

  ngOnDestroy() {
    this.currentLanguageSubscription.unsubscribe();
  }

}
