import { Component, OnDestroy, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { Observable, Subscription, take } from 'rxjs';
import { ILang } from 'src/app/shared/models/ILang';
import * as AppStore from './../../../shared/store/app.state';
import { TranslateService } from '@ngx-translate/core';
import { IContact } from 'src/app/shared/models/IContact';
import { Title } from '@angular/platform-browser';
import { AnalyticsService } from 'src/app/core/services/firebase/analytics.service';
import { AnalyticsEventnameEnum } from 'src/app/shared/enums/Analytics';


@Component({
  selector: 'rgs-contato',
  templateUrl: './contato.page.html',
  styleUrls: ['./contato.page.scss'],
})
export class ContatoPage implements OnInit, OnDestroy {

  public currentLanguage: ILang;
  public currentLanguage$: Observable<ILang>;
  public currentLanguageSubscription: Subscription;

  public appInfoContact: IContact;
  public appInfoContact$: Observable<IContact>;

  public selectedSegment: string;

  public segments: any[] = [
    {
      value: 'comercial'
    },
    {
      value: 'others'
    }
  ]

  constructor(
    private navCtrl : NavController,
    private alertCtrl : AlertController,
    private store : Store,
    private translate : TranslateService,
    private title : Title,
    private analyticsService : AnalyticsService
  ) { }

  ngOnInit() {
    this.setInitialSegment('comercial');
    this.getCurrentLanguageFromNGRX();
    this.getContactInfoFromNGRX();
    this.analyticsService.tagViewInit(AnalyticsEventnameEnum.PAGE_VIEW);
  }

  ionViewDidEnter(): void {
    this.title.setTitle('Contato');
  }

  public getCurrentLanguageFromNGRX(): void {
    this.currentLanguage$ = this.store.select(AppStore.selectAppCurrentLanguage);

    this.currentLanguageSubscription = this.currentLanguage$
    .subscribe((language: ILang) => {
      this.currentLanguage = language;
    })
  }

  public getContactInfoFromNGRX(): void {
    this.appInfoContact$ = this.store.select(AppStore.selectAppInfoContact);

    this.appInfoContact$
    .pipe(take(2))
    .subscribe((contact: IContact) => {
      this.appInfoContact = contact;
    })
  }

  public back(): void {
    this.navCtrl.back()
  }

  public segmentChanged(ev: any, selectedSegment: any): void {
    console.log(ev, selectedSegment);
  }

  public setInitialSegment(valorDoSegmento: string): void {
    this.selectedSegment = valorDoSegmento;
  }

  public async showActionAlert(tipo: 'whatsapp' | 'email'): Promise<HTMLIonAlertElement> {
    const alert = await this.alertCtrl.create({
      cssClass: 'rgs-alert',
      mode: 'ios',
      subHeader: `${tipo === 'whatsapp' ? 'WhatsApp' : 'E-mail'}`,
      message: `
        ${
          tipo === 'whatsapp' ?
          `${this.translate.instant('CONTACT_PAGE.DIRECT_TO_WHATS')}` :
          `${this.translate.instant('CONTACT_PAGE.DIRECT_TO_DEFAULT_EMAIL')}`
        }
      `,
      buttons: [
        {
          role: 'cancel',
          text: `${this.translate.instant('SHARED.CANCEL')}`,
        },
        {
          role: 'confirm',
          text: `${this.translate.instant('SHARED.ALRIGHT')}`,
          handler: () => {
            if (tipo === 'whatsapp') {
              this.openWhatsApp();
            } else {
              this.openEmailApp();
            }
          }
        }
      ]
    })

    await alert.present()
    return alert
  }

  /**
   * @description Abrir WhatsApp com mensagem.
   */
  public openWhatsApp(): void {
    let mensagem: string = this.translate.instant('MESSAGES.WELCOME_WHATSAPP');
    let mensagemCodificada = encodeURIComponent(mensagem);
    window.open(`https://wa.me/55${this.appInfoContact.phone.ddd}${this.appInfoContact.phone.number}?text=${mensagemCodificada}`, '_self');
  }

  /**
   * @description Abrir o app padrão de e-mail do usuário.
   */
  public openEmailApp(): void {
    window.location.href = `mailto:${this.appInfoContact.email.value}`;
  }

  public ngOnDestroy(): void {
    this.currentLanguageSubscription.unsubscribe();
  }

}
