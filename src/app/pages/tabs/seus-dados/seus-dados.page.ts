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
import { UsersService } from 'src/app/core/services/firebase/users.service';
import { OverlayService } from 'src/app/shared/services/overlay.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'anfitrion-seus-dados',
  templateUrl: './seus-dados.page.html',
  styleUrls: ['./seus-dados.page.scss'],
})
export class SeusDadosPage implements OnInit, OnDestroy {

  public today = moment();
  public eightenYearsLimitDate = this.today.subtract(18, 'years');
  public respectAgeLimit: boolean = false;

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

  public formHasChanges: boolean;
  public formHasChanges$: Observable<boolean>;
  public formHasChangesSubscription: Subscription;

  public user: IUSer;
  public user$: Observable<IUSer>;
  public userSubscription: Subscription;

  public personalDataForm: FormGroup;

  public MOCK_USER_SEX: IUserSex[] = MOCK_USER_SEX;
  public MOCK_USER_TYPES: IUserType[] = MOCK_USER_TYPES;

  public isUpdatingProfile: boolean = false;

  constructor(
    private navCtrl : NavController,
    private store : Store,
    private formBuilder : FormBuilder,
    private title : Title,
    private usersService : UsersService,
    private overlayService : OverlayService,
    private translate : TranslateService
  ) { }

  ngOnInit() {
    this.getCurrentLanguageFromNGRX();
    this.initPersonalDataForm();
    this.getUserFromNGRX();
    this.listenFormChanges();
  }

  ionViewWillEnter(): void {
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
      this.initialBirthDateFormat();
    })
  }

  public clearFieldKeepJustName(event: any): void {
    let name: string = this.personalDataForm.value.name.replace(/[^a-zA-ZÀ-ÿ]/g, '');
    name = name.charAt(0).toUpperCase() + name.slice(1).toLocaleLowerCase();
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

    if (moment(e.detail.value).isSameOrBefore(this.eightenYearsLimitDate)) {
      this.respectAgeLimit = true;
    } else {
      this.respectAgeLimit = false;
    }

  }

  public initialBirthDateFormat(): void {
    if (this.personalDataForm.value.birthDateAsText) {
      this.personalDataForm.patchValue({
        birthDateAsText: this.currentLanguage.value === 'en' ? moment(this.personalDataForm.value.birthDateAsText).format('YYYY/MM/DD') : moment(this.personalDataForm.value.birthDateAsText).format('DD/MM/YYYY')
      })
    }
  }

  public fillFormAndVariable(user: IUSer): void {
    this.personalDataForm.patchValue({
      name: user.firstName,
      secondName: user.lastName,
      type: user.userType,
      sex: user.sex
    })

    if (user.birthDate) {
      this.personalDataForm.patchValue({
        birthDateAsText: user.birthDate,
        birthDateAsDate: user.birthDate
      })
    } else {
      this.personalDataForm.patchValue({
        birthDateAsText: '',
        birthDateAsDate: this.maxDateAsDatetime
      })
    }

    if (moment(user.birthDate).isSameOrBefore(this.eightenYearsLimitDate)) {
      this.respectAgeLimit = true;
    } else {
      this.respectAgeLimit = false;
    }
  }

  public defineBirthDate(): void {
    this.birthDateDatetime.confirm(true);
  }

  public relationshipChanged(): void {
    console.log(this.personalDataForm.value.type);
  }

  public sexChanged(): void {
    console.log(this.personalDataForm.value.sex);
  }

  public listenFormChanges(): void {
    this.formHasChanges$ = this.personalDataForm.valueChanges;

    this.formHasChangesSubscription = this.formHasChanges$
    .subscribe((res: any) => {
      this.formHasChanges = res;
    })
  }

  public async updateProfile() {
    const alertSuccess = await this.overlayService.fireAlert({
      backdropDismiss: false,
      cssClass: 'anf-alert',
      mode: 'ios',
      subHeader: this.translate.instant('YOUR_PERFIL_PAGE.ALERT_ADVISE.TITLE'),
      message: this.translate.instant('YOUR_PERFIL_PAGE.ALERT_ADVISE.TEXT'),
      buttons: [
        {
          text: this.translate.instant('SHARED.ALRIGHT'),
          role: 'confirm',
          handler: async () => {
            await alertSuccess.dismiss();
            this.navCtrl.back();
            this.isUpdatingProfile = false;
          }
        }
      ]
    })

    if (this.user.uid) {
      this.isUpdatingProfile = true;

      let userInfo = {
        firstName: this.personalDataForm.value.name,
        lastName: this.personalDataForm.value.secondName,
        birthDate: moment(this.personalDataForm.value.birthDateAsDate).format('YYYY-MM-DD'),
        userType: this.personalDataForm.value.type,
        sex: this.personalDataForm.value.sex
      }

      await this.usersService.updateUserInfo(this.user.uid, userInfo)
      .then(async () => {
        if (moment(this.personalDataForm.value.birthDateAsDate, 'YYYY-MM-DD').isSameOrBefore(this.eightenYearsLimitDate)) {
          this.store.dispatch(UserStore.setEighteenAccess({ canAccessEighteenContent: true }));
        } else {
          this.store.dispatch(UserStore.setEighteenAccess({ canAccessEighteenContent: false }));
        }

        await alertSuccess.present();
      })
      .catch(() => {
        this.isUpdatingProfile = false;
      })
    }
  }

  public ngOnDestroy(): void {
    this.currentLanguageSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
    this.formHasChangesSubscription.unsubscribe();
  }
}
