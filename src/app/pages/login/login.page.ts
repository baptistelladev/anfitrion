import { Component, ElementRef, OnDestroy, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { ILang } from 'src/app/shared/models/Lang';
import * as AppStore from './../../shared/store/app.state';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swiper from 'swiper';
import { NavController } from '@ionic/angular';

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
    private navCtrl : NavController
  ) { }

  ngOnInit() {
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
      password: [ '', [ Validators.required, Validators.minLength(6) ] ]
    })
  }

  public login(form: any): void {
    console.log(form);
    this.isDoingLogin = true;

    setTimeout(() => {
      this.isDoingLogin = false;
    }, 1000);
  }

  public createAcc(form: any): void {
    console.log(form);
    this.isCreating = true;

    setTimeout(() => {
      this.isCreating = false;
    }, 1000);
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
