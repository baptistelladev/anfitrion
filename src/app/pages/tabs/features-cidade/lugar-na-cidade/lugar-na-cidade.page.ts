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
import { PlaceTypeEnum } from 'src/app/shared/enums/PlaceType';
import { IPlace } from 'src/app/shared/models/IPlace';
import { CollectionsEnum } from 'src/app/shared/enums/Collection';
import { PlacesService } from 'src/app/core/services/firebase/places.service';
import Swiper from 'swiper';
import { ICity } from 'src/app/shared/models/ICity';

@Component({
  selector: 'anfitrion-lugar-na-cidade',
  templateUrl: './lugar-na-cidade.page.html',
  styleUrls: ['./lugar-na-cidade.page.scss'],
})
export class LugarNaCidadePage implements OnInit, OnDestroy, AfterViewInit {

  public selectedFilter: string;
  public activeFilter: any;

  public filters: any[] = [
    {
      value: 'ALL',
      text: {
        pt: 'Todos',
        en: 'All',
        es: 'Todos'
      }
    },
    {
      value: 'PET_FRIENDLY',
      text: {
        pt: 'Pode levar pet',
        en: 'Pets allowed',
        es: 'Se permiten mascotas'
      }
    },
    {
      value: 'TICKET',
      text: {
        pt: 'Aceita vale refeição',
        en: 'Accept meal vouchers ',
        es: 'Acepta vales de comida'
      }
    },
    {
      value: 'LIVEMUSIC',
      text: {
        pt: 'Tem música ao vivo',
        en: 'Has live music',
        es: 'Tiene música en vivo'
      }
    }
  ]

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

  public hideRightControl: boolean = false;
  public hideLeftControl: boolean = false;

  public CityEnum = CityEnum;
  public PlaceTypeEnum = PlaceTypeEnum;

  public currentLanguage: ILang;
  public currentLanguage$: Observable<ILang>;
  public currentLanguageSubscription: Subscription;

  public placeType: string;
  public currentCityAsParam: ICity | undefined;

  public places: IPlace[] | null;
  public places$: Observable<IPlace[]>;
  public placesSubscription: Subscription;

  public isLoadingLogo: boolean;

  public MOCK_CITIES: ICity[] = MOCK_CITIES;

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
    this.initialFilter('ALL');
    this.defineActiveFilter('ALL');
  }

  ngAfterViewInit(): void {
    this.swiper = this.swiperRef?.nativeElement.swiper;
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
    if (this.currentCityAsParam && this.placeType) {
      this.places$ = this.placesService
      .getCollection(
        CollectionsEnum.PLACES,
        [
          { field: 'origin.value', operator: '==', value: this.currentCityAsParam.value },
          { field: 'mainType.value', operator: '==', value: this.placeType }
        ]
      );

      this.placesSubscription = this.places$
      .subscribe((places: IPlace[]) => {
        this.places = places;
        console.log(this.places);
        console.log(this.placeType, this.currentCityAsParam?.value);

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

  public openFilterSelect(): void {
    this.filterSelector.open();
  }

  public filterByCharacteristic(e: any): void {


    switch (e.detail.value) {
      case 'PET_FRIENDLY':
        console.log('pet');

        break;

      case 'TICKET':
        console.log('ticket');
        break;

      case 'LIVEMUSIC':
        console.log('live');
        break;

      case 'ALL':
        console.log('all');

        break;

      default:
        break;
    }

    this.defineActiveFilter(e.detail.value);
  }

  public defineActiveFilter(value: string) {
    let filterFound = this.filters.find((filter: any) => {
      return filter.value === value;
    })

    if (filterFound) {
      this.activeFilter = filterFound;
    }

  }


  ngOnDestroy(): void {
    this.placesSubscription.unsubscribe();
    this.currentLanguageSubscription.unsubscribe();
    this.places = null;
  }

}
