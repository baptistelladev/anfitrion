import { BackButtonService } from './../../core/core/back-button.service';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription, take } from 'rxjs';
import { ILang } from 'src/app/shared/models/ILang';
import * as AppStore from './../../shared/store/app.state';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swiper from 'swiper';
import { IonInput, NavController } from '@ionic/angular';
import { AuthService } from 'src/app/core/services/firebase/auth.service';
import { OverlayService } from 'src/app/shared/services/overlay.service';
import { UtilsService } from 'src/app/core/services/utils.service';
import { TranslateService } from '@ngx-translate/core';
import { QuemSomosPage } from '../quem-somos/quem-somos.page';
import { Title } from '@angular/platform-browser';
import { IUSer } from 'src/app/shared/models/IUser';
import { AnimationOptions } from 'ngx-lottie';
import { AnimationItem } from 'lottie-web';
import { PDFProgressData } from 'ng2-pdf-viewer';
import { StorageService } from 'src/app/core/services/storage.service';
import { ACCEPTED_TERMS_AND_CONDITIONS } from 'src/app/shared/consts/keys';
import { AnalyticsService } from 'src/app/core/services/firebase/analytics.service';
import { AnalyticsEventnameEnum } from 'src/app/shared/enums/Analytics';

@Component({
  selector: 'anfitrion-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('passwordInput') passwordInput : IonInput;
  @ViewChild('emailInput') emailInput : IonInput;

  public showTermsAndConditionsModal: boolean = false;

  @ViewChild('loginSwiper')
  swiperRef: ElementRef | undefined;
  swiper?: Swiper;

  public options: AnimationOptions = {
    path: './../../../assets/movie/anfitrion-around-the-world.json',
    autoplay: true,
    loop: true
  };

  public inputErrors: any = {
    emailAlreadyInUse: {
      show: false,
      text: null
    }
  }

  public passwordMatch: {text: any} = {
    text: {
      pt: 'senhas coincidem',
      en: 'passwords match',
      es: 'las contraseñas coinciden'
    }
  }

  public passwordRules: any[];
  public passwordIsValid: boolean = false;
  public passwordsMatch: boolean = false;

  public showLoginPassword: boolean = false;
  public showCreatePassword: boolean = false;
  public showCreateConfirmPassword: boolean = false;

  public isDoingLogin: boolean = false;
  public isCreating: boolean = false;

  public formLoginGroup: FormGroup;
  public formCreateAccGroup: FormGroup;

  public segments: any[] = [{ value: 'ACCESS' },{ value: 'CREATE' }];
  public selectedSegment: string = 'ACCESS';

  public currentLanguage: ILang;
  public currentLanguage$: Observable<ILang>;
  public currentLanguageSubscription: Subscription;

  constructor(
    private store : Store,
    private formBuilder : FormBuilder,
    private navCtrl : NavController,
    private authService : AuthService,
    private overlayService : OverlayService,
    private utilsService : UtilsService,
    private translate : TranslateService,
    private title : Title,
    private backButtonService : BackButtonService,
    private storageService : StorageService,
    private analyticsService : AnalyticsService
  ) { }

  public async ngOnInit() {
    this.getCurrentLanguageFromNGRX();
    this.initLoginForm();
    this.initCreateAccForm();
    this.getPasswordRules();

    await this.storageService.getStorageKey(ACCEPTED_TERMS_AND_CONDITIONS).then(async (accepted: boolean) => {
      if (!accepted) {
        await this.alertCookies()
      }
    })
  }

  public ngAfterViewInit(): void {
    this.swiper = this.swiperRef?.nativeElement.swiper;
  }

  public ionViewWillEnter(): void {
    this.title.setTitle('Login');
    this.analyticsService.tagViewInit(AnalyticsEventnameEnum.PAGE_VIEW);
  }

  public async alertCookies() {
    const alert = await this.overlayService.fireAlert({
      mode: 'ios',
      cssClass: 'anf-alert',
      subHeader: this.translate.instant('LOGIN_PAGE.TERMS_AND_CONDITIONS_MODAL.TITLE'),
      message: this.translate.instant('LOGIN_PAGE.TERMS_AND_CONDITIONS_MODAL.DESCRIPTION'),
      keyboardClose: false,
      buttons: [
        {
          role: 'cancel',
          text: this.translate.instant('LOGIN_PAGE.TERMS_AND_CONDITIONS_MODAL.OK_BUTTON'),
          handler: async () => {
            await alert.dismiss();
            await this.storageService.setStorageKey(ACCEPTED_TERMS_AND_CONDITIONS, true);
          }
        },
        {
          role: 'confirm',
          text: this.translate.instant('LOGIN_PAGE.TERMS_AND_CONDITIONS_MODAL.READ_TERMS_BUTTON'),
          handler: async () => {
            await alert.dismiss().then(async () => {
              this.toggleTermsAndConditionsModal(true);
              await this.storageService.setStorageKey(ACCEPTED_TERMS_AND_CONDITIONS, true);
            })
          }
        }
      ]
    })

    await alert.present()
  }

  public animationCreated(animationItem: AnimationItem): void {
    animationItem.setSpeed(0.8)
  }

  public getPasswordRules(): void {
    this.passwordRules = this.utilsService.getPasswordRules();
  }

  public getCurrentLanguageFromNGRX(): void {
    this.currentLanguage$ = this.store.select(AppStore.selectAppCurrentLanguage);

    this.currentLanguageSubscription = this.currentLanguage$
    .subscribe((language: ILang) => {
      this.currentLanguage = language;
    })
  }

  public initLoginForm(): void {
    this.formLoginGroup = this.formBuilder.group({
      email: [ '', [ Validators.required, Validators.email ] ],
      password: [ '', [ Validators.required ] ]
    })
  }

  public async login() {
    this.isDoingLogin = true;

    const toastError = await this.overlayService.fireToast({
      position: 'top',
      cssClass: 'anf-toast anf-toast-danger',
      icon: 'warning-outline',
      duration: 2000
    })

    const toastSuccess = await this.overlayService.fireToast({
      position: 'top',
      cssClass: 'anf-toast anf-toast-success',
      icon: 'finger-print-outline',
      duration: 3000
    })

    await this.authService.signInWithEmailAndPassword(this.formLoginGroup.value.email, this.formLoginGroup.value.password)
    .then( async (user: any) => {

      const passwordInput = this.passwordInput.getInputElement();
      passwordInput.then((input) => input.blur());

      const emailInput = this.emailInput.getInputElement();
      emailInput.then((input) => input.blur());

      if (user.emailVerified) {
        toastSuccess.message = `${this.translate.instant('LOGIN_PAGE.ACC_IDENTIFIED')}`;
        await toastSuccess.present();

        await toastSuccess.onDidDismiss()
        .then(() => {
          this.formLoginGroup.reset();
          this.isDoingLogin = false;
          this.navCtrl.navigateForward(['/logado/bem-vindo-a-baixada-santista']);
        })
      } else {
        toastError.message = `${this.translate.instant('LOGIN_PAGE.EMAIL_VERIFICATION')}`;
        await toastError.present();
        this.isDoingLogin = false;
      }
    })
    .catch(async (error) => {
      this.isDoingLogin = false;
      //this.formLoginGroup.reset();
      toastError.message = error.text[this.currentLanguage.value];
      await toastError.present();
    })
  }

  public async createAcc() {
    this.isCreating = true;

    const toastError = await this.overlayService.fireToast({
      position: 'top',
      cssClass: 'anf-toast anf-toast-danger',
      icon: 'warning-outline',
      duration: 3000
    })

    const toastSuccess = await this.overlayService.fireToast({
      position: 'top',
      cssClass: 'anf-toast anf-toast-success',
      icon: 'person-add-outline',
      duration: 3000
    })

    let userInfo: IUSer = {
      firstName: this.formCreateAccGroup.value.name,
      readAndAcceptedTerms: this.formCreateAccGroup.value.terms,
      premiumInfo: {
        isPremium: false
      }
    }

    await this.authService.createUserWithEmailAndPassword(this.formCreateAccGroup.value.email, this.formCreateAccGroup.value.password, userInfo)
    .then(async () => {
      this.isCreating = false;
      this.formLoginGroup.patchValue({ email: this.formCreateAccGroup.value.email });
      this.formCreateAccGroup.reset();
      this.selectedSegment = 'ACCESS';
      this.slideSwiperTo();
      this.showCreatePassword = false;
      this.showCreateConfirmPassword = false;
      this.passwordRules.forEach((rule) => rule.valid = false);
      this.passwordIsValid = false;
      this.passwordsMatch = false;
      this.inputErrors.emailAlreadyInUse.show = false;
      this.inputErrors.emailAlreadyInUse.text = null;

      toastSuccess.message = `${this.translate.instant('TOASTS.CREATED_ACC_SUCCESS.0')}, <b>${this.translate.instant('TOASTS.CREATED_ACC_SUCCESS.1')}</b>`;
      await toastSuccess.present();
    }).catch( async (error) => {
      toastError.message = error.text[this.currentLanguage.value];

      switch (error.error.code) {
        case 'auth/email-already-in-use':
          this.inputErrors.emailAlreadyInUse.text = toastError.message;
          this.inputErrors.emailAlreadyInUse.show = true;
        break;
      }

      await toastError.present();

      this.isCreating = false;

      await toastError.onDidDismiss()
      .then(() => {
        toastError.message = '';
      })
    })
  }

  public slideSwiperToFirst(): void {

    this.selectedSegment = 'ACCESS';
    this.swiper?.slideTo(0, 800);

    this.formCreateAccGroup.reset();
    this.showCreatePassword = false;
    this.showCreateConfirmPassword = false;
    this.passwordRules.forEach((rule) => rule.valid = false);
    this.passwordIsValid = false;
    this.passwordsMatch = false;
    this.inputErrors.emailAlreadyInUse.show = false;
    this.inputErrors.emailAlreadyInUse.text = '';
  }

  public slideSwiperTo(): void {
    this.selectedSegment === 'ACCESS' ? this.swiper?.slideTo(0) : this.swiper?.slideTo(1);

    if (this.selectedSegment === 'ACCESS') {
      this.formCreateAccGroup.reset();
      this.showCreatePassword = false;
      this.showCreateConfirmPassword = false;
      this.passwordRules.forEach((rule) => rule.valid = false);
      this.passwordIsValid = false;
      this.passwordsMatch = false;
      this.inputErrors.emailAlreadyInUse.show = false;
      this.inputErrors.emailAlreadyInUse.text = '';
    } else {
      this.formLoginGroup.reset();
      this.showLoginPassword = false;
    }
  }

  public clearFieldKeepJustName(event: any): void {
    let name: string = this.formCreateAccGroup.value.name.replace(/[^a-zA-ZÀ-ÿ]/g, '');
    name = name.charAt(0).toUpperCase() + name.slice(1).toLocaleLowerCase();
    this.formCreateAccGroup.patchValue({ name: name });
  }

  public justLowercase(form: FormGroup, field: string): void {
    let value: string = form.value[field];

    if (value && value.length) {
      value = value.toLowerCase();
      form.patchValue({ [field]: value });
    }
  }

  public initCreateAccForm(): void {
    this.formCreateAccGroup = this.formBuilder.group({
      name: [ '', [ Validators.required, Validators.minLength(3) ] ],
      email: [ '', [ Validators.required, Validators.email ] ],
      password: [ '', [ Validators.required, Validators.minLength(8) ] ],
      confirmPassword: [ '', [ Validators.required, Validators.minLength(8) ] ],
      terms: [ null, [ Validators.required ]]
    })
  }

  public toggleLoginPassword(): void {
    this.showLoginPassword = !this.showLoginPassword;
  }

  public toggleCreatePassword(): void {
    this.showCreatePassword = !this.showCreatePassword;
  }

  public toggleCreateConfirmPassword(): void {
    this.showCreateConfirmPassword = !this.showCreateConfirmPassword;
  }

  public navTo(route: string): void {
    this.navCtrl.navigateForward([route])
  }

  public checkPasswordRules(): void {
    let senha: string = this.formCreateAccGroup.get('password')?.value;

    if (senha.length > 0) {
      this.utilsService.checkPasswordRules(senha);
      this.passwordIsValid = this.passwordRules.every((rule) => rule.valid === true);

      this.checkPasswordsMatch();
    }
  }

  public checkPasswordsMatch(): boolean {
    this.passwordsMatch = this.formCreateAccGroup.value.password === this.formCreateAccGroup.value.confirmPassword

    if (this.formCreateAccGroup.value.password === '' && this.formCreateAccGroup.value.confirmPassword === '') {
      this.passwordsMatch = false
    }

    return this.passwordsMatch
  }

  preventWhitespace(event: KeyboardEvent) {
    if (event.key === ' ') {
      event.preventDefault();
    }
  }

  public clearErrorsIfExists(error: string): void {
    if (error === 'email-already-in-use' && this.inputErrors.emailAlreadyInUse.show) {
      this.inputErrors.emailAlreadyInUse.show = false;
      this.inputErrors.emailAlreadyInUse.text = null;
    }
  }

  public async openAboutUsModal() {
    const modal = await this.overlayService.fireModal({
      component: QuemSomosPage,
      componentProps: {
        currentLanguage: this.currentLanguage
      },
      breakpoints: [1],
      initialBreakpoint: 1,
      mode: 'md',
      cssClass: 'anf-about-us-modal',
      id: 'about-us-modal'
    })

    await modal.present();

    return modal;
  }

  public toggleTermsAndConditionsModal(show: boolean): void {
    this.showTermsAndConditionsModal = show
  }

  public ngOnDestroy(): void {
    this.currentLanguageSubscription.unsubscribe();
  }

}
