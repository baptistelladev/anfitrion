import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MOCK_CITIES } from 'src/app/shared/mocks/MockCities';
import { IUSer } from 'src/app/shared/models/IUser';
import { ILang } from 'src/app/shared/models/ILang';
import { ICity } from 'src/app/shared/models/ICity';
import { Store } from '@ngrx/store';
import * as AppStore from './../../../shared/store/app.state';
import { StorageService } from 'src/app/core/services/storage.service';
import { CURRENT_CITY } from 'src/app/shared/consts/keys';
import { AnalyticsService } from 'src/app/core/services/firebase/analytics.service';
import { Title } from '@angular/platform-browser';
import { AnalyticsEventnameEnum } from 'src/app/shared/enums/Analytics';


@Component({
  selector: 'anfitrion-cidades',
  templateUrl: './cidades.page.html',
  styleUrls: ['./cidades.page.scss'],
})
export class CidadesPage implements OnInit {

  @Input() currentLanguage: ILang;
  @Input() user: IUSer;
  @Input() currentCity: ICity;

  public MOCK_CITIES: ICity[] = [...MOCK_CITIES];

  constructor(
    private modalCtrl : ModalController,
    private store : Store,
    private storageService : StorageService,
    private analyticsService : AnalyticsService,
    private title : Title
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter(): void {
    this.title.setTitle('Contato');
    this.analyticsService.tagViewInit(AnalyticsEventnameEnum.PAGE_VIEW);
  }

  public async selectCity(city: any) {
    this.currentCity = city;
    this.store.dispatch(AppStore.setCurrentCity({ city: this.currentCity }))
    await this.storageService.setStorageKey(CURRENT_CITY, this.currentCity.value);
    await this.closeModalAndFireChange();
  }

  public async closeModal() {
    await this.modalCtrl.dismiss('', '', 'cities-modal');
  }

  public async closeModalAndFireChange() {
    await this.modalCtrl.dismiss(this.currentCity, 'change', 'cities-modal');
  }

}
