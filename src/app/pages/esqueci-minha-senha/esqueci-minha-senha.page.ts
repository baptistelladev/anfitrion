import { BackButtonService } from './../../core/core/back-button.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { Observable, Subscription, take } from 'rxjs';
import { ILang } from 'src/app/shared/models/ILang';
import * as AppStore from './../../shared/store/app.state';
import { Store } from '@ngrx/store';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/firebase/auth.service';
import { OverlayService } from 'src/app/shared/services/overlay.service';
import { TranslateService } from '@ngx-translate/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'anfitrion-esqueci-minha-senha',
  templateUrl: './esqueci-minha-senha.page.html',
  styleUrls: ['./esqueci-minha-senha.page.scss'],
})
export class EsqueciMinhaSenhaPage implements OnInit, OnDestroy {

  public currentLanguage: ILang;
  public currentLanguage$: Observable<ILang>;
  public currentLanguageSubscription: Subscription;

  public formForgotPassword: FormGroup;

  public isRecovering: boolean;

  constructor(
    private navCtrl : NavController,
    private store : Store,
    private formBuilder : FormBuilder,
    private authService : AuthService,
    private overlayService : OverlayService,
    private title : Title,
    private backButtonService : BackButtonService
  ) { }

  ngOnInit() {
    this.getCurrentLanguageFromNGRX();
    this.initFormForgotPassword();
  }

  ionViewWillEnter(): void {
    this.title.setTitle('Esquec minha senha');
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

  public initFormForgotPassword(): void {
    this.formForgotPassword = this.formBuilder.group({
      email: ['', [ Validators.required, Validators.email ] ]
    })
  }

  public async recover() {
    this.isRecovering = true;

    const alert = await this.overlayService.fireAlert({
      backdropDismiss: false,
      cssClass: 'anf-alert',
      mode: 'ios',
      subHeader: 'E-mail enviado',
      message: `Enviamos um link de redefinição para <b>${this.formForgotPassword.value.email}</b>.`,
      buttons: [
        {
          text: 'Entendi',
          role: 'confirm',
          handler: async () => {
            this.isRecovering = false;
            this.formForgotPassword.reset();
            this.back();
          }
        }
      ]
    })

    await this.authService.recoverPassword(this.formForgotPassword.value.email)
    .then(async () => {
      await alert.present();
    }).catch((error) => {
      this.isRecovering = false;
    })
  }

  public ngOnDestroy(): void {
    this.currentLanguageSubscription.unsubscribe();
  }

}
