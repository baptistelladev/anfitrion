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

@Component({
  selector: 'anfitrion-seus-dados',
  templateUrl: './seus-dados.page.html',
  styleUrls: ['./seus-dados.page.scss'],
})
export class SeusDadosPage implements OnInit, OnDestroy {

  public showBirthDateModal: boolean = false;

  public currentLanguage: ILang;
  public currentLanguage$: Observable<ILang>;
  public currentLanguageSubscription: Subscription;

  public user: IUSer;
  public user$: Observable<IUSer>;
  public userSubscription: Subscription;

  public personalDataForm: FormGroup;

  constructor(
    private navCtrl : NavController,
    private store : Store,
    private formBuilder : FormBuilder,
    private title : Title
  ) { }

  ngOnInit() {
    this.initPersonalDataForm();
    this.getUserFromNGRX();
    this.getCurrentLanguageFromNGRX();
  }

  ionViewdidEnter(): void {
    this.title.setTitle('Seus dados');
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

  public initPersonalDataForm(): void {
    this.personalDataForm = this.formBuilder.group({
      name: [ '', [ Validators.required, Validators.minLength(3) ] ],
      birthDateAsDate: null,
      birthDateAsText: null,
      secondName: null
    })
  }

  public getUserFromNGRX(): void {
    this.user$ = this.store.select(UserStore.selectUser);

    this.userSubscription = this.user$
    .subscribe((user: IUSer) => {
      this.user = user;
      console.log(this.user);

      this.personalDataForm.patchValue({
        name: this.user.firstName
      })
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
    console.log(e);

  }

  public ngOnDestroy(): void {
    this.currentLanguageSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }

}
