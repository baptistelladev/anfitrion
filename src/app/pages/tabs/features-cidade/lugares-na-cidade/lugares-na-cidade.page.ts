import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { ILang } from 'src/app/shared/models/Lang';
import * as AppStore from './../../../../shared/store/app.state';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'rgs-lugares-na-cidade',
  templateUrl: './lugares-na-cidade.page.html',
  styleUrls: ['./lugares-na-cidade.page.scss'],
})
export class LugaresNaCidadePage implements OnInit, OnDestroy {

  public currentLanguage: ILang;
  public currentLanguage$: Observable<ILang>;
  public currentLanguageSubscription: Subscription;

  constructor(
    private store : Store,
    private navCtrl : NavController
  ) { }

  ngOnInit() {
    this.getCurrentLanguageFromNGRX();
  }

  public getCurrentLanguageFromNGRX(): void {
    this.currentLanguage$ = this.store.select(AppStore.selectAppCurrentLanguage);

    this.currentLanguageSubscription = this.currentLanguage$
    .subscribe((language: ILang) => {
      this.currentLanguage = language;
    })
  }

  public back(): void {
    this.navCtrl.back()
  }

  ngOnDestroy(): void {
    this.currentLanguageSubscription.unsubscribe();
  }

}
