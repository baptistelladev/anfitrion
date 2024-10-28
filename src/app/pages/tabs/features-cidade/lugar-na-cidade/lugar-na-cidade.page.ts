import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { IonContent, NavController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { map, Observable, Subscription, take } from 'rxjs';
import { ILang } from 'src/app/shared/models/ILang';
import * as AppStore from './../../../../shared/store/app.state';
import { Store } from '@ngrx/store';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { CityEnum } from 'src/app/shared/enums/City';
import { PlaceTypeEnum } from 'src/app/shared/enums/PlaceType';
import { IPlace } from 'src/app/shared/models/IPlace';
import { CollectionsEnum } from 'src/app/shared/enums/Collection';
import { PlacesService } from 'src/app/core/services/firebase/places.service';
import Swiper from 'swiper';

@Component({
  selector: 'rgs-lugar-na-cidade',
  templateUrl: './lugar-na-cidade.page.html',
  styleUrls: ['./lugar-na-cidade.page.scss'],
})
export class LugarNaCidadePage implements OnInit, OnDestroy {

  @ViewChild('placesContent') placesContent: IonContent;

  @ViewChild('placesSwiper')
  swiperRef: ElementRef | undefined;
  swiper?: Swiper;

  public hideRightControl: boolean = false;
  public hideLeftControl: boolean = false;

  public CityEnum = CityEnum;
  public PlaceTypeEnum = PlaceTypeEnum;

  public currentLanguage: ILang;
  public currentLanguage$: Observable<ILang>;
  public currentLanguageSubscription: Subscription;

  public placeType: string;
  public city: string

  public places: IPlace[] | null;
  public places$: Observable<IPlace[]>;
  public placesSubscription: Subscription;

  public isLoadingLogo: boolean;

  constructor(
    private navCtrl : NavController,
    private translate : TranslateService,
    private store : Store,
    private title : Title,
    private route : ActivatedRoute,
    private placesService : PlacesService
  ) { }

  ngOnInit() {
    this.getCurrentLanguageFromNGRX();
    this.title.setTitle('Lugares')
    this.getRouter();
    this.getPlaces();
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
      this.city = res.cidade;
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

  public getPlaces() {
    if (this.city && this.placeType) {
      this.places$ = this.placesService
      .getCollection(
        CollectionsEnum.PLACES,
        [
          { field: 'origin.value', operator: '==', value: this.city },
          { field: 'mainType.value', operator: '==', value: this.placeType }
        ]
      );

      this.placesSubscription = this.places$
      .subscribe((places: IPlace[]) => {
        this.places = places;
        console.log(this.places);
        console.log(this.placeType, this.city);

      })
    }
  }

  public swiperReachedEnd() {
    this.hideRightControl = true;
  }

  public swiperReachedBeginning() {
    this.hideLeftControl = true;
  }

  public slideToNext(): void {
    this.swiper?.slideNext(800);

    if (this.hideLeftControl) {
      this.hideLeftControl = false;
    }
  }

  public slideToPrev(): void {
    this.swiper?.slidePrev(800);

    if (this.hideRightControl) {
      this.hideRightControl = false;
    }
  }

  public seePlace(place: IPlace, e: any): void {
    if (place.isBuilding) {
      e.preventDefault();
    } else {
      this.navCtrl.navigateForward(['/estabelecimento/' + place.value]);
      this.store.dispatch(AppStore.setCurrentEstablishment({ establishment: place } ))
    }
  }

  public navToContactPage(): void {
    this.navCtrl.navigateForward(['/logado/contato']);
  }

  public async scrollToTop() {
    this.placesContent.scrollToTop(600);
  }

  ngOnDestroy(): void {
    this.placesSubscription.unsubscribe();
    this.currentLanguageSubscription.unsubscribe();
    this.places = null;
  }

}
