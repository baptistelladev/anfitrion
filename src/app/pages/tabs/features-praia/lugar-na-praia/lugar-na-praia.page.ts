import { MOCK_BEACH_FEATURES } from 'src/app/shared/mocks/MockBeachFeatures';
import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { IonContent, IonSelect, NavController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { map, Observable, Subscription, take } from 'rxjs';
import { AnalyticsService } from 'src/app/core/services/firebase/analytics.service';
import { PlacesService } from 'src/app/core/services/firebase/places.service';
import { ILang } from 'src/app/shared/models/ILang';
import { IUSer } from 'src/app/shared/models/IUser';
import * as AppStore from './../../../../shared/store/app.state';
import * as UserStore from './../../../../shared/store/user.state';
import { ICity } from 'src/app/shared/models/ICity';
import { MOCK_CITIES } from 'src/app/shared/mocks/MockCities';
import { LocationEnum } from 'src/app/shared/enums/Location';
import { PlaceTypeBeachEnum } from 'src/app/shared/enums/PlaceType';
import { IBeach } from 'src/app/shared/models/IBeach';
import { CityEnum } from 'src/app/shared/enums/City';
import { MOCK_SANTOS_BEACHES, MOCK_SAO_VICENTE_BEACHES } from 'src/app/shared/mocks/MockBeaches';
import { AnalyticsEventnameEnum } from 'src/app/shared/enums/Analytics';
import { IFilter } from 'src/app/shared/models/IFilter';
import { MOCK_FILTERS } from 'src/app/shared/mocks/MockFilters';
import { FilterEnum } from 'src/app/shared/enums/FilterEnum';
import { IPlace } from 'src/app/shared/models/IPlace';
import { CollectionsEnum } from 'src/app/shared/enums/Collection';
import Swiper from 'swiper';
import { IFirebaseFilter } from 'src/app/shared/models/IFirebaseFilter';

@Component({
  selector: 'anfitrion-lugar-na-praia',
  templateUrl: './lugar-na-praia.page.html',
  styleUrls: ['./lugar-na-praia.page.scss'],
})
export class LugarNaPraiaPage implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('beachSwiper')
  swiperRef: ElementRef | undefined;
  swiper?: Swiper;

  @ViewChild('map', { static: false }) mapElement: HTMLElement | undefined;

  public showBeachMap: boolean = false;
  public beachPngPrint: any;

  public filter: IFirebaseFilter[];

  public selectedFilter: string;
  public activeFilter: any;

  public user: IUSer;
  public user$: Observable<IUSer>;
  public userSubscription: Subscription;

  public places: IPlace[] | null;
  public places$: Observable<IPlace[]>;
  public placesSubscription: Subscription;

  public currentLanguage: ILang;
  public currentLanguage$: Observable<ILang>;
  public currentLanguageSubscription: Subscription;

  public placeType: string;
  public currentCityAsParam: ICity | undefined;
  public currentLocationAsParam: string | undefined;
  public PlaceTypeBeachEnum = PlaceTypeBeachEnum;

  public LocationEnum = LocationEnum;

  public MOCK_CITIES: ICity[] = MOCK_CITIES;
  public MOCK_BEACHES: IBeach[];

  public MOCK_BEACH_FEATURES: any = MOCK_BEACH_FEATURES;

  public MOCK_FILTERS: IFilter[];

  public selectedBeach: IBeach;

  @ViewChild('placesContent') placesContent: IonContent;
  @ViewChild('filterSelector') filterSelector: IonSelect;

  public placeTypeOBJ: any;

  constructor(
    private navCtrl : NavController,
    private translate : TranslateService,
    private store : Store,
    private title : Title,
    private route : ActivatedRoute,
    private placesService : PlacesService,
    private analyticsService : AnalyticsService
  ) { }

  async ngOnInit() {
    this.getUserFromNGRX();
    this.getCurrentLanguageFromNGRX();
    this.getRouter();
  }

  public ngAfterViewInit(): void {
    this.swiper = this.swiperRef?.nativeElement.swiper;
  }

  ionViewWillEnter(): void {
    this.title.setTitle('Lugares na praia');
    this.analyticsService.tagViewInit(AnalyticsEventnameEnum.PAGE_VIEW);
  }

  public async defineActiveFilter(value: string): Promise<boolean> {
    this.places = null;
    let filterFound: IFilter | undefined = this.MOCK_FILTERS.find((filter: any) => {
      return filter.value === value;
    })

    if (filterFound) {
      this.activeFilter = filterFound;
    }

    this.filter = [];

    if (this.selectedBeach && this.selectedBeach.value !== 'ALL') {
      this.filter.push({ field: 'beachInfo.value', operator: '==', value: this.selectedBeach.value });
    }

    switch (filterFound?.value) {
      case FilterEnum.ALL:

        this.filter.push(
          { field: 'origin.value', operator: '==', value: this.currentCityAsParam?.value },
          { field: 'mainType.value', operator: '==', value: this.placeType },
          { field: 'work_place', operator: 'array-contains-any', value: [this.currentLocationAsParam] }
        )

        this.getPlaces(this.filter);
        break;

      case FilterEnum.TICKET:
        this.filter.push(
          { field: 'origin.value', operator: '==', value: this.currentCityAsParam?.value },
          { field: 'mainType.value', operator: '==', value: this.placeType },
          { field: 'ticket_info.accept_ticket', operator: '==', value: true },
          { field: 'work_place', operator: 'array-contains-any', value: [this.currentLocationAsParam] },
        )

        this.getPlaces(this.filter);
        break;

      case FilterEnum.DELIVERY_ON_THE_SAND:
        this.filter.push(
          { field: 'origin.value', operator: '==', value: this.currentCityAsParam?.value },
          { field: 'mainType.value', operator: '==', value: this.placeType },
          { field: 'work_place', operator: 'array-contains-any', value: [this.currentLocationAsParam] },
          { field: 'delivery_sand.make_delivery', operator: '==', value: true }
        )

        this.getPlaces(this.filter);
        break;
    }

    return true
  }

  public async setFilters(): Promise<IFilter[]> {
    this.MOCK_FILTERS = MOCK_FILTERS.filter((filter: IFilter) => {
      return !filter.dontShowIn.includes(this.placeType)
    })

    return this.MOCK_FILTERS
  }

  public async initialFilter(value: string) {
    this.selectedFilter = value;
  }

  public back(): void {
    this.navCtrl.back()
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

  public async scrollToTop() {
    this.placesContent.scrollToTop(600);
  }

  public openFilterSelect(): void {
    this.filterSelector.open();
  }

  public getRouter(): void {
    this.route.queryParams
    .pipe(
      take(1),
      map((params) => {
      return params
    }))
    .subscribe(async (res: any) => {
      this.currentCityAsParam = this.MOCK_CITIES.find((city: ICity) => {
        return city.value === res.cidade;
      })

      this.currentLocationAsParam = res.localidade;

      await this.defineBeaches(this.currentCityAsParam);
      await this.selectInitialBeach();
      await this.setFilters();
      await this.defineActiveFilter(FilterEnum.ALL);
      await this.initialFilter(FilterEnum.ALL);

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

      this.placeTypeOBJ = this.MOCK_BEACH_FEATURES.places.find((placeType: any) => {
        return placeType.value === this.placeType
      })
    })
  }

  public async defineBeaches(currentBeach?: ICity): Promise<IBeach[]> {
    switch (currentBeach?.value) {
      case CityEnum.SANTOS:
        this.MOCK_BEACHES = MOCK_SANTOS_BEACHES;
        break;

      case CityEnum.SAO_VICENTE:
        this.MOCK_BEACHES = MOCK_SAO_VICENTE_BEACHES;
        break;
    }

    return this.MOCK_BEACHES
  }

  public async selectInitialBeach() {
    let beachFound: IBeach | undefined = this.MOCK_BEACHES.find((beach: IBeach) => {
      return beach.value === 'ALL';
    })

    if (this.MOCK_BEACHES.length > 0) {
      if (beachFound) {
        this.selectedBeach = beachFound
      } else {
        this.selectedBeach = this.MOCK_BEACHES[0];
      }
    }
  }

  public async selectBeach(beach: IBeach) {
    this.selectedBeach = beach;
    this.defineActiveFilter(this.activeFilter.value)
  }

  public async filterByCharacteristic(e: any) {
    this.defineActiveFilter(e.detail.value);
  }

  public getPlaces(filters: IFirebaseFilter[] = []) {
    if (this.currentCityAsParam && this.placeType && this.currentLocationAsParam) {
      this.places$ = this.placesService
      .getPlacesCollection(
        CollectionsEnum.PLACES,
        filters
      );

      this.placesSubscription = this.places$
      .subscribe((places: IPlace[]) => {
        this.places = places;
      })
    }
  }

  public async toggleModalMap(show: boolean) {
    this.showBeachMap = show;
  }

  public slideSwiperTo(index: number): void {
    this.swiper?.slideTo(index, 800);
  }

  public seePlace(place: IPlace, e: any): void {
    if (place.isBuilding) {
      e.preventDefault();
    } else {
      this.navCtrl.navigateForward(['/logado/estabelecimento-na-praia/' + place.value]);
      this.store.dispatch(AppStore.setCurrentEstablishment({ establishment: place } ))
    }
  }

  public ngOnDestroy(): void {
    this.currentLanguageSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }

}
