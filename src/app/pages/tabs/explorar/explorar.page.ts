import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription, take } from 'rxjs';
import { ILang } from 'src/app/shared/models/Lang';
import * as AppStore from './../../../shared/store/app.state';
import Swiper from 'swiper';
import { TranslateService } from '@ngx-translate/core';
import { Title } from '@angular/platform-browser';
import { IonContent, NavController } from '@ionic/angular';

@Component({
  selector: 'rgs-explorar',
  templateUrl: './explorar.page.html',
  styleUrls: ['./explorar.page.scss'],
})
export class ExplorarPage implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('explorarContent') explorarContent: IonContent;

  public selectedCityFeature: any;
  public selectedBeachFeature: any;

  public currentLanguage: ILang;
  public currentLanguage$: Observable<ILang>;
  public currentLanguageSubscription: Subscription;

  @ViewChild('explorarSwiper')
  swiperRef: ElementRef | undefined;
  swiper?: Swiper;

  public segments: any[] = [
    {
      value: 'CIDADE',
      text: {
        pt: ["na", "cidade"],
        en: ["in the", "city"],
        es: ["en la", "ciudad"]
      },
    },
    {
      value: 'PRAIA',
      text: {
        pt: ["na", "praia"],
        en: ["at the", "beach"],
        es: ["en la", "playa"]
      },
    }
];

  public selectedSegment: string = 'CIDADE';

  public cityFeatures: any[] = [
    {
      loadIconsFromAssets: false,
      value: 'LUGARES',
      icon: 'map',
      text: {
        pt: 'Lugares',
        en: 'Places',
        es: 'Lugares'
      },
      isDisabled: false,
      show: true,
      description: {
        pt: 'procura por barzinhos, adegas, tabacarias...',
        en: 'looking for bars, wineries, tobacco shops...',
        es: 'buscando bares, bodegas, tiendas de tabaco...'
      }
    },
    {
      loadIconsFromAssets: false,
      value: 'Pessoas',
      icon: 'people',
      text: {
        pt: 'Pessoas',
        en: 'People',
        es: 'Personas'
      },
      isDisabled: false,
      show: true,
      description: {
        pt: 'quer conhecer os artistas da região.',
        en: 'who want to meet the artists of the region.',
        es: 'quieren conocer a los artistas de la región.'
      }
    },
    {
      loadIconsFromAssets: false,
      value: 'SERVIÇOS',
      icon: 'map',
      text: {
        pt: 'Serviços',
        en: 'Services',
        es: 'Servicios'
      },
      isDisabled: false,
      show: true,
      description: {
        pt: 'procura por tatuadores, body piercer, manicures...',
        en: 'looking for tattoo artists, body piercers, manicures...',
        es: 'buscan tatuadores, piercers, manicuras...'
      }
    }
  ];

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
      isDisabled: false,
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
      isDisabled: false,
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
      isDisabled: false,
      show: true,
      description: {
        pt: 'para quem quer comer, beber ou comprar algum item.',
        en: 'who want to eat, drink, or buy something.',
        es: 'quieren comer, beber o comprar algo.'
      }
    }
  ];

  public translatedPage: any;
  public translatedPage$: Observable<any>;

  constructor(
    private store : Store,
    private translate : TranslateService,
    private title : Title,
    public navCtrl : NavController
  ) { }

  ngOnInit() {
    this.getCurrentLanguageFromNGRX();
    this.selectCityFeature('LUGARES');
    this.selectBeachFeature('QUIOSQUES');
  }

  ngAfterViewInit(): void {
    this.swiper = this.swiperRef?.nativeElement.swiper;
  }

  ionViewDidEnter(): void {
    this.getPageTranslated();
  }

  public getPageTranslated(): void {
    this.translatedPage$ = this.translate.get('EXPLORE_PAGE')

    this.translatedPage$
    .pipe(take(2))
    .subscribe((resp: any) => {
      this.translatedPage = resp;
      this.title.setTitle('anfitrion | ' + this.translatedPage['PAGE_TITLE'])
    })
  }

  public getCurrentLanguageFromNGRX(): void {
    this.currentLanguage$ = this.store.select(AppStore.selectAppCurrentLanguage);

    this.currentLanguageSubscription = this.currentLanguage$
    .subscribe((language: ILang) => {
      this.currentLanguage = language;
    })
  }

  public segmentChanged(): void {
    console.log('dada');
  }

  public selectCityFeature(value: string) {
    this.selectedCityFeature = this.cityFeatures.find((feature: any) => {
      return feature.value === value;
    })

    console.log(this.selectedCityFeature);

  }

  public selectBeachFeature(value: string) {
    this.selectedBeachFeature = this.beachFeatures.find((feature: any) => {
      return feature.value === value;
    })

    console.log(this.selectedBeachFeature);

  }

  public async scrollToTop() {
    this.explorarContent.scrollToTop(600);
  }

  public navToContactPage(): void {
    this.navCtrl.navigateForward(['/logado/contato']);
  }

  ngOnDestroy() {
    this.currentLanguageSubscription.unsubscribe();
  }

}
