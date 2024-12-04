import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription, take } from 'rxjs';
import { ILang } from 'src/app/shared/models/ILang';
import Swiper from 'swiper';
import { Title } from '@angular/platform-browser';
import { IonContent, NavController } from '@ionic/angular';
import { CidadesPage } from '../cidades/cidades.page';
import { OverlayService } from 'src/app/shared/services/overlay.service';
import * as AppStore from './../../../shared/store/app.state';
import * as UserStore from './../../../shared/store/user.state';
import { IUSer } from 'src/app/shared/models/IUser';
import { ICity } from 'src/app/shared/models/ICity';
import { PlacesService } from 'src/app/core/services/firebase/places.service';
import { IPlace } from 'src/app/shared/models/IPlace';
import { CollectionsEnum } from 'src/app/shared/enums/Collection';
import { TranslateService } from '@ngx-translate/core';
import { AnalyticsEventnameEnum } from 'src/app/shared/enums/Analytics';
import { AnalyticsService } from 'src/app/core/services/firebase/analytics.service';
import { MOCK_CITY_FEATURES } from 'src/app/shared/mocks/MockCityFeatures';
import { MOCK_BEACH_FEATURES } from 'src/app/shared/mocks/MockBeachFeatures';
import { LocationEnum } from 'src/app/shared/enums/Location';
import { PeopleService } from 'src/app/core/services/firebase/people.service';
import { MOCK_LOCATION } from 'src/app/shared/mocks/MockLocation';
import { ILocation } from 'src/app/shared/models/ILocation';

@Component({
  selector: 'anfitrion-explorar',
  templateUrl: './explorar.page.html',
  styleUrls: ['./explorar.page.scss'],
})
export class ExplorarPage implements OnInit, AfterViewInit, OnDestroy {

  public lookingForPlaces: boolean = false;
  public lookingForPeople: boolean = false;

  @ViewChild('explorarContent') explorarContent: IonContent;

  @ViewChild('explorarSwiper')
  swiperRef: ElementRef | undefined;
  swiper?: Swiper;

  public currentLanguage: ILang;
  public currentLanguage$: Observable<ILang>;
  public currentLanguageSubscription: Subscription;

  public currentCity: ICity;
  public currentCity$: Observable<ICity>;
  public currentCitySubscription: Subscription;

  public places: IPlace[] | null;
  public places$: Observable<IPlace[]>;
  public placesSubscription: Subscription;

  public people: any[] | null;
  public people$: Observable<IPlace[]>;
  public peopleSubscription: Subscription;

  public user: IUSer;
  public user$: Observable<IUSer>;
  public userSubscription: Subscription;

  public canAccessEightenContent: boolean;
  public canAccessEightenContent$: Observable<boolean>;
  public canAccessEightenContentSubscription: Subscription;

  public MOCK_BEACH_FEATURES: any = MOCK_BEACH_FEATURES;
  public MOCK_CITY_FEATURES: any = MOCK_CITY_FEATURES;

  public FEATURES: any;

  public LocationEnum = LocationEnum;

  public MOCK_LOCATION: ILocation[] = MOCK_LOCATION;

  public selectedSegment: string = '';
  public selectedFeatures: any[];
  public selectedFeature: any;

  public selectSubFeatures: any[];
  public selectedSubFeatures: any;

  constructor(
    private store : Store,
    private title : Title,
    public navCtrl : NavController,
    private overlayService : OverlayService,
    private placesService : PlacesService,
    private peopleService : PeopleService,
    private translate : TranslateService,
    private analyticsService : AnalyticsService
  ) { }

  ngOnInit() {
    this.getUserFromNGRX();
    this.getCurrentCityFromNGRX();
    this.getCurrentLanguageFromNGRX();
    this.selectInitialSegment(LocationEnum.CIDADE);
  }

  ngAfterViewInit(): void {
    this.swiper = this.swiperRef?.nativeElement.swiper;
  }

  ionViewWillEnter(): void {
    this.title.setTitle('Explorar');
    this.analyticsService.tagViewInit(AnalyticsEventnameEnum.PAGE_VIEW);
  }

  public async getPlacesFromCity() {

    this.lookingForPlaces = true;

    this.places$ = this.placesService
    .getCollection(
      CollectionsEnum.PLACES,
      [
        { field: 'origin.value', operator: '==', value: this.currentCity.value },
        { field: 'work_place', operator: 'array-contains-any', value: [this.selectedSegment] }
      ]
    );

    this.placesSubscription = this.places$
    .subscribe( async (places: IPlace[]) => {
      this.places = places;

      let compressedInformation = this.places.reduce((acc: any, place) => {
        const key = place.mainType.value.toUpperCase();
        acc[key] = (acc[key] || 0) + 1;
        return acc;
      }, {});

      this.FEATURES.places.forEach((feature: any) => {
        feature.atLeastOneLength = compressedInformation[feature.value] ? compressedInformation[feature.value] : 0
      })

      this.lookingForPlaces = false;
    })
  }


  public async getPeopleFromBeach() {

    this.lookingForPlaces = true;

    this.people$ = this.peopleService
    .getCollection(
      CollectionsEnum.PEOPLE,
      [
        { field: 'origin.value', operator: '==', value: this.currentCity.value },
        { field: 'work_place', operator: 'array-contains-any', value: [this.selectedSegment] }
      ]
    );

    this.peopleSubscription = this.people$
    .subscribe( async (people: any[]) => {
      this.people = people;

      console.log(this.people);


      let compressedInformation = this.people.reduce((acc: any, place) => {
        const key = place.mainType.value.toUpperCase();
        acc[key] = (acc[key] || 0) + 1;
        return acc;
      }, {});

      this.FEATURES.people.forEach((feature: any) => {
        feature.atLeastOneLength = compressedInformation[feature.value] ? compressedInformation[feature.value] : 0
      })

      this.lookingForPlaces = false;
    })
  }

  public async getPeopleFromCity() {

    this.lookingForPeople = true;

    this.people$ = this.peopleService
    .getCollection(
      CollectionsEnum.PEOPLE,
      [
        { field: 'origin.value', operator: '==', value: this.currentCity.value },
        { field: 'work_place', operator: 'array-contains-any', value: [this.selectedSegment] }
      ]
    );

    this.peopleSubscription = this.people$
    .subscribe( async (people: any[]) => {
      this.people = people;

      console.log(this.people);


      let compressedInformation = this.people.reduce((acc: any, place) => {
        const key = place.mainType.value.toUpperCase();
        acc[key] = (acc[key] || 0) + 1;
        return acc;
      }, {});

      this.FEATURES.people.forEach((feature: any) => {
        feature.atLeastOneLength = compressedInformation[feature.value] ? compressedInformation[feature.value] : 0
      })

      this.lookingForPeople = false;
    })
  }

  public async getPlacesFromBeach() {
    this.lookingForPlaces = true;

    this.places$ = this.placesService
    .getCollection(
      CollectionsEnum.PLACES,
      [
        { field: 'origin.value', operator: '==', value: this.currentCity.value },
        { field: 'work_place', operator: 'array-contains-any', value: [this.selectedSegment] }
      ]
    );

    this.placesSubscription = this.places$
    .subscribe( async (places: IPlace[]) => {
      this.places = places;

      let compressedInformation = this.places.reduce((acc: any, place) => {
        const key = place.mainType.value.toUpperCase();

        acc[key] = (acc[key] || 0) + 1;
        return acc;
      }, {});

      this.FEATURES.places.forEach((feature: any) => {
        feature.atLeastOneLength = compressedInformation[feature.value] ? compressedInformation[feature.value] : 0

        console.log(feature.atLeastOneLength);
      })

      this.lookingForPlaces = false
    })
  }

  public selectInitialSegment(segmentValue: string) {
    this.selectedSegment = segmentValue;
    this.FEATURES = this.MOCK_CITY_FEATURES;
    this.getPlacesFromCity();
    // MOSTRAR PESSOAS [SOON] this.getPeopleFromCity();
  }

  public getCurrentLanguageFromNGRX(): void {
    this.currentLanguage$ = this.store.select(AppStore.selectAppCurrentLanguage);

    this.currentLanguageSubscription = this.currentLanguage$
    .subscribe((language: ILang) => {
      this.currentLanguage = language;
    })
  }

  public getCurrentCityFromNGRX(): void {
    this.currentCity$ = this.store.select(AppStore.selectAppCurrentCity);

    this.currentCitySubscription = this.currentCity$
    .subscribe((city: ICity) => {
      this.currentCity = city;
    })
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

      let placesEighteenContent = this.MOCK_CITY_FEATURES.places.filter((feature: any) => {
        return feature.ageLimit === 18;
      })

      if (placesEighteenContent) {
        placesEighteenContent.forEach((place: any) => {
          place.userRespectAgeLimit = this.canAccessEightenContent;
        })
      }
    })
  }

  public segmentChanged(): void {

    this.FEATURES = null;
    this.places = null;
    // MOSTRAR PESSOAS [SOON]  this.people = null;

    if (this.selectedSegment === LocationEnum.PRAIA) {
      this.FEATURES = this.MOCK_BEACH_FEATURES;
      this.getPlacesFromBeach();
      // MOSTRAR PESSOAS [SOON] this.getPeopleFromBeach();
    } else {
      this.FEATURES = this.MOCK_CITY_FEATURES;
      this.getPlacesFromCity();
      // MOSTRAR PESSOAS [SOON]  this.getPeopleFromCity();
    }
  }

  public async scrollToTop() {
    this.explorarContent.scrollToTop(600);
  }

  public navToContactPage(): void {
    this.navCtrl.navigateForward(['/logado/contato']);
  }

  public async openCityModal() {
    const modal = await this.overlayService.fireModal({
      component: CidadesPage,
      componentProps: {
        currentLanguage: this.currentLanguage,
        user: this.user,
        currentCity: this.currentCity
      },
      breakpoints: [1],
      initialBreakpoint: 1,
      mode: 'md',
      cssClass: 'anf-about-us-modal',
      id: 'cities-modal'
    })

    await modal.present();

    await modal.onDidDismiss().then((resp: any) => {
      if (resp.role === 'change') {
        this.segmentChanged();
      }
    })

    return modal;
  }

  public async searchPlace(place: any) {
    if (place.origin === LocationEnum.CIDADE) {
      await this.searchPlaceInTheCity(place);
    } else {
      this.searchPlaceAtTheBeach(place);
    }
  }

  public async searchPlaceInTheCity(place: any) {
    if (place.userRespectAgeLimit || place.userRespectAgeLimit === null) {
      this.navCtrl.navigateForward([`/logado/explorar/lugares-na-cidade/${place.route}`], {
        queryParams: {
          localidade: this.selectedSegment,
          cidade: this.currentCity.value
        }
      })

    } else {
      const toast = await this.overlayService.fireToast({
        mode: 'ios',
        cssClass: 'anf-toast anf-toast-danger',
        message: `${this.translate.instant('SHARED.AGE_LIMIT_18')}`,
        position: 'top',
        icon: 'ban-outline',
        duration: 2000
      })

      await toast.present();
    }
  }

  public async searchPlaceAtTheBeach(place: any) {
    this.navCtrl.navigateForward([`/logado/explorar/lugares-na-praia/${place.route}`], {
      queryParams: {
        localidade: this.selectedSegment,
        cidade: this.currentCity.value
      }
    })
  }

  ngOnDestroy() {
    this.currentLanguageSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
    this.currentCitySubscription.unsubscribe();
    this.canAccessEightenContentSubscription.unsubscribe();
  }

}
