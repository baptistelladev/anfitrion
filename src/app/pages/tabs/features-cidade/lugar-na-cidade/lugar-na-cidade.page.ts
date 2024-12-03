import { MOCK_CITIES } from 'src/app/shared/mocks/MockCities';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { IonContent, IonSelect, NavController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { map, Observable, Subscription, take } from 'rxjs';
import { ILang } from 'src/app/shared/models/ILang';
import * as AppStore from './../../../../shared/store/app.state';
import { Store } from '@ngrx/store';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { CityEnum } from 'src/app/shared/enums/City';
import { PlaceTypeCityEnum } from 'src/app/shared/enums/PlaceType';
import { IPlace } from 'src/app/shared/models/IPlace';
import { CollectionsEnum } from 'src/app/shared/enums/Collection';
import { PlacesService } from 'src/app/core/services/firebase/places.service';
import Swiper from 'swiper';
import { ICity } from 'src/app/shared/models/ICity';
import { MOCK_FILTERS } from 'src/app/shared/mocks/MockFilters';
import { IFIrebaseFilter } from 'src/app/shared/models/IFirebaseFilter';
import { IFilter } from 'src/app/shared/models/IFilter';
import { FilterEnum } from 'src/app/shared/enums/FilterEnum';
import { AnalyticsService } from 'src/app/core/services/firebase/analytics.service';
import { AnalyticsEventnameEnum } from 'src/app/shared/enums/Analytics';
import { SuggestionsEnum } from 'src/app/shared/enums/Suggestions';
import { LocationEnum } from 'src/app/shared/enums/Location';
import { IUSer } from 'src/app/shared/models/IUser';
import * as UserStore from './../../../../shared/store/user.state';

@Component({
  selector: 'anfitrion-lugar-na-cidade',
  templateUrl: './lugar-na-cidade.page.html',
  styleUrls: ['./lugar-na-cidade.page.scss'],
})
export class LugarNaCidadePage implements OnInit, OnDestroy, AfterViewInit {

  public selectedFilter: string;
  public activeFilter: any;

  @ViewChild('filterSelector') filterSelector: IonSelect;

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

  @ViewChild('placesContent') placesContent: IonContent;

  @ViewChild('placesSwiper')
  swiperRef: ElementRef | undefined;
  swiper?: Swiper;

  public user: IUSer;
  public user$: Observable<IUSer>;
  public userSubscription: Subscription;

  public canAccessEightenContent: boolean;
  public canAccessEightenContent$: Observable<boolean>;
  public canAccessEightenContentSubscription: Subscription;

  public hideRightControl: boolean = false;
  public hideLeftControl: boolean = true;

  public CityEnum = CityEnum;
  public PlaceTypeCityEnum = PlaceTypeCityEnum;
  public LocationEnum = LocationEnum;

  public currentLanguage: ILang;
  public currentLanguage$: Observable<ILang>;
  public currentLanguageSubscription: Subscription;

  public placeType: string;
  public currentCityAsParam: ICity | undefined;
  public currentLocationAsParam: string | undefined;

  public places: IPlace[] | null;
  public places$: Observable<IPlace[]>;
  public placesSubscription: Subscription;

  public isLoadingLogo: boolean;

  public MOCK_CITIES: ICity[] = MOCK_CITIES;
  public MOCK_FILTERS: IFilter[];

  constructor(
    private navCtrl : NavController,
    private translate : TranslateService,
    private store : Store,
    private title : Title,
    private route : ActivatedRoute,
    private placesService : PlacesService,
    private analyticsService : AnalyticsService
  ) { }

  ngOnInit() {
    this.getUserFromNGRX();
    this.getCurrentLanguageFromNGRX();
    this.getRouter();
    this.setFilters();
    this.initialFilter(FilterEnum.ALL);
    this.defineActiveFilter(FilterEnum.ALL);
  }

  ionViewWillEnter(): void {
    this.title.setTitle('Lugares');
    this.analyticsService.tagViewInit(AnalyticsEventnameEnum.PAGE_VIEW);
  }

  ngAfterViewInit(): void {
    this.swiper = this.swiperRef?.nativeElement.swiper;
  }

  public getUserFromNGRX(): void {
    this.user$ = this.store.select(UserStore.selectUser);

    this.userSubscription = this.user$
    .subscribe((user: IUSer) => {
      this.user = user;

      this.getEighteenContentAccess();
    })
  }

  public getEighteenContentAccess(): void {
    this.canAccessEightenContent$ = this.store.select(UserStore.selectAccessEighteenContent);

    this.canAccessEightenContentSubscription = this.canAccessEightenContent$
    .subscribe((canAccess: boolean) => {
      this.canAccessEightenContent = canAccess;
    })
  }

  public setFilters(): void {
    this.MOCK_FILTERS = MOCK_FILTERS.filter((filter: IFilter) => {
      return !filter.dontShowIn.includes(this.placeType)
    })
  }

  public navToExplore(): void {
    this.navCtrl.navigateBack(['/logado/explorar'])
  }

  public initialFilter(value: string) {
    this.selectedFilter = value;
  }

  public imageHasLoaded() {
    this.isLoadingLogo = false;
  }

  public back(): void {
    this.navCtrl.back()
  }

  public getCurrentLanguageFromNGRX(): void {
    this.currentLanguage$ = this.store.select(AppStore.selectAppCurrentLanguage);

    this.currentLanguageSubscription = this.currentLanguage$
    .subscribe((language: ILang) => {
      this.currentLanguage = language;
    })
  }

  public getRouter(): void {
    this.route.queryParams
    .pipe(
      take(1),
      map((params) => {
      return params
    }))
    .subscribe((res: any) => {
      this.currentCityAsParam = this.MOCK_CITIES.find((city: ICity) => {
        return city.value === res.cidade;
      })

      this.currentLocationAsParam = res.localidade;
    })

    this.route.paramMap
    .pipe(
      take(1),
      map((params: any) => {
      const updatedParams = {
        ...params.params,
        place_type: params.params.place_type.toUpperCase()
      };
      return updatedParams;
    }))
    .subscribe((res: any) => {
      this.placeType = res.place_type;
    })
  }

  public getPlaces(filters: IFIrebaseFilter[] = []) {
    if (this.currentCityAsParam && this.placeType && this.currentLocationAsParam) {
      this.places$ = this.placesService
      .getCollection(
        CollectionsEnum.PLACES,
        filters
      );

      this.placesSubscription = this.places$
      .subscribe((places: IPlace[]) => {
        this.places = places;
      })
    }
  }

  public slideToNext(): void {
    this.swiper?.slideNext(800);
  }

  public slideToPrev(): void {
    this.swiper?.slidePrev(800);
  }

  public seePlace(place: IPlace, e: any): void {
    if (place.isBuilding) {
      e.preventDefault();
    } else {
      this.navCtrl.navigateForward(['/logado/estabelecimento/' + place.value]);
      this.store.dispatch(AppStore.setCurrentEstablishment({ establishment: place } ))
    }
  }

  public navToContactPage(): void {
    this.navCtrl.navigateForward(['/logado/contato']);
  }

  public async scrollToTop() {
    this.placesContent.scrollToTop(600);
  }

  public openFilterSelect(): void {
    this.filterSelector.open();
  }

  public filterByCharacteristic(e: any): void {
    this.defineActiveFilter(e.detail.value);
  }

  public defineActiveFilter(value: string) {
    this.places = null;
    let filterFound: IFilter | undefined = this.MOCK_FILTERS.find((filter: any) => {
      return filter.value === value;
    })

    if (filterFound) {
      this.activeFilter = filterFound;
    }

    switch (filterFound?.value) {
      case FilterEnum.ALL:
        this.getPlaces([
          { field: 'origin.value', operator: '==', value: this.currentCityAsParam?.value },
          { field: 'mainType.value', operator: '==', value: this.placeType },
          { field: 'work_place', operator: 'array-contains-any', value: [this.currentLocationAsParam] }
        ]);
        break;

      case FilterEnum.PET_FRIENDLY:
        this.getPlaces([
          { field: 'origin.value', operator: '==', value: this.currentCityAsParam?.value },
          { field: 'mainType.value', operator: '==', value: this.placeType },
          { field: 'petfriendly_info.accept_petfriendly', operator: '==', value: true },
          { field: 'work_place', operator: 'array-contains-any', value: [this.currentLocationAsParam] }
        ]);
        break;

      case FilterEnum.LIVEMUSIC:
        this.getPlaces([
          { field: 'origin.value', operator: '==', value: this.currentCityAsParam?.value },
          { field: 'mainType.value', operator: '==', value: this.placeType },
          { field: 'livemusic_info.has_livemusic', operator: '==', value: true },
          { field: 'work_place', operator: 'array-contains-any', value: [this.currentLocationAsParam] }
        ]);
        break;

      case FilterEnum.TICKET:
        this.getPlaces([
          { field: 'origin.value', operator: '==', value: this.currentCityAsParam?.value },
          { field: 'mainType.value', operator: '==', value: this.placeType },
          { field: 'ticket_info.accept_ticket', operator: '==', value: true },
          { field: 'work_place', operator: 'array-contains-any', value: [this.currentLocationAsParam] }
        ]);
        break;

      case FilterEnum.CHILDREN_SPACE:
        this.getPlaces([
          { field: 'origin.value', operator: '==', value: this.currentCityAsParam?.value },
          { field: 'mainType.value', operator: '==', value: this.placeType },
          { field: 'children_space.has_space', operator: '==', value: true },
          { field: 'work_place', operator: 'array-contains-any', value: [this.currentLocationAsParam] }
        ]);
        break;
    }
  }

  public listenForSwiperForControl(ev: any): void {
    this.hideLeftControl = ev.detail[0].isBeginning;
    this.hideRightControl = ev.detail[0].isEnd;
  }

  ngOnDestroy(): void {
    this.placesSubscription.unsubscribe();
    this.currentLanguageSubscription.unsubscribe();
    this.canAccessEightenContentSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
    this.places = null;
  }

}
