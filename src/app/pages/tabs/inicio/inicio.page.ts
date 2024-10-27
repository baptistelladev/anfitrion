
import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AlertController, IonContent, IonSelect, NavController, PopoverController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { map, Observable, Subscription, take } from 'rxjs';
import { IPlace } from 'src/app/shared/models/IPlace';
import { ILang } from 'src/app/shared/models/ILang';
import * as AppStore from './../../../shared/store/app.state';
import { Store } from '@ngrx/store';
import { EstablishmentsService } from 'src/app/core/services/firebase/establishments.service';
import { CollectionsEnum } from 'src/app/shared/enums/Collection';
import * as moment from 'moment';
import { UtilsService } from 'src/app/core/services/utils.service';
import { Swiper } from 'swiper';
import { AnalyticsService } from 'src/app/core/services/firebase/analytics.service';
import { AnalyticsEventnameEnum } from 'src/app/shared/enums/Analytics';
import { IParking } from 'src/app/shared/models/IParking';
import { ParkingsService } from 'src/app/core/services/firebase/parkings.service';

@Component({
  selector: 'rgs-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit, OnDestroy, AfterViewInit {

  public establishmentActiveIndex: number | undefined = 1;
  public hideRightControl: boolean = false;
  public hideLeftControl: boolean = false;

  public selectedInfo: any;

  public lenghts_to_save_time: {
    list: IPlace[],
    establishment_type: string,
    text: any,
    length: number,
    plural: any
  }[] = [
    {
      list: [],
      establishment_type: 'ADEGA',
      length: 0,
      text: {
        pt: 'Adega',
        en: 'Wine Cellar',
        es: 'Bodega'
      },
      plural: {
        pt: 'Adegas',
        en: 'Wine Cellars',
        es: 'Bodegas'
      }
    },
    {
      list: [],
      establishment_type: 'DOCERIA',
      length: 0,
      text: {
        pt: 'Doceria',
        en: 'Confectionery',
        es: 'Dulcería'
      },
      plural: {
        pt: 'Docerias',
        en: 'Confectioneries',
        es: 'Dulcerías'
      }
    },
    {
      list: [],
      establishment_type: 'EMPORIO',
      length: 0,
      text: {
        pt: 'Empório',
        en: 'Emporium',
        es: 'Empore'
      },
      plural: {
        pt: 'Empórios',
        en: 'Emporiums',
        es: 'Emporios'
      }
    },
    {
      list: [],
      establishment_type: 'HAMBURGUERIA',
      length: 0,
      text: {
        pt: 'Hamburgueria',
        en: 'Burger Joint',
        es: 'Hamburguesería'
      },
      plural: {
        pt: 'Hamburguerias',
        en: 'Burger Joints',
        es: 'Hamburgueserías'
      }
    },
    {
      list: [],
      establishment_type: 'BAR',
      length: 0,
      text: {
        pt: 'Bar',
        en: 'Bar',
        es: 'Bar'
      },
      plural: {
        pt: 'Bares',
        en: 'Bars',
        es: 'Bares'
      }
    },
    {
      list: [],
      establishment_type: 'RESTAURANTE',
      length: 0,
      text: {
        pt: 'Restaurante',
        en: 'Restaurant',
        es: 'Restaurante'
      },
      plural: {
        pt: 'Restaurantes',
        en: 'Restaurants',
        es: 'Restaurantes'
      }
    },
    {
      list: [],
      establishment_type: 'PIZZARIA',
      length: 0,
      text: {
        pt: 'Pizzaria',
        en: 'Pizzeria',
        es: 'Pizzería'
      },
      plural: {
        pt: 'Pizzarias',
        en: 'Pizzerias',
        es: 'Pizzerías'
      }
    },
    {
      list: [],
      establishment_type: 'CAFETERIA',
      length: 0,
      text: {
        pt: 'Cafeteria',
        en: 'Cafeteria',
        es: 'Cafetería'
      },
      plural: {
        pt: 'Cafeterias',
        en: 'Cafeterias',
        es: 'Cafeterías'
      }
    }
  ]

  public today: string = moment().format('LL');

  @ViewChild('establishmentsSwiper')
  swiperRef: ElementRef | undefined;
  swiper?: Swiper;

  public adress: any = {
    pt: 'Rua Tolentino Filgueiras, Gonzaga.',
    en: 'Tolentino Filgueiras Street, Gonzaga.',
    es: 'Calle Tolentino Filgueiras, Gonzaga.'
  }

  @ViewChild('filterSelector') filterSelector: IonSelect;
  @ViewChild('homeContent') homeContent: IonContent;

  public selectedFilter: string;
  public activeFilter: any;

  public selectedOrderOption: string;

  public orderOptions: any[] = [
    {
      value: 'INC',
      text: {
        pt: 'Menor para o maior',
        en: 'From smallest to largest',
        es: 'De menor a mayor'
      }
    },
    {
      value: 'DEC',
      text: {
        pt: 'Maior para o menor',
        en: 'From largest to smallest',
        es: 'De mayor a menor'
      }
    }
  ]

  public definitiveView: string;
  public selectedView: string;
  public viewSegments: any[] = [
    {
      value: 'AS_SLIDE',
      text: {
        pt: 'slide',
        en: '',
        es: ''
      },
      icon: 'albums'
    },
    {
      value: 'AS_LIST',
      text: {
        pt: 'lista',
        en: '',
        es: ''
      },
      icon: 'list'
    }
  ]

  public orderButtons: any[] = [
    {
      value: 'as-asc-desc',
      text: {
        pt: 'Visualizar em forma de slide',
        en: '',
        es: ''
      },
      icon: 'swap-vertical'
    }
  ]

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

  public showSpecificList: boolean = false;

  public currentLanguage: ILang;
  public currentLanguage$: Observable<ILang>;
  public currentLanguageSubscription: Subscription;

  public short_establishments: IPlace[];
  public establishments$: Observable<IPlace[]>;
  public establishmentsSubscription: Subscription;

  public short_parkings: IParking[];
  public parkings$: Observable<IParking[]>;
  public parkingsSubscription: Subscription;

  public isLoadingLogo: boolean;

  constructor(
    private alertCtrl : AlertController,
    private title : Title,
    private navCtrl : NavController,
    private translate : TranslateService,
    private store : Store,
    private establishmentsService : EstablishmentsService,
    private utilsService : UtilsService,
    private popoverCtrl : PopoverController,
    private analyticsService : AnalyticsService,
    private parkingsService : ParkingsService
  ) { }

  ngOnInit() {
    this.initialOrdenation('INC');
    this.initialSegmentView('AS_SLIDE');
    this.initialFilter('ALL');
    this.defineActiveFilter('ALL');
    this.getCurrentLanguageFromNGRX();
    this.getEstablishments();
    this.getParkings();
    this.analyticsService.tagViewInit(AnalyticsEventnameEnum.PAGE_VIEW);
  }

  ngAfterViewInit(): void {
    this.swiper = this.swiperRef?.nativeElement.swiper;
  }

  ionViewDidEnter(): void {
    this.title.setTitle('Início')
  }

  public async orderBy(orderBy: string, fromAnotherPlace: boolean) {
    this.selectedOrderOption = orderBy;

    if (this.selectedOrderOption === 'INC') {
      this.short_establishments = await this.utilsService.orderByAdressNumberCrescent(this.short_establishments);
    } else {
      this.short_establishments = await this.utilsService.orderByAdressNumberDecrescent(this.short_establishments);
    }

    if (fromAnotherPlace) {
      this.slideSwiperToStart();
    } else {
      await this.popoverCtrl.dismiss({}, '', 'order-by').then(() => {
        this.slideSwiperToStart();
      })
    }

    return this.short_establishments

  }

  public initialOrdenation(value: string) {
    this.selectedOrderOption = value;
  }

  public initialSegmentView(value: string) {
    this.selectedView = value;
    this.definitiveView = this.selectedView;
  }

  public initialFilter(value: string) {
    this.selectedFilter = value;
  }

  public getEstablishments() {
    this.establishments$ = this.establishmentsService.getCollection(CollectionsEnum.SHORT_ESTABLISHMENTS);

    this.establishmentsSubscription = this.establishments$
    .pipe(
      map((establishments: IPlace[]) => {

        if (this.selectedOrderOption === 'INC') {
          this.utilsService.orderByAdressNumberCrescent(establishments);
        } else {
          this.utilsService.orderByAdressNumberDecrescent(establishments);
        }

        return establishments
      })
    )
    .subscribe((establishments: IPlace[]) => {
      this.short_establishments = establishments;
      this.lenghts_to_save_time = [...this.lenghts_to_save_time].map((option: any) => {
        let list = this.short_establishments.filter((establishment: IPlace) => {
          return establishment.mainType.value === option['establishment_type'];
        })

        option['list'] = list;
        option['length'] = list.length;

        return option;
      })

    })
  }

  public getParkings() {
    this.parkings$ = this.parkingsService.getCollection(CollectionsEnum.SHORT_PARKINGS);

    this.parkingsSubscription = this.parkings$
    .subscribe((parkings: IParking[]) => {
      this.short_parkings = parkings;
    })
  }

  public getCurrentLanguageFromNGRX(): void {
    this.currentLanguage$ = this.store.select(AppStore.selectAppCurrentLanguage);

    this.currentLanguageSubscription = this.currentLanguage$
    .subscribe((language: ILang) => {
      this.currentLanguage = language;
    })
  }

  public async chooseViewMode(value: string) {
    this.selectedView = value;
  }

  public async showAlertViewMode(): Promise<HTMLIonAlertElement> {
    const alert = await this.alertCtrl.create({
      mode: 'ios',
      cssClass: 'rgs-alert'
    })

    return alert
  }

  public async segmentViewChanged(value: string) {

    const alert = await this.showAlertViewMode();

    if (value === 'AS_SLIDE') {
      alert.subHeader = `${this.translate.instant('COMPONENTS.SEGMENT_VIEW.AS_SLIDE_TITLE')}`;
      alert.message = `${this.translate.instant('COMPONENTS.SEGMENT_VIEW.AS_SLIDE.0')} <b>${this.translate.instant('COMPONENTS.SEGMENT_VIEW.AS_SLIDE.1')}</b>`;
      alert.buttons = [
        {
          text: `${this.translate.instant('SHARED.CANCEL')}`,
          role: 'cancel',
          handler: () => {
            this.selectedView = 'AS_LIST'
          }
        },
        {
          text: `${this.translate.instant('SHARED.DEFINE')}`,
          role: 'confirm',
          handler: () => {
            this.definitiveView = this.selectedView;
          }
        },
      ]
    } else {
      alert.subHeader = `${this.translate.instant('COMPONENTS.SEGMENT_VIEW.AS_LIST_TITLE')}`;
      alert.message = `${this.translate.instant('COMPONENTS.SEGMENT_VIEW.AS_LIST.0')} <b>${this.translate.instant('COMPONENTS.SEGMENT_VIEW.AS_LIST.1')}</b>`;
      alert.buttons = [
        {
          text: `${this.translate.instant('SHARED.CANCEL')}`,
          role: 'cancel',
          handler: () => {
            this.selectedView = 'AS_SLIDE'
          }
        },
        {
          text: `${this.translate.instant('SHARED.DEFINE')}`,
          role: 'confirm',
          handler: () => {
            this.definitiveView = this.selectedView;
          }
        },
      ]
    }

    await alert.present();
  }

  public openFilterSelect(): void {
    this.filterSelector.open();
  }

  public helpUs(): void {
    this.navCtrl.navigateForward(['/ajude-nosso-projeto']);
  }

  public async scrollToTop() {
    this.homeContent.scrollToTop(600);
  }

  public seeEstablishment(establishment: IPlace, e: any): void {
    if (establishment.isBuilding) {
      e.preventDefault();
    } else {
      this.navCtrl.navigateForward(['/estabelecimento/' + establishment.value]);
      this.store.dispatch(AppStore.setCurrentEstablishment({ establishment: establishment } ))
    }
  }

  public seeEstablishmentFromModal(establishment: IPlace, e: any): void {
    if (establishment.isBuilding) {
      e.preventDefault();
    } else {
      this.showSpecificList = false;

      setTimeout(() => {
        this.navCtrl.navigateForward(['/estabelecimento/' + establishment.value]);
        this.store.dispatch(AppStore.setCurrentEstablishment({ establishment: establishment } ))
      }, 100);
    }
  }

  public slideSwiperToStart(): void {
    this.swiper?.slideTo(0, 800);
  }

  public swiperReachedEnd() {
    this.hideRightControl = true;
  }

  public swiperReachedBeginning() {
    this.hideLeftControl = true;
  }

  public slideToNext(): void {
    this.swiper?.slideNext(800);

    console.log('swiper');


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

  public imageHasLoaded() {
    this.isLoadingLogo = false;
  }

  public filterByCharacteristic(e: any): void {


    switch (e.detail.value) {
      case 'PET_FRIENDLY':
        this.establishmentsService
        .getCollectionFilteredBy(CollectionsEnum.SHORT_ESTABLISHMENTS, 'petfriendly_info.accept_petfriendly')
        .then( async (short_establishments: IPlace[]) => {
          this.short_establishments = short_establishments;
          this.short_establishments = await this.orderBy(this.selectedOrderOption, true);
        })
        break;

      case 'TICKET':
        this.establishmentsService
        .getCollectionFilteredBy(CollectionsEnum.SHORT_ESTABLISHMENTS, 'ticket_info.accept_ticket')
        .then( async (short_establishments: IPlace[]) => {
          this.short_establishments = short_establishments;
          this.short_establishments = await this.orderBy(this.selectedOrderOption, true);
        })
        break;

      case 'LIVEMUSIC':
        this.establishmentsService
        .getCollectionFilteredBy(CollectionsEnum.SHORT_ESTABLISHMENTS, 'livemusic_info.has_livemusic')
        .then( async (short_establishments: IPlace[]) => {
          this.short_establishments = short_establishments;
          this.short_establishments = await this.orderBy(this.selectedOrderOption, true);
        })
        break;

      case 'ALL':
        this.getEstablishments();
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

  public seeSpecficList(show: boolean, info: any): void {
    this.showSpecificList = show;
    this.selectedInfo = info;
  }

  public modalHasDismissed(e: any) {
    this.showSpecificList = false;
    this.selectedInfo = null;
  }

  public closeModal(): void {
    this.showSpecificList = false;
  }

  public callParking(parking: any, e: any) {
    if (parking.phone.ddd && parking.phone.number) {
      window.location.href = `tel:55${parking.phone.ddd}${parking.phone.number}`;
    } else {
      e.preventDefault();
    }
  }

  public ngOnDestroy(): void {
    this.currentLanguageSubscription.unsubscribe();
    this.establishmentsSubscription.unsubscribe();
    this.parkingsSubscription.unsubscribe();
  }

}
