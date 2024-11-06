import { MOCK_USER_TYPES } from './../../../shared/mocks/MockUserTypes';
import { MOCK_USER_SEX } from './../../../shared/mocks/MockUserSex';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { IonDatetime, NavController, Platform, PopoverOptions } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { ILang } from 'src/app/shared/models/ILang';
import * as AppStore from './../../../shared/store/app.state';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IUSer } from 'src/app/shared/models/IUser';
import * as UserStore from './../../../shared/store/user.state';
import { Title } from '@angular/platform-browser';
import * as moment from 'moment';
import { IUserSex } from 'src/app/shared/models/IUserSex';
import { IUserType } from 'src/app/shared/models/IUSerType';

@Component({
  selector: 'anfitrion-seus-dados',
  templateUrl: './seus-dados.page.html',
  styleUrls: ['./seus-dados.page.scss'],
})
export class SeusDadosPage implements OnInit, OnDestroy {

  public interfaceOptions: any = {
    showBackdrop: true,
    backdropDismiss: true,
    cssClass: 'select-alert',
    mode: 'ios',
    keyboardClose: true,
    id: 'select-user-type',
    size: 'auto',
    dismissOnSelect: true,
    side: 'bottom',
    alignment: '',
    arrow: true,
  }

  public todayAsDatetime = moment().format('YYYY-MM-DD');
  public maxDateAsDatetime = moment().subtract(16, 'years').format('YYYY-MM-DD');

  @ViewChild('birthDateDatetime') birthDateDatetime: IonDatetime;


  public showBirthDateModal: boolean = false;

  public currentLanguage: ILang;
  public currentLanguage$: Observable<ILang>;
  public currentLanguageSubscription: Subscription;

  public user: IUSer;
  public user$: Observable<IUSer>;
  public userSubscription: Subscription;

  public personalDataForm: FormGroup;

  public MOCK_USER_SEX: IUserSex[] = MOCK_USER_SEX;
  public MOCK_USER_TYPES: IUserType[] = MOCK_USER_TYPES;

  public backButtonSubscription: Subscription;

  constructor(
    private navCtrl : NavController,
    private store : Store,
    private formBuilder : FormBuilder,
    private title : Title,
    private platform : Platform
  ) { }

  ngOnInit() {
    this.initPersonalDataForm();
    this.getUserFromNGRX();
    this.getCurrentLanguageFromNGRX();
  }

  ionViewWillEnter(): void {
    this.title.setTitle('Seus dados');
    this.listeningBackButton();
  }

  public listeningBackButton(): void {
    this.backButtonSubscription = this.platform.backButton.subscribeWithPriority(0, async () => {
      this.back();
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
      this.initialBirthDateFormat();
    })
  }

  public initPersonalDataForm(): void {
    this.personalDataForm = this.formBuilder.group({
      name: [ '', [ Validators.required, Validators.minLength(3) ] ],
      birthDateAsDate: [ '' ],
      birthDateAsText: [ '', [ Validators.required ] ],
      secondName: [ '', [ Validators.required ] ],
      type: [ '', [ Validators.required ] ],
      sex: [ '', [ Validators.required ] ]
    })
  }

  public getUserFromNGRX(): void {
    this.user$ = this.store.select(UserStore.selectUser);

    this.userSubscription = this.user$
    .subscribe((user: IUSer) => {
      this.user = user;
      this.fillFormAndVariable(user);
    })
  }

  public clearFieldKeepJustName(event: any): void {
    let name: string = this.personalDataForm.value.name.replace(/[^a-zA-ZÀ-ÿ]/g, '');
    name = name.charAt(0).toUpperCase() + name.slice(1);
    this.personalDataForm.patchValue({ name: name });
  }

  public preventWhitespace(event: KeyboardEvent) {
    if (event.key === ' ') {
      event.preventDefault();
    }
  }

  public toggleBirthDateModal(show: boolean): void {
    this.showBirthDateModal = show;
  }

  public birthDateChanged(e: any): void {
    this.personalDataForm.patchValue({
      birthDateAsText: this.currentLanguage.value === 'en' ? moment(e.detail.value).format('YYYY/MM/DD') : moment(e.detail.value).format('DD/MM/YYYY')
    })
  }

  public initialBirthDateFormat(): void {
    if (this.personalDataForm.value.birthDateAsText) {
      this.personalDataForm.patchValue({
        birthDateAsText: this.currentLanguage.value === 'en' ? moment(this.personalDataForm.value.birthDateAsText).format('YYYY/MM/DD') : moment(this.personalDataForm.value.birthDateAsText).format('DD/MM/YYYY')
      })
    }

    console.log(this.personalDataForm.value.birthDateAsText);

  }

  public fillFormAndVariable(user: IUSer): void {
    this.personalDataForm.patchValue({
      birthDateAsDate: this.maxDateAsDatetime,
      name: user.firstName
    })
  }

  public defineBirthDate(): void {
    this.birthDateDatetime.confirm(true);
  }

  public ionViewWillLeave(): void {
    this.backButtonSubscription.unsubscribe();
  }

  public ngOnDestroy(): void {
    this.currentLanguageSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }

}
