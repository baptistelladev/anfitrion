import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { applyActionCode } from 'firebase/auth';
import { Observable, Subscription } from 'rxjs';
import { UtilsService } from 'src/app/core/services/utils.service';
import { ModeEnum } from 'src/app/shared/enums/Mode';
import { ILang } from 'src/app/shared/models/ILang';
import * as AppStore from './../../shared/store/app.state';
import { UsersService } from 'src/app/core/services/firebase/users.service';
import { AuthService } from 'src/app/core/services/firebase/auth.service';
import { OverlayService } from 'src/app/shared/services/overlay.service';

@Component({
  selector: 'anfitrion-acoes',
  templateUrl: './acoes.page.html',
  styleUrls: ['./acoes.page.scss'],
})
export class AcoesPage implements OnInit {

  public inputErrors: any = {
    invalidCredentials: {
      show: false,
      text: {
        pt: 'Senha inválida, tente novamente',
        en: 'Invalid password, try again',
        es: 'Contraseña incorrecta, inténtalo de nuevo'
      }
    }
  }

  public isUpdatingPassword: boolean = false;

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

  public emailIsVerified: boolean = false;
  public emailAndChangeHasVerified: boolean = false;
  public passwordIsVerified: boolean = false;

  public showResetPassword: boolean = false;

  public newPasswordFormGroup: FormGroup;

  public currentLanguage: ILang;
  public currentLanguage$: Observable<ILang>;
  public currentLanguageSubscription: Subscription;

  public oobCode: string| null;
  public mode: string | null;

  constructor(
    private route: ActivatedRoute,
    private auth : Auth,
    private formBuilder : FormBuilder,
    private utilsService : UtilsService,
    private store : Store,
    private authService : AuthService,
    private overlayService : OverlayService
  ) { }

  async ngOnInit() {
    this.getCurrentLanguageFromNGRX();
    this.getPasswordRules();

    const toastError = await this.overlayService.fireToast({
      position: 'top',
      cssClass: 'anf-toast anf-toast-danger',
      icon: 'warning-outline',
      duration: 2000
    })

    // Obtém o parâmetro 'oobCode' da URL
    this.oobCode = this.route.snapshot.queryParamMap.get('oobCode');
    this.mode = this.route.snapshot.queryParamMap.get('mode');

    if (this.mode === ModeEnum.RESET_PASSWORD) {
      this.showResetPassword = true;
      this.initNewPasswordForm();
    } else {
      this.showResetPassword = false;

      if (this.oobCode) {
        applyActionCode(this.auth, this.oobCode)
        .then(() => {
          switch (this.mode) {
            case ModeEnum.VERIFY_AND_CHANGE_EMAIL:
              this.emailAndChangeHasVerified = true;
              break;

            case ModeEnum.VERIFY_EMAIL:
              this.emailIsVerified = true;
              break;

            case ModeEnum.RESET_PASSWORD:
              break;
          }
        })
        .catch(async (error) => {
          toastError.message = `Algo deu errado`;
          await toastError.present();
        });
      }
    }
  }

  public getCurrentLanguageFromNGRX(): void {
    this.currentLanguage$ = this.store.select(AppStore.selectAppCurrentLanguage);

    this.currentLanguageSubscription = this.currentLanguage$
    .subscribe((language: ILang) => {
      this.currentLanguage = language;
    })
  }

  public checkPasswordsMatch(): boolean {
    this.passwordsMatch = this.newPasswordFormGroup.value.password === this.newPasswordFormGroup.value.confirmPassword;

    if (this.newPasswordFormGroup.value.password === '' && this.newPasswordFormGroup.value.confirmPassword === '') {
      this.passwordsMatch = false
    }

    return this.passwordsMatch
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

  public initNewPasswordForm(): void {
    this.newPasswordFormGroup = this.formBuilder.group({
      password: [ '', [ Validators.required, Validators.minLength(8) ] ],
      confirmPassword: [ '', [ Validators.required, Validators.minLength(8) ] ]
    })
  }

  public preventWhitespace(event: KeyboardEvent) {
    if (event.key === ' ') {
      event.preventDefault();
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

  public async updateUserPassword() {
    this.isUpdatingPassword = true;

    const toastError = await this.overlayService.fireToast({
      position: 'top',
      cssClass: 'anf-toast anf-toast-danger',
      icon: 'warning-outline',
      duration: 2000
    })

    const alert = await this.overlayService.fireAlert({
      backdropDismiss: false,
      cssClass: 'anf-alert',
      mode: 'ios',
      subHeader: 'Senha alterada',
      message: 'Seu login no app ou no site será feito com a senha nova a partir de agora',
      buttons: [
        {
          text: 'Entendi',
          role: 'confirm',
          handler: async () => {
            await alert.dismiss();
          }
        }
      ]
    })

    if (this.oobCode) {
      this.authService.confirmNewPassword(this.oobCode,this.newPasswordFormGroup.value.password).then(async () => {
        await alert.present();

        await alert.onDidDismiss().then(() => {
          this.isUpdatingPassword = false;
          this.newPasswordFormGroup.reset();
        })
      })
      .catch(async () => {
        this.isUpdatingPassword = false;
        toastError.message = `Algo deu errado`;
        await toastError.present();
      })
    }
  }

}
