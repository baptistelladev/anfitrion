import { BenefitOperatorsEnum } from './../../../../shared/enums/BenefitOperators';
import { IFestivalFoodType } from './../../../../shared/models/IFestivalFoodType';
import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable, Subscription, take } from 'rxjs';
import { ILang } from 'src/app/shared/models/ILang';
import { ISuggestion } from 'src/app/shared/models/ISuggestion';
import * as AppStore from './../../../../shared/store/app.state';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { SuggestionsService } from 'src/app/core/services/firebase/suggestions.service';
import { CollectionsEnum } from 'src/app/shared/enums/Collection';
import { SuggestionsEnum } from 'src/app/shared/enums/Suggestions';
import { IonContent, IonSelect, NavController, Platform } from '@ionic/angular';
import Swiper from 'swiper';
import { MOCK_FILTERS } from 'src/app/shared/mocks/MockFilters';
import { FilterEnum } from 'src/app/shared/enums/FilterEnum';
import { IPlace } from 'src/app/shared/models/IPlace';
import { PlacesService } from 'src/app/core/services/firebase/places.service';
import { IFilter } from 'src/app/shared/models/IFilter';
import { ICity } from 'src/app/shared/models/ICity';
import { IFestivalFood } from 'src/app/shared/models/IFestivalFood';
import { FestivalFoodTypeEnum } from 'src/app/shared/enums/FestivalFoodType';
import { BenefitConsumerEnum } from 'src/app/shared/enums/BenefitConsumer';
import * as moment from 'moment';
import { OverlayService } from 'src/app/shared/services/overlay.service';
import { TranslateService } from '@ngx-translate/core';
import { IPhone } from 'src/app/shared/models/IPhone';
import { PhoneTypesEnum } from 'src/app/shared/enums/PhoneTypes';
import { IFirebaseFilter } from 'src/app/shared/models/IFirebaseFilter';

@Component({
  selector: 'anfitrion-festival-comida-japonesa',
  templateUrl: './festival-comida-japonesa.page.html',
  styleUrls: ['./festival-comida-japonesa.page.scss'],
})
export class FestivalComidaJaponesaPage implements OnInit, OnDestroy, AfterViewInit {

  public PhoneTypesEnum = PhoneTypesEnum;

  public hideRightControl: boolean = false;
  public hideLeftControl: boolean = true;

  @ViewChild('japaneseSwiper')
  swiperRef: ElementRef | undefined;
  swiper?: Swiper;
  @ViewChild('filterSelector') filterSelector: IonSelect;
  @ViewChild('japaneseFoodContent') japaneseFoodContent: IonContent;

  public paramAsUrl: string; // NÃO SERÁ USADO MAS FICARÁ COMO REFERÊNCIA
  public lastPathFromUrl: string // O PARAM SERÁ SUBSTITUIDO POR ISSO, POIS ESSA TELA TEM ROTA DEDICADA.

  public currentLanguage: ILang;
  public currentLanguage$: Observable<ILang>;
  public currentLanguageSubscription: Subscription;

  public currentSuggestion: ISuggestion;
  public currentSuggestion$: Observable<ISuggestion>;
  public currentSuggestionSubscription: Subscription;

  public currentCity: ICity;
  public currentCity$: Observable<ICity>;
  public currentCitySubscription: Subscription;

  public places: any[] | null;
  public places$: Observable<IPlace[]>;
  public placesSubscription: Subscription;

  public selectedFilter: string;

  public filterButtons: any[] = [
    {
      icon: 'options'
    }
  ]

  public activeFilter: any;
  public MOCK_FILTERS: IFilter[];

  public BenefitConsumerEnum = BenefitConsumerEnum;
  public BenefitOperatorsEnum = BenefitOperatorsEnum;

  constructor(
    private store : Store,
    private route : ActivatedRoute,
    private title : Title,
    private suggestionsService : SuggestionsService,
    private navCtrl : NavController,
    private router : Router,
    private placesService : PlacesService,
    private overlayService : OverlayService,
    private translate : TranslateService,
    private platform : Platform
  ) { }

  async ngOnInit() {
    this.getCurrentCityFromNGRX();
    this.getCurrentSuggestionFromNGRX();
    this.getCurrentLanguageFromNGRX();
  }

  public ngAfterViewInit(): void {
    this.swiper = this.swiperRef?.nativeElement.swiper;
  }

  public getCurrentCityFromNGRX(): void {
    this.currentCity$ = this.store.select(AppStore.selectAppCurrentCity);

    this.currentCitySubscription = this.currentCity$
    .subscribe((city: ICity) => {
      this.currentCity = city;
        console.log(this.currentCity);

    })
  }

  public getCurrentLanguageFromNGRX(): void {
    this.currentLanguage$ = this.store.select(AppStore.selectAppCurrentLanguage);

    this.currentLanguageSubscription = this.currentLanguage$
    .subscribe((language: ILang) => {
      this.currentLanguage = language;
    })
  }

  public async initialFilter(value: string) {
    this.selectedFilter = value;
  }

  public slideSwiperTo(index: number): void {
    this.swiper?.slideTo(index, 800);
  }

  public async getCurrentSuggestionFromNGRX() {
    this.currentSuggestion$ = this.store.select(AppStore.selectCurrentSuggestion);

    this.currentSuggestionSubscription = this.currentSuggestion$
    .subscribe(async (suggestion: ISuggestion) => {
      if (suggestion.id) {
        this.currentSuggestion = suggestion;

        await this.setFilters();
        await this.initialFilter(FilterEnum.ALL);
        await this.defineActiveFilter(FilterEnum.ALL);
      } else {
        this.getSuggestionFromUrl();
      }
    })
  }

  /**
   * @description Tomar cuidado com esta função pois ela é usada em outras telas de sugestões.
   * Neste tela em específico nós não mandamos parâmetro da tela anterior, o Festival de Comida Japonesa possui rota dedicada no projeto.
   * Então "desmembramo" a url e pegamos o último "pedaço".
   */
  public getSuggestionFromUrl() {
    let urlSplited: string[] = this.router.url.split('/');
    this.lastPathFromUrl = urlSplited[urlSplited.length - 1];

    if (this.lastPathFromUrl) {
      this.title.setTitle('Festival de Comida Japonesa');

      this.suggestionsService
      .getSuggestionsCollection(CollectionsEnum.SUGGESTIONS_BAIXADA_SANTISTA, [
        { field: 'value', operator: '==', value: SuggestionsEnum.FESTIVAL_COMIDA_JAPONESA }
      ])
      .pipe((take(1)))
      .subscribe({
        next: async (suggestion: any[]) => {
          if (suggestion) {
            this.currentSuggestion = suggestion[0];

            await this.setFilters();
            await this.initialFilter(FilterEnum.ALL);
            await this.defineActiveFilter(FilterEnum.ALL);
          }
        }
      })
    } else {
      this.navCtrl.navigateBack(['/logado/sugestoes-do-anfitriao'])
    }
  }

  public back(): void {
    this.navCtrl.navigateBack(['/logado/sugestoes-do-anfitriao'])
  }

  public openFilterSelect(): void {
    this.filterSelector.open();
  }

  public filterByCharacteristic(e: any): void {
    this.defineActiveFilter(e.detail.value);
  }

  public async defineActiveFilter(value: string) {
    this.places = null;

    let filterFound = this.MOCK_FILTERS.find((filter: any) => {
      return filter.value === value;
    })

    if (filterFound) {
      this.activeFilter = filterFound;
    }

    switch (filterFound?.value) {
      case FilterEnum.ALL:
      this.getPlaces([
        { field: 'suggestions', operator: 'array-contains', value: this.currentSuggestion?.value },
        { field: 'origin.value', operator: '==', value: this.currentCity?.value }
      ]);
      break;
    }
  }

  public seePlace(place: IPlace, e: any): void {
    if (place.isBuilding) {
      e.preventDefault();
    } else {
      this.navCtrl.navigateForward(['/logado/estabelecimento-na-cidade/' + place.value]);
      this.store.dispatch(AppStore.setCurrentEstablishment({ establishment: place } ))
    }
  }

  public async setFilters(): Promise<IFilter[]> {
    this.MOCK_FILTERS = MOCK_FILTERS.filter((filter: IFilter) => {
      return !filter.dontShowIn.includes(this.currentSuggestion?.value)
    })

    return this.MOCK_FILTERS
  }

  public getPlaces(filters: IFirebaseFilter[] = []) {
    this.places$ = this.placesService
      .getPlacesCollection(
        CollectionsEnum.PLACES,
        filters
      );

      this.placesSubscription = this.places$
      .pipe(
        map((places: IPlace[]) => {
          return places.filter((place: IPlace) => {
            // Verifica se a propriedade e o array de festivais existem
            if (place.festival_info?.festivals) {

              return place.festival_info.festivals.some((festival: IFestivalFood) => {
                return festival.food_type?.value === FestivalFoodTypeEnum.COMIDA_JAPONESA;
              });
            }
            return false; // Se não houver festivais, exclui o place
          });
        })
      )
      .subscribe((places: IPlace[]) => {
        this.places = places;
        console.log(this.places);

      })
  }

  public listenForSwiperForControl(ev: any): void {
    this.hideLeftControl = ev.detail[0].isBeginning;
    this.hideRightControl = ev.detail[0].isEnd;
  }

  public async scrollToTop() {
    this.japaneseFoodContent.scrollToTop(600);
  }

  public async redirectToWhatsapp(place: IPlace): Promise<HTMLIonAlertElement> {
    const alert = await this.overlayService.fireAlert({
      mode: 'ios',
      cssClass: 'anfitrion-alert',
      subHeader: 'WhatsApp',
      message: `${this.translate.instant('SHARED.I_WILL_REDIRECT_YOU')} <b>${place.name}${this.currentLanguage.value === 'en' ? "'s WhatsApp," : ","}</b> ${this.translate.instant('SHARED.OK_QUESTION')}`,
      buttons: [
        {
          role: 'cancel',
          text: `${this.translate.instant('SHARED.CANCEL')}`,
          handler: () => {

          }
        },
        {
          role: 'confirm',
          text: `${this.translate.instant('SHARED.GO_TO_WHATS')}`,
          handler: () => {
            this.goToWhatsApp(place);
          }
        }
      ]
    })

    await alert.present();

    return alert;
  }

  public goToWhatsApp(place: IPlace): void {
    let whats: undefined | IPhone = place.phones.find(phone => phone.type === PhoneTypesEnum.WHATSAPP);
    let mensagem: string = this.translate.instant('MESSAGES.WELCOME_WHATSAPP');
    let mensagemCodificada = encodeURIComponent(mensagem);

    if (this.platform.is('desktop')) {
      this.openExternalUrl(`https://wa.me/55${whats?.ddd}${whats?.number}?text=${mensagemCodificada}`, '_blank');
    }

    if (this.platform.is('mobileweb') || this.platform.is('mobile')) {
      this.openExternalUrl(`https://wa.me/55${whats?.ddd}${whats?.number}?text=${mensagemCodificada}`, '_self');
    }
  }

  public openExternalUrl(url: string, target: string = '_system'): void {
    if (typeof window !== 'undefined') {
      window.open(url, target);
    }
  }

  public ngOnDestroy(): void {
    this.currentLanguageSubscription.unsubscribe();
    this.currentSuggestionSubscription.unsubscribe();
    //this.placesSubscription.unsubscribe();
  }

}
