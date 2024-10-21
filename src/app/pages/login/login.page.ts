import { Component, ElementRef, OnDestroy, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { ILang } from 'src/app/shared/models/Lang';
import * as AppStore from './../../shared/store/app.state';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swiper from 'swiper';
import { NavController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/core/services/firebase/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { OverlayService } from 'src/app/shared/services/overlay.service';

@Component({
  selector: 'rgs-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit, OnDestroy, AfterViewInit {

  public showLoginPassword: boolean;

  @ViewChild('loginSwiper')
  swiperRef: ElementRef | undefined;
  swiper?: Swiper;

  public isDoingLogin: boolean;
  public isCreating: boolean;

  public formLoginGroup: FormGroup;
  public formCreateAccGroup: FormGroup;

  public currentLanguage: ILang;
  public currentLanguage$: Observable<ILang>;
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
    private toastCtrl : ToastController,
    private overlayService : OverlayService
  ) { }

  async ngOnInit() {
    this.getCurrentLanguageFromNGRX();
    this.initLoginForm();
    this.initCreateAccForm();
  }

  ngAfterViewInit(): void {
    this.swiper = this.swiperRef?.nativeElement.swiper;
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

    const toast = await this.overlayService.fireToast({
      position: 'top',
      cssClass: 'anf-toast anf-toast-danger',
      icon: 'warning-outline',
      duration: 222000
    })

    await this.authService.signInWithEmailAndPassword(this.formLoginGroup.value.email, this.formLoginGroup.value.password)
    .then( async () => {
      this.navCtrl.navigateForward(['/logado']);
      this.isDoingLogin = false;

    }).catch(async (error) => {
      this.isDoingLogin = false;
      //this.formLoginGroup.reset();
      toast.message = error;
      await toast.present();
    })
  }

  public async createAcc() {
    this.isCreating = true;

    await this.authService.createUserWithEmailAndPassword(this.formCreateAccGroup.value.email, this.formCreateAccGroup.value.password)
    .then(() => {
      this.isCreating = false;
    }).catch((error) => {
      console.log(error);
      this.isCreating = false;
    })
  }

  public slideSwiperTo(): void {
    this.selectedSegment === 'acessar' ? this.swiper?.slideTo(0) : this.swiper?.slideTo(1);
  }

  public initCreateAccForm(): void {
    this.formCreateAccGroup = this.formBuilder.group({
      email: [ '', [ Validators.required, Validators.email ] ],
      password: [ '', [ Validators.required ] ],
      confirmPassword: [ '', [ Validators.required ] ]
    })
  }

  public toggleLoginPassword(): void {
    this.showLoginPassword = !this.showLoginPassword;
  }

  public navTo(route: string): void {
    this.navCtrl.navigateForward([route])
  }

  public ngOnDestroy(): void {
    this.currentLanguageSubscription.unsubscribe();
  }

}
