import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Observable, Subscription } from 'rxjs';
import { ILang } from 'src/app/shared/models/Lang';
import * as AppStore from './../../shared/store/app.state';
import { Store } from '@ngrx/store';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/firebase/auth.service';

@Component({
  selector: 'rgs-esqueci-minha-senha',
  templateUrl: './esqueci-minha-senha.page.html',
  styleUrls: ['./esqueci-minha-senha.page.scss'],
})
export class EsqueciMinhaSenhaPage implements OnInit {

  public currentLanguage: ILang;
  public currentLanguage$: Observable<ILang>;
  public currentLanguageSubscription: Subscription;

  public formForgotPassword: FormGroup;

  public isRecovering: boolean;

  constructor(
    private navCtrl : NavController,
    private store : Store,
    private formBuilder : FormBuilder,
    private authService : AuthService
  ) { }

  ngOnInit() {
    this.getCurrentLanguageFromNGRX();
    this.initFormForgotPassword();
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

    await this.authService.recoverPassword(this.formForgotPassword.value.email)
    .then(() => {
      this.isRecovering = false;
    }).catch((error) => {
      console.log(error);
      this.isRecovering = false;
    })
  }

}
