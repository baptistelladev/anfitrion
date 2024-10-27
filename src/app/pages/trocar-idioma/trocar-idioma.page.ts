import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { LANGS } from 'src/app/shared/mocks/langs';
import { ILang } from 'src/app/shared/models/ILang';
import * as AppStore from './../../shared/store/app.state';
import { TranslateService } from '@ngx-translate/core';
import { APP_LANG_KEY } from 'src/app/shared/consts/keys';
import { Title } from '@angular/platform-browser';
import { AnalyticsService } from 'src/app/core/services/firebase/analytics.service';
import { AnalyticsEventnameEnum } from 'src/app/shared/enums/Analytics';
import { StorageService } from 'src/app/core/services/storage.service';

@Component({
  selector: 'rgs-trocar-idioma',
  templateUrl: './trocar-idioma.page.html',
  styleUrls: ['./trocar-idioma.page.scss'],
})
export class TrocarIdiomaPage implements OnInit, OnDestroy {

  public currentLanguage: ILang;
  public currentLanguage$: Observable<ILang>;
  public currentLanguageSubscription: Subscription;

  public languageForm: FormGroup;

  public langs: ILang[] = LANGS;

  constructor(
    private formBuilder: FormBuilder,
    private navCtrl : NavController,
    private store : Store,
    private translate : TranslateService,
    private storageService : StorageService,
    private title : Title,
    private analyticsService : AnalyticsService
  ) { }

  ngOnInit() {
    this.initLanguageForm();
    this.getCurrentLanguageFromNGRX();
    this.analyticsService.tagViewInit(AnalyticsEventnameEnum.PAGE_VIEW);
  }

  ionViewDidEnter(): void {
    this.title.setTitle('Trocar idioma');
  }

  public getCurrentLanguageFromNGRX(): void {
    this.currentLanguage$ = this.store.select(AppStore.selectAppCurrentLanguage);

    this.currentLanguageSubscription = this.currentLanguage$
    .subscribe((language: ILang) => {
      this.currentLanguage = language;

      let foundLang = this.langs.find((lang: ILang) => {
        return lang.value === language.value;
      })

      if (foundLang) {
        this.currentLanguage = foundLang;
      }

      this.languageForm.patchValue({ language: this.currentLanguage.value })
      this.translate.use(this.currentLanguage.value)

    })
  }

  public async changeLang(e: any) {
    let foundLang = this.langs.find((lang: ILang) => {
      return lang.value === e.detail.value;
    })

    if (foundLang) {
      this.currentLanguage = foundLang;
    }

    await this.storageService.setStorageKey(APP_LANG_KEY, this.currentLanguage.value);

    this.store.dispatch(AppStore.setCurrentLanguage({ language: this.currentLanguage }));
    this.translate.use(this.currentLanguage.value);
    this.navCtrl.back();

  }

  public initLanguageForm(): void {
    this.languageForm = this.formBuilder.group({
      language: [ null, [ Validators.required ] ]
    })
  }

  public back(): void {
    this.navCtrl.back()
  }

  public ngOnDestroy(): void {
    this.currentLanguageSubscription.unsubscribe();
  }

}
