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

@Component({
  selector: 'anfitrion-explorar',
  templateUrl: './explorar.page.html',
  styleUrls: ['./explorar.page.scss'],
})
export class ExplorarPage implements OnInit, AfterViewInit, OnDestroy {

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

  public places: IPlace[];
  public places$: Observable<IPlace[]>;
  public placesSubscription: Subscription;

  public user: IUSer;
  public user$: Observable<IUSer>;
  public userSubscription: Subscription;

  public canAccessEightenContent: boolean;
  public canAccessEightenContent$: Observable<boolean>;
  public canAccessEightenContentSubscription: Subscription;

  public beachFeatures: any[] = [
    {
      loadIconsFromAssets: false,
      value: 'QUIOSQUES',
      icon: 'storefront',
      text: {
        pt: 'Quiosques',
        en: 'Kiosks',
        es: 'Quiscos'
      },
      isDisabled: true,
      show: true,
      description: {
        pt: 'quer comer ou beber na orla praia.',
        en: 'who want to eat or drink on the beach.',
        es: 'quieren comer o beber en la orla de la playa.'
      }
    },
    {
      loadIconsFromAssets: false,
      value: 'CARRINHOS',
      icon: 'cart',
      text: {
        pt: 'Carrinhos',
        en: 'Carts',
        es: 'Carritos'
      },
      isDisabled: true,
      show: true,
      description: {
        pt: 'quer comer, beber ou ficar em guarda-sol na faixa de areia.',
        en: 'who want to eat, drink, or stay under a sunshade on the sand.',
        es: 'quieren comer, beber o quedarse bajo una sombrilla en la arena.'
      }
    },
    {
      loadIconsFromAssets: false,
      value: 'AMBULANTES',
      icon: 'person',
      text: {
        pt: 'Ambulantes',
        en: 'Vendors',
        es: 'Ambulantes'
      },
      isDisabled: true,
      show: true,
      description: {
        pt: 'para quem quer comer, beber ou comprar algum item.',
        en: 'who want to eat, drink, or buy something.',
        es: 'quieren comer, beber o comprar algo.'
      }
    }
  ]

  public cityFeatures: any = {
    places: [
      {
        loadIconsFromAssets: false,
        value: 'RESTAURANTE',
        icon: 'restaurant',
        text: {
          pt: 'Restaurantes',
          en: 'Restaurants',
          es: 'Restaurantes'
        },
        isDisabled: false,
        show: true,
        description: {
          pt: '',
          en: '',
          es: ''
        },
        route: 'restaurante',
        atLeastOneLength: false,
        ageLimit: null,
        userRespectAgeLimit: null
      },
      {
        loadIconsFromAssets: false,
        value: 'BAR',
        icon: 'beer',
        text: {
          pt: 'Bares',
          en: 'Bars',
          es: 'Bares'
        },
        isDisabled: false,
        show: true,
        description: {
          pt: '',
          en: '',
          es: ''
        },
        route: 'bar',
        atLeastOneLength: false,
        ageLimit: null,
        userRespectAgeLimit: null
      },
      {
        loadIconsFromAssets: false,
        value: 'CAFETERIA',
        icon: 'cafe',
        text: {
          pt: 'Cafeterias',
          en: 'Coffee Shops',
          es: 'Cafetería'
        },
        isDisabled: false,
        show: true,
        description: {
          pt: '',
          en: '',
          es: ''
        },
        route: 'cafeteria',
        atLeastOneLength: false,
        ageLimit: null,
        userRespectAgeLimit: null
      },
      {
        loadIconsFromAssets: false,
        value: 'ADEGA',
        icon: 'wine',
        text: {
          pt: 'Adegas',
          en: 'Beverage Stores',
          es: 'Bodegas'
        },
        isDisabled: false,
        show: true,
        description: {
          pt: '',
          en: '',
          es: ''
        },
        route: 'adega',
        atLeastOneLength: false,
        ageLimit: 18,
        userRespectAgeLimit: null
      },
      {
        loadIconsFromAssets: false,
        value: 'PIZZARIA',
        icon: 'pizza',
        text: {
          pt: 'Pizzarias',
          en: 'Pizzerias',
          es: 'Pizzerías'
        },
        isDisabled: false,
        show: true,
        description: {
          pt: '',
          en: '',
          es: ''
        },
        route: 'pizzaria',
        atLeastOneLength: false,
        ageLimit: null,
        userRespectAgeLimit: null
      },
      {
        loadIconsFromAssets: false,
        value: 'HAMBURGUERIA',
        icon: 'fast-food',
        text: {
          pt: 'Hamburguerias',
          en: 'Burger Joints',
          es: 'Hamburgueserías'
        },
        isDisabled: false,
        show: true,
        description: {
          pt: '',
          en: '',
          es: ''
        },
        route: 'hamburgueria',
        atLeastOneLength: false,
        ageLimit: null,
        userRespectAgeLimit: null
      },
      {
        loadIconsFromAssets: false,
        value: 'DOCERIA',
        icon: 'pie-chart',
        text: {
          pt: 'Docerias',
          en: 'Sweet Shops',
          es: 'Dulcería'
        },
        isDisabled: false,
        show: true,
        description: {
          pt: '',
          en: '',
          es: ''
        },
        route: 'doceria',
        atLeastOneLength: false,
        ageLimit: null,
        userRespectAgeLimit: null
      }
    ]
  }

  public segments: any[] = [
    {
      value: 'CIDADE',
      text: {
        pt: ["na", "cidade"],
        en: ["in the", "city"],
        es: ["en la", "ciudad"]
      }
    },
    {
      value: 'PRAIA',
      text: {
        pt: ["na", "praia"],
        en: ["at the", "beach"],
        es: ["en la", "playa"]
      }
    }
];

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
    private placesService : PlacesService
  ) { }

  ngOnInit() {
    this.getUserFromNGRX();
    this.getCurrentCityFromNGRX();
    this.getCurrentLanguageFromNGRX();
    this.selectInitialSegment('CIDADE');
    this.getPlaces();
  }

  ngAfterViewInit(): void {
    this.swiper = this.swiperRef?.nativeElement.swiper;
  }

  ionViewWillEnter(): void {
    this.title.setTitle('Explorar');
  }

  public async getPlaces() {
    const loading = await this.overlayService.fireLoading();

    await loading.present();

    this.places$ = this.placesService
    .getCollection(
      CollectionsEnum.PLACES,
      [
        { field: 'origin.value', operator: '==', value: this.currentCity.value }
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

      this.cityFeatures.places.forEach((feature: any) => {
        feature.atLeastOneLength = compressedInformation[feature.value] ? compressedInformation[feature.value] : 0
      })

      await loading.dismiss();
    })
  }

  public selectInitialSegment(segmentValue: string) {
    this.selectedSegment = segmentValue;
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

      let placesEighteenContent = this.cityFeatures.places.filter((feature: any) => {
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
    console.log('dada');
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
        this.getPlaces();
      }
    })

    return modal;
  }

  public async searchPlaceInTheCity(place: any) {
    if (place.userRespectAgeLimit || place.userRespectAgeLimit === null) {
      this.navCtrl.navigateForward([`/logado/explorar/${place.route}`], {
        queryParams: {
          cidade: this.currentCity.value
        }
      })
    } else {
      const toast = await this.overlayService.fireToast({
        mode: 'ios',
        cssClass: 'anf-toast anf-toast-danger',
        message: 'Você não tem idade suficiente para acessar este conteúdo.',
        position: 'top',
        icon: 'ban-outline',
        duration: 2000
      })

      await toast.present();
    }
  }

  ngOnDestroy() {
    this.currentLanguageSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
    this.currentCitySubscription.unsubscribe();
    this.canAccessEightenContentSubscription.unsubscribe();
  }

}
