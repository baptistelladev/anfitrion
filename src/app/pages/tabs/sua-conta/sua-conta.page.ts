import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { ILang } from 'src/app/shared/models/ILang';
import * as AppStore from './../../../shared/store/app.state';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IUSer } from 'src/app/shared/models/IUser';
import * as UserStore from './../../../shared/store/user.state';
import { Title } from '@angular/platform-browser';
import { UtilsService } from 'src/app/core/services/utils.service';

@Component({
  selector: 'anfitrion-sua-conta',
  templateUrl: './sua-conta.page.html',
  styleUrls: ['./sua-conta.page.scss'],
})
export class SuaContaPage implements OnInit, OnDestroy {

  public passwordIsValid: boolean = false;
  public passwordRules: any[];
  public passwordsMatch: boolean = false;

  public showPassword: boolean = false;
  public showConfirmPassword: boolean = false;

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
    private utilsService : UtilsService
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

  ionViewdidEnter(): void {
    this.title.setTitle('Sua conta');
  }

  public initNewEmailForm(): void {
    this.newEmailFormGroup = this.formBuilder.group({
      newEmail: [null, [ Validators.required ]]
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
    .subscribe((user: IUSer) => {
      this.user = user;
      console.log(this.user);
    })
  }

  public preventWhitespace(event: KeyboardEvent) {
    if (event.key === ' ') {
      event.preventDefault();
    }
  }

  public toggleNewEmailModal(show: boolean): void {
    this.showNewEmailModal = show;
  }

  public toggleNewPasswordModal(show: boolean): void {
    this.showNewPasswordModal = show;
  }

  public togglePassword(): void {
    this.showPassword = !this.showPassword;
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
    this.passwordsMatch = this.newPasswordFormGroup.value.password === this.newPasswordFormGroup.value.confirmPassword
    return this.passwordsMatch
  }

  /**
   * @description Obtém as regras de senha.
   */
  public getPasswordRules(): void {
    this.passwordRules = this.utilsService.getPasswordRules();
  }

  public ngOnDestroy(): void {
    this.currentLanguageSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }

}
