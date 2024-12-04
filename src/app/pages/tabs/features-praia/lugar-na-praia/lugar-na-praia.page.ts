import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { IonContent, NavController } from '@ionic/angular';
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
import { MOCK_SANTOS_BEACHES } from 'src/app/shared/mocks/MockBeaches';

@Component({
  selector: 'anfitrion-lugar-na-praia',
  templateUrl: './lugar-na-praia.page.html',
  styleUrls: ['./lugar-na-praia.page.scss'],
})
export class LugarNaPraiaPage implements OnInit, OnDestroy {

  public user: IUSer;
  public user$: Observable<IUSer>;
  public userSubscription: Subscription;

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

  @ViewChild('placesContent') placesContent: IonContent;

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

      switch (this.currentCityAsParam?.value) {
        case CityEnum.SANTOS:
          this.MOCK_BEACHES = MOCK_SANTOS_BEACHES
          break;

        default:
          break;
      }

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

  public ngOnDestroy(): void {
    this.currentLanguageSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }

}
