import { MOCK_CITY_FEATURES } from 'src/app/shared/mocks/MockCityFeatures';
import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ICity } from '../../models/ICity';
import { ILang } from '../../models/ILang';

@Component({
  selector: 'anfitrion-search-modal',
  templateUrl: './search-modal.component.html',
  styleUrls: ['./search-modal.component.scss'],
})
export class SearchModalComponent  implements OnInit {

  @Input() currentLang: ILang;
  @Input() currentCityAsParam: ICity | undefined;
  @Input() currentLocationAsParam: string | undefined;
  @Input() id: string;
  @Input() placeTypeOBJ: any;

  constructor(
    private modalCtrl : ModalController
  ) { }

  ngOnInit() {
  }

  public async closeModal() {
    await this.modalCtrl.dismiss('', '', this.id);
  }

}
