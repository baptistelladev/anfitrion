import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { map, Observable, Subscription, take } from 'rxjs';
import { ILang } from 'src/app/shared/models/Lang';
import * as AppStore from './../../../../shared/store/app.state';
import { Store } from '@ngrx/store';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { CityEnum } from 'src/app/shared/enums/City';
import { EstablishmentTypeEnum } from 'src/app/shared/enums/EstablishmentType';

@Component({
  selector: 'rgs-lugar-na-cidade',
  templateUrl: './lugar-na-cidade.page.html',
  styleUrls: ['./lugar-na-cidade.page.scss'],
})
export class LugarNaCidadePage implements OnInit {

  public CityEnum = CityEnum;
  public EstablishmentType = EstablishmentTypeEnum;

  public currentLanguage: ILang;
  public currentLanguage$: Observable<ILang>;
  public currentLanguageSubscription: Subscription;

  public placeType: string;
  public city: string

  constructor(
    private navCtrl : NavController,
    private translate : TranslateService,
    private store : Store,
    private title : Title,
    private route : ActivatedRoute
  ) { }

  ngOnInit() {
    this.getCurrentLanguageFromNGRX();
    this.title.setTitle('Lugares')
    this.getRouter();
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

  public getRouter(): void {
    this.route.queryParams
    .pipe(
      take(1),
      map((params) => {
      return params
    }))
    .subscribe((res: any) => {
      this.city = res.cidade;
    })

    this.route.paramMap
    .pipe(
      take(1),
      map((params: any) => {
      const updatedParams = {
        ...params.params,
        place_type: params.params.place_type.toUpperCase()
      };
      return updatedParams;
    }))
    .subscribe((res: any) => {
      this.placeType = res.place_type;
    })
  }

}
