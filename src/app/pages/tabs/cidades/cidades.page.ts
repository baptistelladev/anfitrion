import { Component, Input, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { CITIES } from 'src/app/shared/mocks/cities';
import { IUSer } from 'src/app/shared/models/IUser';
import { ILang } from 'src/app/shared/models/Lang';

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

  public CITIES: any[] = [...CITIES];

  constructor(
    private navCtrl : NavController,
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
