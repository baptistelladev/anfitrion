import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { IonContent, LoadingController, NavController, Platform } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { ILang } from 'src/app/shared/models/ILang';
import * as AppStore from './../../../shared/store/app.state';
import Swiper from 'swiper';
import { Title } from '@angular/platform-browser';
import { SuggestionsService } from 'src/app/core/services/firebase/suggestions.service';
import { CollectionsEnum } from 'src/app/shared/enums/Collection';
import { SuggestionsEnum } from 'src/app/shared/enums/Suggestions';
import { ISuggestion } from 'src/app/shared/models/ISuggestion';
import { OverlayService } from 'src/app/shared/services/overlay.service';

@Component({
  selector: 'anfitrion-sugestoes-do-anfitriao',
  templateUrl: './sugestoes-do-anfitriao.page.html',
  styleUrls: ['./sugestoes-do-anfitriao.page.scss'],
})
export class SugestoesDoAnfitriaoPage implements OnInit, AfterViewInit, OnDestroy {

  public hideRightControl: boolean = false;
  public hideLeftControl: boolean = false;

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

  public suggestionsBaixadaSantista: any;
  public suggestionsBaixadaSantista$: Observable<any>
  public suggestionsBaixadaSantistaSubscription: Subscription;

  constructor(
    private store : Store,
    private navCtrl : NavController,
    private title : Title,
    private suggestionsService : SuggestionsService,
    private overlayService : OverlayService
  ) { }

  ngOnInit() {
    this.getCurrentLanguageFromNGRX();
    this.getBaixadaSantistaSuggestions();
  }

  ngAfterViewInit(): void {
    this.baixadaSantistaSwiper = this.baixadaSantistaSwiperRef?.nativeElement.swiper;
  }

  ionViewWillEnter(): void {
    this.title.setTitle('Sugestões do anfitrião');
  }

  public seeSuggestion(suggestion: ISuggestion) {
    this.store.dispatch(AppStore.setCurrentSuggestion({ suggestion: suggestion }))
    this.navCtrl.navigateForward([`/logado/sugestoes-do-anfitriao/${suggestion.route}`]);
  }

  public async getBaixadaSantistaSuggestions() {
    const loading = await this.overlayService.fireLoading();

    await loading.present();

    this.suggestionsBaixadaSantista$ = this.suggestionsService
    .getSuggestions(CollectionsEnum.SUGGESTIONS_BAIXADA_SANTISTA, [
      { field: "filter", operator: "array-contains", value: SuggestionsEnum.BAIXADA_SANTISTA },
    ])

    this.suggestionsBaixadaSantistaSubscription = this.suggestionsBaixadaSantista$
    .subscribe({
      next: (suggestions: any) => {
        this.suggestionsBaixadaSantista = suggestions;
      },
      error: () => {

      },
      complete: async () => {
        await loading.dismiss()
      }
    })
  }

  public slideToNext(): void {
    this.baixadaSantistaSwiper?.slideNext(800);

    if (this.hideLeftControl) {
      this.hideLeftControl = false;
    }

  }

  public slideToPrev(): void {
    this.baixadaSantistaSwiper?.slidePrev(800);

    if (this.hideRightControl) {
      this.hideRightControl = false;
    }
  }

  public getCurrentLanguageFromNGRX(): void {
    this.currentLanguage$ = this.store.select(AppStore.selectAppCurrentLanguage);

    this.currentLanguageSubscription = this.currentLanguage$
    .subscribe((language: ILang) => {
      this.currentLanguage = language;
    })
  }

  public back(): void {
    this.navCtrl.navigateBack(['/logado/explorar']);
  }

  public async scrollToTop() {
    this.sugestoesContent.scrollToTop(600);
  }

  public navToContactPage(): void {
    this.navCtrl.navigateForward(['/logado/contato']);
  }

  ngOnDestroy() {
    this.currentLanguageSubscription.unsubscribe();
    this.suggestionsBaixadaSantistaSubscription.unsubscribe();
  }

}
