import { BackButtonService } from './../../core/core/back-button.service';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription, take } from 'rxjs';
import { ILang } from 'src/app/shared/models/ILang';
import * as AppStore from './../../shared/store/app.state';
import * as UserStore from './../../shared/store/user.state';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swiper from 'swiper';
import { AlertController, ModalController, NavController, Platform, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/core/services/firebase/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { OverlayService } from 'src/app/shared/services/overlay.service';
import { UtilsService } from 'src/app/core/services/utils.service';
import { TranslateService } from '@ngx-translate/core';
import { QuemSomosPage } from '../quem-somos/quem-somos.page';
import { Title } from '@angular/platform-browser';
import { IUSer } from 'src/app/shared/models/IUser';
import { DotLottie } from '@lottiefiles/dotlottie-web';
import { AnimationOptions } from 'ngx-lottie';
import { AnimationItem, LottiePlayer } from 'lottie-web';
import { App } from '@capacitor/app';
import { UserCredential } from 'firebase/auth';

@Component({
  selector: 'anfitrion-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit, OnDestroy, AfterViewInit {

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

  public showLoginPassword: boolean;
  public showCreatePassword: boolean;
  public showCreateConfirmPassword: boolean;

  @ViewChild('loginSwiper')
  swiperRef: ElementRef | undefined;
  swiper?: Swiper;

  public isDoingLogin: boolean;
  public isCreating: boolean;

  public formLoginGroup: FormGroup;
  public formCreateAccGroup: FormGroup;

  public currentLanguage: ILang;
  public currentLanguage$: Observable<any>;
  public currentLanguageSubscription: Subscription;

  public selectedSegment: string = 'acessar';

  public segments: any[] = [
    {
      value: 'acessar'
    },
    {
      value: 'criar'
    }
  ]

  constructor(
    private store : Store,
    private formBuilder : FormBuilder,
    private navCtrl : NavController,
    private authService : AuthService,
    private overlayService : OverlayService,
    private utilsService : UtilsService,
    private translate : TranslateService,
    private title : Title
  ) { }

  async ngOnInit() {
    this.getCurrentLanguageFromNGRX();
    this.initLoginForm();
    this.initCreateAccForm();
    this.getPasswordRules();
  }

  ngAfterViewInit(): void {
    this.swiper = this.swiperRef?.nativeElement.swiper;
  }

  ionViewWillEnter(): void {
    this.title.setTitle('Login');
  }

  public animationCreated(animationItem: AnimationItem): void {
    animationItem.setSpeed(0.8)
  }

  /**
   * @description Obtém as regras de senha.
   */
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
        toastError.message = `Você ainda não fez a verificação de e-mail obrigatória`;
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
      firstName: this.formCreateAccGroup.value.name
    }

    await this.authService.createUserWithEmailAndPassword(this.formCreateAccGroup.value.email, this.formCreateAccGroup.value.password, userInfo)
    .then(async () => {
      this.isCreating = false;
      this.formLoginGroup.patchValue({ email: this.formCreateAccGroup.value.email });
      this.formCreateAccGroup.reset();
      this.selectedSegment = 'acessar';
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

    this.selectedSegment = 'acessar';
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
    this.selectedSegment === 'acessar' ? this.swiper?.slideTo(0) : this.swiper?.slideTo(1);

    if (this.selectedSegment === 'acessar') {
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
    name = name.charAt(0).toUpperCase() + name.slice(1);
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
      confirmPassword: [ '', [ Validators.required, Validators.minLength(8) ] ]
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

  /**
   * @description Valida se o que foi digitado no campo de senha está de acordo com a regra de senha.
   * Essa função passa o que foi inserido no campo senha e servirá para ir "pintando" as validações.
   * Ao final de tudo se todas as opções estiverem true, a senha é válida.
   */
  public checkPasswordRules(): void {
    let senha: string = this.formCreateAccGroup.get('password')?.value;
    this.utilsService.checkPasswordRules(senha);
    this.passwordIsValid = this.passwordRules.every((rule) => rule.valid === true);

    this.checkPasswordsMatch();
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

  public ngOnDestroy(): void {
    this.currentLanguageSubscription.unsubscribe();
  }

}
