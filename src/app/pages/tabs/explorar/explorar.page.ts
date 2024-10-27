import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription, take } from 'rxjs';
import { ILang } from 'src/app/shared/models/Lang';
import Swiper from 'swiper';
import { TranslateService } from '@ngx-translate/core';
import { Title } from '@angular/platform-browser';
import { IonContent, NavController } from '@ionic/angular';
import { CidadesPage } from '../cidades/cidades.page';
import { OverlayService } from 'src/app/shared/services/overlay.service';
import { CityFeaturesEnum } from 'src/app/shared/enums/CityFeatures';
import * as AppStore from './../../../shared/store/app.state';
import * as UserStore from './../../../shared/store/user.state';
import { IUSer } from 'src/app/shared/models/IUser';

@Component({
  selector: 'rgs-explorar',
  templateUrl: './explorar.page.html',
  styleUrls: ['./explorar.page.scss'],
})
export class ExplorarPage implements OnInit, AfterViewInit, OnDestroy {


  @ViewChild('explorarContent') explorarContent: IonContent;

  public currentLanguage: ILang;
  public currentLanguage$: Observable<ILang>;
  public currentLanguageSubscription: Subscription;

  public user: IUSer;
  public user$: Observable<IUSer>;
  public userSubscription: Subscription;

  @ViewChild('explorarSwiper')
  swiperRef: ElementRef | undefined;
  swiper?: Swiper;

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
        value: 'RESTAURANTES',
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
        route: 'restaurante'
      },
      {
        loadIconsFromAssets: false,
        value: 'BARES',
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
        route: 'bar'
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
        route: 'cafeteria'
      },
      {
        loadIconsFromAssets: false,
        value: 'ADEGAS',
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
        route: 'adega'
      },
      {
        loadIconsFromAssets: false,
        value: 'PIZZARIAS',
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
        route: 'pizzaria'
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
        route: 'hamburgueria'
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
        route: 'doceria'
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
    private overlayService : OverlayService
  ) { }

  ngOnInit() {
    this.getUserFromNGRX();
    this.getCurrentLanguageFromNGRX();
    this.selectInitialSegment('CIDADE');
  }

  public selectInitialSegment(segmentValue: string) {
    this.selectedSegment = segmentValue;
  }

  ngAfterViewInit(): void {
    this.swiper = this.swiperRef?.nativeElement.swiper;
  }

  ionViewDidEnter(): void {
    this.title.setTitle('Explorar')
  }

  public getCurrentLanguageFromNGRX(): void {
    this.currentLanguage$ = this.store.select(AppStore.selectAppCurrentLanguage);

    this.currentLanguageSubscription = this.currentLanguage$
    .subscribe((language: ILang) => {
      this.currentLanguage = language;
    })
  }

  public getUserFromNGRX(): void {
    this.user$ = this.store.select(UserStore.selectUser);

    this.userSubscription = this.user$
    .subscribe((user: IUSer) => {
      this.user = user;
      console.log(this.user);
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
        user: this.user
      },
      breakpoints: [1],
      initialBreakpoint: 1,
      mode: 'md',
      cssClass: 'anf-about-us-modal',
      id: 'cities-modal'
    })

    await modal.present();

    return modal;
  }

  public searchPlaceInTheCity(type: string): void {
    this.navCtrl.navigateForward([`/logado/explorar/${type}`], {
      queryParams: {
        cidade: 'SAO_VICENTE'
      }
    })
  }

  ngOnDestroy() {
    this.currentLanguageSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }

}
