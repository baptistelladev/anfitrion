import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MOCK_CITIES } from 'src/app/shared/mocks/MockCities';
import { IUSer } from 'src/app/shared/models/IUser';
import { ILang } from 'src/app/shared/models/ILang';

@Component({
  selector: 'rgs-cidades',
  templateUrl: './cidades.page.html',
  styleUrls: ['./cidades.page.scss'],
})
export class CidadesPage implements OnInit {

  @Input() currentLanguage: ILang;
  @Input() user: IUSer

  public selectedCity: any = {
    value: 'SAO_VICENTE',
    name: 'São Vicente',
    sigla: 'sv'
  }

  public CITIES: any[] = [...MOCK_CITIES];

  constructor(
    private modalCtrl : ModalController
  ) { }

  ngOnInit() {
    console.log(this.user);

  }

  public async selectCity(city: any) {
    this.selectedCity = city;
    await this.closeModal();
  }

  public async closeModal() {
    await this.modalCtrl.dismiss(null, '', 'cities-modal');
  }

}
