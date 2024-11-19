import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { map, Observable, Subscription } from 'rxjs';
import { ILang } from 'src/app/shared/models/ILang';
import * as AppStore from './../../../shared/store/app.state';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IUSer } from 'src/app/shared/models/IUser';
import * as UserStore from './../../../shared/store/user.state';
import { Title } from '@angular/platform-browser';
import { UtilsService } from 'src/app/core/services/utils.service';
import * as moment from 'moment';
import { UsersService } from 'src/app/core/services/firebase/users.service';
import { AuthService } from 'src/app/core/services/firebase/auth.service';
import { OverlayService } from 'src/app/shared/services/overlay.service';
import { Auth } from '@angular/fire/auth';

@Component({
  selector: 'anfitrion-sua-conta',
  templateUrl: './sua-conta.page.html',
  styleUrls: ['./sua-conta.page.scss'],
})
export class SuaContaPage implements OnInit, OnDestroy {
  public inputErrors: any = {
    invalidCredentials: {
      show: false,
      text: {
        pt: 'Senha inválida, tente novamente',
        en: 'Invalid password, try again',
        es: 'Contraseña incorrecta, inténtalo de nuevo'
      }
    },
    invalidNewEmail: {
      show: false,
      text: {
        pt: 'Não é um e-mail válido',
        en: 'This is not a valid email',
        es: 'No es un correo electrónico válido'
      }
    }
  }

  public sentEmailChangeNotification: boolean = false;
  public newEmailWeSentNotification: string;

  public changingEmail: boolean = false;

  public passwordMatch: {text: any} = {
    text: {
      pt: 'senhas coincidem',
      en: 'passwords match',
      es: 'las contraseñas coinciden'
    }
  }

  public passwordIsValid: boolean = false;
  public passwordRules: any[];
  public passwordsMatch: boolean = false;

  public showPassword: boolean = false;
  public showConfirmPassword: boolean = false;
  public showPasswordFromNewPassword: boolean = false;

  public showNewEmailModal: boolean = false;
  public showNewPasswordModal: boolean = false;

  public emailFieldIsDisabled: boolean = true;

  public currentLanguage: ILang;
  public currentLanguage$: Observable<ILang>;
  public currentLanguageSubscription: Subscription;

  public user: IUSer;
  public user$: Observable<IUSer>;
  public userSubscription: Subscription;

  public accountForm: FormGroup;

  public newEmailFormGroup: FormGroup;
  public newPasswordFormGroup: FormGroup;

  constructor(
    private navCtrl : NavController,
    private store : Store,
    private formBuilder : FormBuilder,
    private title : Title,
    private utilsService : UtilsService,
    private userService : UsersService,
    private authService : AuthService,
    private overlayService : OverlayService,
    private auth: Auth
  ) { }

  ngOnInit() {
    this.getPasswordRules();
    this.getUserFromNGRX();
    this.getCurrentLanguageFromNGRX();
    this.initAccountForm();
    this.fillAccountForm();

    this.initNewEmailForm();
    this.initNewPasswordForm();
  }

  ionViewWillEnter(): void {
    this.title.setTitle('Sua conta');
  }

  public initNewEmailForm(): void {
    this.newEmailFormGroup = this.formBuilder.group({
      newEmail: [ '',  [ Validators.required, Validators.email ] ],
      currentPassword: [ '', [ Validators.required, Validators.minLength(8) ] ]
    })
  }

  public initNewPasswordForm(): void {
    this.newPasswordFormGroup = this.formBuilder.group({
      password: [ '', [ Validators.required, Validators.minLength(8) ] ],
      confirmPassword: [ '', [ Validators.required, Validators.minLength(8) ] ]
    })
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

  public initAccountForm(): void {
    this.accountForm = this.formBuilder.group({
      email: null,
      fakePassword: '********'
    })
  }

  public fillAccountForm(): void {
    this.accountForm.patchValue({
      email: this.user.email
    })
  }

  public getUserFromNGRX(): void {
    this.user$ = this.store.select(UserStore.selectUser);

    this.userSubscription = this.user$
    .pipe(map((user: IUSer) => {

      return {
        ...user,
        createdAt: moment(user.createdAt).format('LL')
      }
    }))
    .subscribe((user: IUSer) => {
      this.user = user;
    })
  }

  public preventWhitespace(event: KeyboardEvent) {
    if (event.key === ' ') {
      event.preventDefault();
    }
  }

  public async toggleNewEmailModal(show: boolean) {
    this.showNewEmailModal = show;

    if (!show && !this.sentEmailChangeNotification) {
      this.clearNewEmailForm();
      this.clearErrorsIfExists('invalid-credentials');
      this.clearErrorsIfExists('invalid-new-email');
    } else if (!show && this.sentEmailChangeNotification) {
      await this.authService.logout()
      .then(() => {
        this.navCtrl.navigateRoot(['/login'])
      })
    }
  }

  public toggleNewPasswordModal(show: boolean): void {
    this.showNewPasswordModal = show;

    if (!show) {
      this.clearNewPasswordForm()
    }
  }

  public togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  public togglePasswordFromNewPassword(): void {
    this.showPasswordFromNewPassword = !this.showPasswordFromNewPassword;
  }

  public toggleConfirmPassword(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  public checkPasswordRules(): void {
    let senha: string = this.newPasswordFormGroup.get('password')?.value;
    this.utilsService.checkPasswordRules(senha);
    this.passwordIsValid = this.passwordRules.every((rule) => rule.valid === true);

    this.checkPasswordsMatch();
  }

  public checkPasswordsMatch(): boolean {
    this.passwordsMatch = this.newPasswordFormGroup.value.password === this.newPasswordFormGroup.value.confirmPassword;

    if (this.newPasswordFormGroup.value.password === '' && this.newPasswordFormGroup.value.confirmPassword === '') {
      this.passwordsMatch = false
    }

    return this.passwordsMatch
  }

  public justLowercase(form: FormGroup, field: string): void {
    let value: string = form.value[field].toLowerCase();
    form.patchValue({ [field]: value });
  }

  /**
   * @description Obtém as regras de senha.
   */
  public getPasswordRules(): void {
    this.passwordRules = this.utilsService.getPasswordRules();
  }

  public clearNewPasswordForm(): void {
    this.newPasswordFormGroup.reset();
  }

  public clearNewEmailForm(): void {
    this.newEmailFormGroup.reset();
  }

  public async updateEmail() {
    this.changingEmail = true;

    await this.userService.updateUserEmail(this.newEmailFormGroup.value.newEmail, this.newEmailFormGroup.value.currentPassword, this.user.uid ? this.user.uid : '')
    .then((res) => {
      this.newEmailWeSentNotification = this.newEmailFormGroup.value.newEmail;
      this.changingEmail = false;
      this.sentEmailChangeNotification = true;
      this.newEmailFormGroup.reset();

    }).catch((error) => {
      this.changingEmail = false;
      this.sentEmailChangeNotification = false;
      this.newEmailWeSentNotification = '';

      switch (error.code) {
        case 'auth/invalid-credential':
        this.inputErrors.invalidCredentials.show = true;
          break;

        case 'auth/invalid-new-email':
        this.inputErrors.invalidNewEmail.show = true;
          break;

        default:
          break;
      }
    })
  }

  public clearErrorsIfExists(error: string): void {
    if (error === 'invalid-credentials' && this.inputErrors.invalidCredentials.show) {
      this.inputErrors.invalidCredentials.show = false;
    }
  }

  public async recover() {
    const alert = await this.overlayService.fireAlert({
      backdropDismiss: false,
      cssClass: 'anf-alert',
      mode: 'ios',
      subHeader: 'E-mail enviado',
      message: `Enviamos um link de redefinição para <b>${this.accountForm.value.email}</b>.`,
      buttons: [
        {
          text: 'Entendi',
          role: 'confirm',
          handler: async () => {
            alert.dismiss();
          }
        }
      ]
    })

    await this.authService.recoverPassword(this.accountForm.value.email)
    .then(async () => {
      await alert.present();
    }).catch((error) => {
      console.log(error);
    })
  }

  public ngOnDestroy(): void {
    this.currentLanguageSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }

}
