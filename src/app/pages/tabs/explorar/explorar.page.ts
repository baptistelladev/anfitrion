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

  public selectedCityFeature: any;
  public selectedBeachFeature: any;

  public currentLanguage: ILang;
  public currentLanguage$: Observable<ILang>;
  public currentLanguageSubscription: Subscription;

  public user: IUSer;
  public user$: Observable<IUSer>;
  public userSubscription: Subscription;

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
      value: 'PESSOAS',
      icon: 'people',
      text: {
        pt: 'Pessoas',
        en: 'People',
        es: 'Personas'
      },
      isDisabled: true,
      show: true,
      description: {
        pt: 'quer conhecer os artistas da região.',
        en: 'who want to meet the artists of the region.',
        es: 'quieren conocer a los artistas de la región.'
      }
    },
    {
      loadIconsFromAssets: false,
      value: 'SERVICOS',
      icon: 'map',
      text: {
        pt: 'Serviços',
        en: 'Services',
        es: 'Servicios'
      },
      isDisabled: true,
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
  ];

  public translatedPage: any;
  public translatedPage$: Observable<any>;

  constructor(
    private store : Store,
    private translate : TranslateService,
    private title : Title,
    public navCtrl : NavController,
    private overlayService : OverlayService
  ) { }

  ngOnInit() {
    this.getUserFromNGRX();
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

  public selectCityFeature(value: string) {
    this.selectedCityFeature = this.cityFeatures.find((feature: any) => {
      return feature.value === value;
    })
  }

  public selectBeachFeature(value: string) {
    this.selectedBeachFeature = this.beachFeatures.find((feature: any) => {
      return feature.value === value;
    })
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

  public searchInTheCity(): void {
    switch (this.selectedCityFeature.value) {
      case CityFeaturesEnum.LUGARES:
        this.navCtrl.navigateForward(['/logado/explorar/lugares-na-cidade'])
        break;
    }
  }

  ngOnDestroy() {
    this.currentLanguageSubscription.unsubscribe();
  }

}
