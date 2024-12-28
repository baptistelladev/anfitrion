import { Component, ElementRef, OnChanges, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { IonContent, NavController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { AnalyticsService } from 'src/app/core/services/firebase/analytics.service';
import { SuggestionsService } from 'src/app/core/services/firebase/suggestions.service';
import { AnalyticsEventnameEnum } from 'src/app/shared/enums/Analytics';
import { CollectionsEnum } from 'src/app/shared/enums/Collection';
import { FeaturesEnum } from 'src/app/shared/enums/Features';
import { ProfileTypeEnum } from 'src/app/shared/enums/ProfileType';
import { SuggestionsEnum } from 'src/app/shared/enums/Suggestions';
import { ICity } from 'src/app/shared/models/ICity';
import { ILang } from 'src/app/shared/models/ILang';
import { ISuggestion } from 'src/app/shared/models/ISuggestion';
import { OverlayService } from 'src/app/shared/services/overlay.service';
import Swiper from 'swiper';
import * as AppStore from './../../../shared/store/app.state';
import { AnimationOptions } from 'ngx-lottie';
import { AnimationItem } from 'lottie-web';
import { TranslateService } from '@ngx-translate/core';
import { IUSer } from 'src/app/shared/models/IUser';
import * as UserStore from './../../../shared/store/user.state';

@Component({
  selector: 'anfitrion-sugestoes-do-anfitriao',
  templateUrl: './sugestoes-do-anfitriao.page.html',
  styleUrls: ['./sugestoes-do-anfitriao.page.scss'],
})
export class SugestoesDoAnfitriaoPage implements OnInit, OnDestroy {

  @ViewChild('animationTourist') animationTourist: AnimationItem;
  @ViewChild('animationResident') animationResident: AnimationItem;

  public touristOptions: AnimationOptions = {
    path: './../../../assets/movie/anfitrion-tourists.json',
    autoplay: true,
    loop: true
  };

  public residentOptions: AnimationOptions = {
    path: './../../../assets/movie/anfitrion-residents.json',
    autoplay: true,
    loop: true
  };

  public hideRightControl: boolean = false;
  public hideLeftControl: boolean = true;

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

  public suggestionsBaixadaSantista: ISuggestion[];
  public suggestionsBaixadaSantista$: Observable<ISuggestion[]>
  public suggestionsBaixadaSantistaSubscription: Subscription;

  public suggestionsSelectedCity: ISuggestion[];
  public suggestionsSelectedCity$: Observable<ISuggestion[]>
  public suggestionsSelectedCitySubscription: Subscription;

  public suggestionSelectedForUserProfileType: ISuggestion[];
  public suggestionSelectedForUserProfileType$: Observable<ISuggestion[]>
  public suggestionSelectedForUserProfileTypeSubscription: Subscription;

  public currentCity: ICity;
  public currentCity$: Observable<ICity>;
  public currentCitySubscription: Subscription;

  public user: IUSer;
  public user$: Observable<IUSer>;
  public userSubscription: Subscription;

  public FeaturesEnum = FeaturesEnum;
  public ProfileType = ProfileTypeEnum;

  constructor(
    private store : Store,
    private navCtrl : NavController,
    private title : Title,
    private suggestionsService : SuggestionsService,
    private overlayService : OverlayService,
    private analyticsService : AnalyticsService,
    private translate : TranslateService
  ) { }

  ngOnInit() {
    this.getCurrentLanguageFromNGRX();
    this.getBaixadaSantistaSuggestions();
    this.getCurrentCityFromNGRX();
    this.getUserFromNGRX();
  }

  ionViewWillEnter(): void {
    this.title.setTitle('Sugestões do anfitrião');
    this.analyticsService.tagViewInit(AnalyticsEventnameEnum.PAGE_VIEW);
  }

  public getUserFromNGRX(): void {
    this.user$ = this.store.select(UserStore.selectUser);

    this.userSubscription = this.user$
    .subscribe((user: IUSer) => {
      this.user = user;
    })
  }

  public touristAnimationCreated(animationItem: AnimationItem): void {
    animationItem.setSpeed(0.8)
  }

  public residentsAnimationCreated(animationItem: AnimationItem): void {
    animationItem.setSpeed(0.8)
  }

  public seeSuggestion(suggestion: ISuggestion) {
    this.store.dispatch(AppStore.setCurrentSuggestion({ suggestion: suggestion }))
    this.navCtrl.navigateForward([`/logado/sugestoes-do-anfitriao/${suggestion.route}`]);
  }

  public seeSelectedCitySuggestion(suggestion: ISuggestion) {
    this.store.dispatch(AppStore.setCurrentSuggestion({ suggestion: suggestion }))
    this.navCtrl.navigateForward([`/logado/sugestoes-do-anfitriao/${suggestion.route}`]);
  }

  public async getBaixadaSantistaSuggestions() {
    const loading = await this.overlayService.fireLoading();

    await loading.present();

    this.suggestionsBaixadaSantista$ = this.suggestionsService
    .getSuggestionsCollection(CollectionsEnum.SUGGESTIONS_BAIXADA_SANTISTA, [
      { field: "filter", operator: "array-contains", value: SuggestionsEnum.BAIXADA_SANTISTA },
    ])

    this.suggestionsBaixadaSantistaSubscription = this.suggestionsBaixadaSantista$
    .subscribe({
      next: async (suggestions: any) => {
        this.suggestionsBaixadaSantista = suggestions;
        this.baixadaSantistaSwiper = this.baixadaSantistaSwiperRef?.nativeElement.swiper;

        if (this.suggestionsBaixadaSantista) {
          await loading.dismiss();
        }
      },
      error: () => {

      },
      complete: async () => {
        await loading.dismiss()
      }
    })
  }

  public async getSelectedCitySuggestions(cityValue: string) {
    this.suggestionsSelectedCity$ = this.suggestionsService
    .getSuggestionsCollection(CollectionsEnum.SUGGESTIONS_BAIXADA_SANTISTA, [
      { field: "filter", operator: "array-contains", value: cityValue },
    ])

    this.suggestionsSelectedCitySubscription = this.suggestionsSelectedCity$
    .subscribe({
      next: (suggestions: any) => {
        this.suggestionsSelectedCity = suggestions;
      },
      error: () => {

      },
      complete: async () => {

      }
    })
  }

  public getCurrentCityFromNGRX(): void {
    this.currentCity$ = this.store.select(AppStore.selectAppCurrentCity);

    this.currentCitySubscription = this.currentCity$
    .subscribe((city: ICity) => {
      this.currentCity = city;
      this.getSelectedCitySuggestions(this.currentCity.value);
    })
  }

  public async getUserProfileTypeSuggestions() {
    this.suggestionSelectedForUserProfileType$ = this.suggestionsService
    .getSuggestionsCollection(CollectionsEnum.SUGGESTIONS_BAIXADA_SANTISTA, [
      { field: "filter", operator: "array-contains", value: SuggestionsEnum.BAIXADA_SANTISTA },
    ])

    this.suggestionSelectedForUserProfileTypeSubscription = this.suggestionSelectedForUserProfileType$
    .subscribe({
      next: async (suggestions: any) => {
        this.suggestionSelectedForUserProfileType = suggestions;
      },
      error: () => {

      },
      complete: async () => {

      }
    })
  }

  public listenForSwiperForControl(ev: any): void {
    this.hideLeftControl = ev.detail[0].isBeginning;
    this.hideRightControl = ev.detail[0].isEnd;
  }

  public slideToNext(): void {
    this.baixadaSantistaSwiper?.slideNext(800);
  }

  public slideToPrev(): void {
    this.baixadaSantistaSwiper?.slidePrev(800);
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

  public navTo(): void {
    this.navCtrl.navigateBack(['/logado/explorar']);
  }

  ngOnDestroy() {
    this.currentLanguageSubscription.unsubscribe();
    this.suggestionsBaixadaSantistaSubscription.unsubscribe();
  }

}
