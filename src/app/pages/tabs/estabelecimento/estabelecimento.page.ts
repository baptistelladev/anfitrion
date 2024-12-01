import { MOCK_PLACE_CITY_TYPE } from '../../../shared/mocks/MockPlaceCityType';
import { AfterContentInit, Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { AlertController, IonContent, NavController, Platform } from '@ionic/angular';
import { Clipboard } from '@angular/cdk/clipboard';
import * as moment from 'moment';
import { getElement } from 'ionicons/dist/types/stencil-public-runtime';
import { ISocialNetwork } from 'src/app/shared/models/INetwork';
import { Store } from '@ngrx/store';
import { IPlace } from 'src/app/shared/models/IPlace';
import { map, Observable, Subscription, take } from 'rxjs';
import * as AppStore from './../../../shared/store/app.state';
import { ILang } from 'src/app/shared/models/ILang';
import { ITime } from 'src/app/shared/models/ITime';
import { TranslateService } from '@ngx-translate/core';
import { Title } from '@angular/platform-browser';
import { IPhone } from 'src/app/shared/models/IPhone';
import { PhoneTypesEnum } from 'src/app/shared/enums/PhoneTypes';
import { NetworksEnum } from 'src/app/shared/enums/Networks';
import { PlaceTypeEnum } from 'src/app/shared/enums/PlaceType';
import { ActivatedRoute } from '@angular/router';
import { EstablishmentsService } from 'src/app/core/services/firebase/establishments.service';
import { CollectionsEnum } from 'src/app/shared/enums/Collection';
import { AnalyticsService } from 'src/app/core/services/firebase/analytics.service';
import { AnalyticsEventnameEnum } from 'src/app/shared/enums/Analytics';


@Component({
  selector: 'anfitrion-estabelecimento',
  templateUrl: './estabelecimento.page.html',
  styleUrls: ['./estabelecimento.page.scss'],
})
export class EstabelecimentoPage implements OnInit, OnDestroy {

  @ViewChild('establishmentContent') establishmentContent: IonContent;

  public showBackButton: boolean;

  public todayAsDayNumber: any = moment().day()

  public selectedOption: string;

  public initialMenuOffset: any;

  public establishment: IPlace;
  public establishment$: Observable<IPlace>;
  public establishmentSubscription: Subscription;

  public currentLanguage: ILang;
  public currentLanguage$: Observable<ILang>;
  public currentLanguageSubscription: Subscription;

  public translatedPage: any;
  public translatedPage$: Observable<any>;

  public PlaceTypeEnum = PlaceTypeEnum;

  public establishmentNameFromUrl: string | null;

  constructor(
    private navCtrl : NavController,
    private renderer : Renderer2,
    private clipboard: Clipboard,
    private alertCtrl : AlertController,
    public store : Store,
    private translate : TranslateService,
    private title : Title,
    private route: ActivatedRoute,
    private establishmentService : EstablishmentsService,
    private analyticsService : AnalyticsService,
    private platform : Platform
  ) { }

  async ngOnInit() {
    this.listenForUrl();
    this.getCurrentLanguageFromNGRX();
    this.selectOption('location');
    this.getCurrentEstablishment();
  }

  public ionViewWillEnter(): void {
    this.analyticsService.tagViewInit(AnalyticsEventnameEnum.PAGE_VIEW);
  }

  public listenForUrl(): void {
    this.route.paramMap
    .pipe(take(1))
    .subscribe(params => {
      this.establishmentNameFromUrl = params.get('name');
    });
  }

  public getCurrentLanguageFromNGRX(): void {
    this.currentLanguage$ = this.store.select(AppStore.selectAppCurrentLanguage);

    this.currentLanguageSubscription = this.currentLanguage$
    .subscribe((language: ILang) => {
      this.currentLanguage = language;
    })
  }

  public getCurrentEstablishment(): void {
    this.establishment$ = this.store.select(AppStore.selectCurrentEstablishment);

    this.establishmentSubscription = this.establishment$
    .pipe(map((establishment: IPlace) => {
      return {
        ...establishment,
        working_time: [...establishment.working_time].sort((a, b) => a.day_number - b.day_number)
      }
    }))
    .subscribe({
      next: (establishment: IPlace) => {
        if (establishment.value) {
          this.establishment = establishment;
          this.defineTitleFromPage(this.establishment.name);
          this.showBackButton = true;
        } else {
          // A STRING PRECISA EXISTIR, PARA DEPOIS SER PROCURADA COMO VALUE.
          if (this.establishmentNameFromUrl) {
            this.showBackButton = false;

            this.establishmentService
            .getDocumentByValue(CollectionsEnum.PLACES, 'value', this.establishmentNameFromUrl)
            .then((establishmentFromService: IPlace | null) => {
              if (establishmentFromService) {
                this.establishment = establishmentFromService;
                this.defineTitleFromPage(this.establishment.name);
              }
            })
            .catch((res) => {

            })
          }
        }
      }
    })
  }

  public defineTitleFromPage(establishment_name: string): void {
    this.title.setTitle(`${establishment_name} na Rua Gastronômica de Santos`);
  }


  public back(): void {
    this.navCtrl.back()
  }

  public async selectOption(option: string) {
    this.selectedOption = option;
  }

  public async goWithWaze() {
    let hasCopy = this.clipboard.copy(`${this.establishment.adress.street}, ${this.establishment.adress.number} - ${this.establishment.adress.neighborhood}`);

    if (hasCopy) {
      await this.showAlert(`${this.translate.instant('SHARED.PRIVATE_APP')}`);
    }
  }

  public async showAlert(message: string): Promise<HTMLIonAlertElement> {
    const alert = await this.alertCtrl.create({
      mode: 'ios',
      subHeader: `${this.translate.instant('SHARED.COPIED_ADRESS')}`,
      message: message,
      cssClass: 'anfitrion-alert',
      buttons: [
        {
          role: 'cancel',
          text: `${this.translate.instant('SHARED.UNDERSTOOD')}`
        },
      ]
    });

    alert.present();

    return alert
  }

  public hideToolbar(e: any): void {
    let header: ElementRef | HTMLElement | null = document.getElementById('estabelecimento-header');

    if (e.detail.scrollTop > 60) {
      this.renderer.addClass(header, 'hide');
    } else {
      this.renderer.removeClass(header, 'hide');
    }
  }

  public async scrollToTop() {
    this.establishmentContent.scrollToTop(600);
  }

  public async redirectToWhatsapp(): Promise<HTMLIonAlertElement> {
    const alert = await this.alertCtrl.create({
      mode: 'ios',
      cssClass: 'anfitrion-alert',
      subHeader: 'WhatsApp',
      message: `${this.translate.instant('SHARED.I_WILL_REDIRECT_YOU')} <b>${this.establishment.name}${this.currentLanguage.value === 'en' ? "'s WhatsApp," : ","}</b> ${this.translate.instant('SHARED.OK_QUESTION')}`,
      buttons: [
        {
          role: 'cancel',
          text: `${this.translate.instant('SHARED.CANCEL')}`,
          handler: () => {

          }
        },
        {
          role: 'confirm',
          text: `${this.translate.instant('SHARED.GO_TO_WHATS')}`,
          handler: () => {
            this.goToWhatsApp();
          }
        }
      ]
    })

    await alert.present();

    return alert;
  }

  /**
   * @description Abrir WhatsApp com mensagem.
   */
  public goToWhatsApp(): void {
    let whats: undefined | IPhone = this.establishment.phones.find(phone => phone.type === PhoneTypesEnum.WHATSAPP);
    let mensagem: string = this.translate.instant('MESSAGES.WELCOME_WHATSAPP');
    let mensagemCodificada = encodeURIComponent(mensagem);

    if (this.platform.is('desktop')) {
      this.openExternalUrl(`https://wa.me/55${whats?.ddd}${whats?.number}?text=${mensagemCodificada}`, '_blank');
    }

    if (this.platform.is('mobileweb') || this.platform.is('mobile')) {
      this.openExternalUrl(`https://wa.me/55${whats?.ddd}${whats?.number}?text=${mensagemCodificada}`, '_self');
    }
  }

  public goToInsta(): void {
    let insta: undefined | ISocialNetwork = this.establishment.networks.find(network => network.value === NetworksEnum.INSTAGRAM);
    if (insta) {
      this.navToAppOrSite(insta);
    }
  }

  public openExternalUrl(url: string, target: string = '_system'): void {
    if (typeof window !== 'undefined') {
      window.open(url, target);
    }
  }

  public navToAppOrSite(socialNetwork: ISocialNetwork): void {
    if (this.platform.is('desktop')) {
      this.openExternalUrl(socialNetwork.baseUrl + (socialNetwork.value === NetworksEnum.YOUTUBE || socialNetwork.value === NetworksEnum.TIKTOK ? '@' : '') + socialNetwork.user, '_blank');
    }

    if (this.platform.is('mobileweb') || this.platform.is('mobile')) {
      this.openExternalUrl(socialNetwork.baseUrl + (socialNetwork.value === NetworksEnum.YOUTUBE || socialNetwork.value === NetworksEnum.TIKTOK ? '@' : '') + socialNetwork.user, '_self');
    }
  }

  public async redirectToInstagram(): Promise<HTMLIonAlertElement> {
    const alert = await this.alertCtrl.create({
      cssClass: 'anfitrion-alert',
      mode: 'ios',
      subHeader: 'Instagram',
      message: `${this.translate.instant('SHARED.I_WILL_REDIRECT_YOU_INSTAGRAM')} <b>${this.establishment.name}${this.currentLanguage.value === 'en' ? "'s Instagram," : ","}</b> ${this.translate.instant('SHARED.OK_QUESTION')}`,
      buttons: [
        {
          text: `${this.translate.instant('SHARED.CANCEL')}`,
          role: '',
          handler: () => {

          }
        },
        {
          text: `${this.translate.instant('SHARED.GO_TO_INSTA')}`,
          role: 'confirm',
          handler: async () => {
            await alert.dismiss().then(() => {
              this.goToInsta();
            })
          }
        }
      ]
    })

    await alert.present();

    return alert;
  }

  public async itIsntPremium(): Promise<HTMLIonAlertElement | undefined> {
    if (!this.establishment.isPremium) {
      const alert = await this.alertCtrl.create({
        cssClass: 'anfitrion-alert',
        mode: 'ios',
        message: `<b>${this.establishment.name}</b> ${this.translate.instant('SHARED.IS_NOT_PREMIUM')}`,
        buttons: [
          {
            text: `${this.translate.instant('SHARED.UNDERSTOOD')}`,
            role: '',
            handler: () => {

            }
          },
        ]
      })

      await alert.present();

      return alert;
    } else {
      return undefined
    }
  }

  ngOnDestroy(): void {
    this.establishmentSubscription.unsubscribe();
  }
}
