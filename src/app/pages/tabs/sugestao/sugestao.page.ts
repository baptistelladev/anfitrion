import { SuggestionsService } from 'src/app/core/services/firebase/suggestions.service';
import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AlertController, IonContent, IonSelect, NavController, Platform, PopoverController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';
import { map, Observable, Subscription, take } from 'rxjs';
import { AnalyticsService } from 'src/app/core/services/firebase/analytics.service';
import { UtilsService } from 'src/app/core/services/utils.service';
import { AnalyticsEventnameEnum } from 'src/app/shared/enums/Analytics';
import { CollectionsEnum } from 'src/app/shared/enums/Collection';
import { ILang } from 'src/app/shared/models/ILang';
import { IParking } from 'src/app/shared/models/IParking';
import { IPlace } from 'src/app/shared/models/IPlace';
import Swiper from 'swiper';
import * as AppStore from './../../../shared/store/app.state';
import { PlacesService } from 'src/app/core/services/firebase/places.service';
import { ISuggestion } from 'src/app/shared/models/ISuggestion';
import { ActivatedRoute } from '@angular/router';
import { SuggestionsEnum } from 'src/app/shared/enums/Suggestions';
import { FilterEnum } from 'src/app/shared/enums/FilterEnum';
import { MOCK_FILTERS } from 'src/app/shared/mocks/MockFilters';
import { IFirebaseFilter } from 'src/app/shared/models/IFirebaseFilter';

@Component({
  selector: 'anfitrion-sugestao',
  templateUrl: './sugestao.page.html',
  styleUrls: ['./sugestao.page.scss'],
})
export class SugestaoPage implements OnInit, OnDestroy {

  public showBeachMap: boolean = false;

  public paramAsUrl: string;

  public establishmentActiveIndex: number | undefined = 1;
  public hideRightControl: boolean = false;
  public hideLeftControl: boolean = true;

  public selectedInfo: any;

  public lenghts_to_save_time: {
    list: IPlace[],
    establishment_type: string,
    text: any,
    length: number,
    plural: any
  }[] = [
    {
      list: [],
      establishment_type: 'ADEGA',
      length: 0,
      text: {
        pt: 'Adega',
        en: 'Wine Cellar',
        es: 'Bodega'
      },
      plural: {
        pt: 'Adegas',
        en: 'Wine Cellars',
        es: 'Bodegas'
      }
    },
    {
      list: [],
      establishment_type: 'DOCERIA',
      length: 0,
      text: {
        pt: 'Doceria',
        en: 'Confectionery',
        es: 'Dulcería'
      },
      plural: {
        pt: 'Docerias',
        en: 'Confectioneries',
        es: 'Dulcerías'
      }
    },
    {
      list: [],
      establishment_type: 'EMPORIO',
      length: 0,
      text: {
        pt: 'Empório',
        en: 'Emporium',
        es: 'Empore'
      },
      plural: {
        pt: 'Empórios',
        en: 'Emporiums',
        es: 'Emporios'
      }
    },
    {
      list: [],
      establishment_type: 'HAMBURGUERIA',
      length: 0,
      text: {
        pt: 'Hamburgueria',
        en: 'Burger Joint',
        es: 'Hamburguesería'
      },
      plural: {
        pt: 'Hamburguerias',
        en: 'Burger Joints',
        es: 'Hamburgueserías'
      }
    },
    {
      list: [],
      establishment_type: 'BAR',
      length: 0,
      text: {
        pt: 'Bar',
        en: 'Bar',
        es: 'Bar'
      },
      plural: {
        pt: 'Bares',
        en: 'Bars',
        es: 'Bares'
      }
    },
    {
      list: [],
      establishment_type: 'RESTAURANTE',
      length: 0,
      text: {
        pt: 'Restaurante',
        en: 'Restaurant',
        es: 'Restaurante'
      },
      plural: {
        pt: 'Restaurantes',
        en: 'Restaurants',
        es: 'Restaurantes'
      }
    },
    {
      list: [],
      establishment_type: 'PIZZARIA',
      length: 0,
      text: {
        pt: 'Pizzaria',
        en: 'Pizzeria',
        es: 'Pizzería'
      },
      plural: {
        pt: 'Pizzarias',
        en: 'Pizzerias',
        es: 'Pizzerías'
      }
    },
    {
      list: [],
      establishment_type: 'CAFETERIA',
      length: 0,
      text: {
        pt: 'Cafeteria',
        en: 'Cafeteria',
        es: 'Cafetería'
      },
      plural: {
        pt: 'Cafeterias',
        en: 'Cafeterias',
        es: 'Cafeterías'
      }
    }
  ]

  public today: string = moment().format('LL');

  @ViewChild('establishmentsSwiper')
  swiperRef: ElementRef | undefined;
  swiper?: Swiper;

  @ViewChild('filterSelector') filterSelector: IonSelect;
  @ViewChild('suggestionContent') suggestionContent: IonContent;

  public selectedFilter: string;
  public activeFilter: any;

  public filters: any[] = MOCK_FILTERS;

  public showSpecificList: boolean = false;

  public currentLanguage: ILang;
  public currentLanguage$: Observable<ILang>;
  public currentLanguageSubscription: Subscription;

  public currentSuggestion: ISuggestion;
  public currentSuggestion$: Observable<ISuggestion>;
  public currentSuggestionSubscription: Subscription;

  public short_establishments: any[] | null;
  public establishments$: Observable<IPlace[]>;
  public establishmentsSubscription: Subscription;

  public isLoadingLogo: boolean;

  public filterButtons: any[] = [
    {
      value: 'as-asc-desc',
      text: {
        pt: 'Visualizar modo ',
        en: '',
        es: ''
      },
      icon: 'options'
    }
  ]

  public alreadyGetPlacesFirstTime: boolean = false;

  constructor(
    private alertCtrl : AlertController,
    private title : Title,
    private navCtrl : NavController,
    private translate : TranslateService,
    private store : Store,
    private utilsService : UtilsService,
    private popoverCtrl : PopoverController,
    private analyticsService : AnalyticsService,
    private placesService : PlacesService,
    private route : ActivatedRoute,
    private suggestionsService : SuggestionsService
  ) { }

  ngOnInit() {
    this.getCurrentSuggestionFromNGRX();
    this.initialFilter(FilterEnum.ALL);
    this.defineActiveFilter(FilterEnum.ALL);
    this.getCurrentLanguageFromNGRX();
  }

  ionViewWillEnter(): void {
    this.analyticsService.tagViewInit(AnalyticsEventnameEnum.PAGE_VIEW);
  }

  public initialFilter(value: string) {
    this.selectedFilter = value;
  }

  public getPlaces(filters: IFirebaseFilter[] = []) {
    this.establishments$ = this.placesService
      .getPlacesCollection(
        CollectionsEnum.PLACES,
        filters
      );

      this.establishmentsSubscription = this.establishments$
      .pipe(map((establishments: IPlace[]) => {
        return establishments.sort((a, b) => Number(a.adress.number) - Number(b.adress.number))
      }))
      .subscribe((places: IPlace[]) => {
        this.short_establishments = places;

        if (!this.alreadyGetPlacesFirstTime) {
          this.swiper = this.swiperRef?.nativeElement.swiper;

          this.lenghts_to_save_time = [...this.lenghts_to_save_time].map((option: any) => {
            let list = this.short_establishments?.filter((establishment: IPlace) => {
              return establishment.mainType.value === option['establishment_type'];
            })

            option['list'] = list;
            option['length'] = list?.length;

            return option;
          })

          this.alreadyGetPlacesFirstTime = true;
        }
      })
  }

  public getSuggestionFromUrl() {
    this.route.paramMap
    .pipe(take(1))
    .subscribe({
      next: async (paramsAsMap: any) => {
        this.paramAsUrl = paramsAsMap.params['suggestion'];

        switch (paramsAsMap.params['suggestion']) {
          case 'rua-gastronomica-de-santos':
            this.title.setTitle('Rua Gastronômica de santos');

            this.suggestionsService
            .getSuggestionsFilteredByValue(CollectionsEnum.SUGGESTIONS_BAIXADA_SANTISTA, SuggestionsEnum.RUA_GASTRONOMICA_DE_SANTOS)
            .then((suggestion: ISuggestion | null) => {
              if (suggestion) {
                this.currentSuggestion = suggestion;
              }
            })
            break;

          default:
            this.navCtrl.navigateBack(['/logado/sugestoes-do-anfitriao'])
            break;
        }
      }
    })
  }

  public getCurrentLanguageFromNGRX(): void {
    this.currentLanguage$ = this.store.select(AppStore.selectAppCurrentLanguage);

    this.currentLanguageSubscription = this.currentLanguage$
    .subscribe((language: ILang) => {
      this.currentLanguage = language;
    })
  }

  public openFilterSelect(): void {
    this.filterSelector.open();
  }

  public async scrollToTop() {
    this.suggestionContent.scrollToTop(600);
  }

  public seeEstablishment(establishment: IPlace, e: any): void {
    if (establishment.isBuilding) {
      e.preventDefault();
    } else {
      this.navCtrl.navigateForward(['/logado/estabelecimento-na-cidade/' + establishment.value]);
      this.store.dispatch(AppStore.setCurrentEstablishment({ establishment: establishment } ))
    }
  }

  public seeEstablishmentFromModal(establishment: IPlace, e: any): void {
    if (establishment.isBuilding) {
      e.preventDefault();
    } else {
      this.showSpecificList = false;

      setTimeout(() => {
        this.navCtrl.navigateForward(['/estabelecimento-na-cidade/' + establishment.value]);
        this.store.dispatch(AppStore.setCurrentEstablishment({ establishment: establishment } ))
      }, 100);
    }
  }

  public slideSwiperToStart(): void {
    this.swiper?.slideTo(0, 800);
  }

  public slideSwiperTo(index: number): void {
    this.swiper?.slideTo(index, 800);
  }

  public slideToNext(): void {
    this.swiper?.slideNext(800);
  }

  public listenForSwiperForControl(ev: any): void {
    this.hideLeftControl = ev.detail[0].isBeginning;
    this.hideRightControl = ev.detail[0].isEnd;
  }

  public slideToPrev(): void {
    this.swiper?.slidePrev(800);
  }

  public imageHasLoaded() {
    this.isLoadingLogo = false;
  }

  public filterByCharacteristic(e: any): void {
    this.defineActiveFilter(e.detail.value);
  }

  public defineActiveFilter(value: string) {
    this.short_establishments = null;

    let filterFound = this.filters.find((filter: any) => {
      return filter.value === value;
    })

    if (filterFound) {
      this.activeFilter = filterFound;
    }

    switch (filterFound?.value) {
      case FilterEnum.ALL:
        this.getPlaces([
          { field: 'suggestions', operator: 'array-contains', value: SuggestionsEnum.RUA_GASTRONOMICA_DE_SANTOS }
        ]);
        break;

      case FilterEnum.PET_FRIENDLY:
        this.getPlaces([
          { field: 'suggestions', operator: 'array-contains', value: SuggestionsEnum.RUA_GASTRONOMICA_DE_SANTOS },
          { field: 'petfriendly_info.accept_petfriendly', operator: '==', value: true }
        ]);
        break;

      case FilterEnum.LIVEMUSIC:
        this.getPlaces([
          { field: 'suggestions', operator: 'array-contains', value: SuggestionsEnum.RUA_GASTRONOMICA_DE_SANTOS },
          { field: 'livemusic_info.has_livemusic', operator: '==', value: true }
        ]);
        break;

      case FilterEnum.TICKET:
        this.getPlaces([
          { field: 'suggestions', operator: 'array-contains', value: SuggestionsEnum.RUA_GASTRONOMICA_DE_SANTOS },
          { field: 'ticket_info.accept_ticket', operator: '==', value: true }
        ]);
        break;

      case FilterEnum.CHILDREN_SPACE:
        this.getPlaces([
          { field: 'suggestions', operator: 'array-contains', value: SuggestionsEnum.RUA_GASTRONOMICA_DE_SANTOS },
          { field: 'children_space.has_space', operator: '==', value: true }
        ]);
        break;
    }


  }

  public seeSpecficList(show: boolean, info: any): void {
    this.showSpecificList = show;
    this.selectedInfo = info;
  }

  public modalHasDismissed(e: any) {
    this.showSpecificList = false;
    this.selectedInfo = null;
  }

  public closeModal(): void {
    this.showSpecificList = false;
  }

  public callParking(parking: any, e: any) {
    if (parking.phone.ddd && parking.phone.number) {
      window.location.href = `tel:55${parking.phone.ddd}${parking.phone.number}`;
    } else {
      e.preventDefault();
    }
  }

  public back(): void {
    this.navCtrl.navigateBack(['/logado/sugestoes-do-anfitriao'])
  }

  public getCurrentSuggestionFromNGRX(): void {
    this.currentSuggestion$ = this.store.select(AppStore.selectCurrentSuggestion);

    this.currentSuggestionSubscription = this.currentSuggestion$
    .subscribe((suggestion: ISuggestion) => {
      if (suggestion.id) {
        this.currentSuggestion = suggestion;
        this.paramAsUrl = this.currentSuggestion.route;
      } else {
        this.getSuggestionFromUrl();
      }
    })
  }

  public async toggleModalMap(show: boolean) {
    this.showBeachMap = show;
  }

  public ngOnDestroy(): void {
    this.currentLanguageSubscription.unsubscribe();
    this.establishmentsSubscription.unsubscribe();
    this.currentSuggestionSubscription.unsubscribe();
  }

}
