import { MOCK_CITY_FEATURES } from 'src/app/shared/mocks/MockCityFeatures';
import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { IonInput, ModalController } from '@ionic/angular';
import { ICity } from '../../models/ICity';
import { ILang } from '../../models/ILang';
import { PlacesService } from 'src/app/core/services/firebase/places.service';
import { CollectionsEnum } from '../../enums/Collection';
import { IPlace } from '../../models/IPlace';

@Component({
  selector: 'anfitrion-search-modal',
  templateUrl: './search-modal.component.html',
  styleUrls: ['./search-modal.component.scss'],
})
export class SearchModalComponent  implements OnInit, AfterViewInit {

  @Input() currentLang: ILang;
  @Input() currentCityAsParam: ICity | undefined;
  @Input() currentLocationAsParam: string | undefined;
  @Input() id: string;
  @Input() placeTypeOBJ: any;

  @ViewChild('searchbar', { static: true }) searchbar: IonInput;

  public places: IPlace[];

  constructor(
    private modalCtrl : ModalController,
    private placesService : PlacesService
  ) { }

  ngOnInit() {

  }

  async ngAfterViewInit() {
    setTimeout(async () => {
      await this.focusOnInput();
    }, 500);
  }

  public async closeModal() {
    await this.modalCtrl.dismiss('', '', this.id);
  }

  public async focusOnInput() {
    this.searchbar.setFocus();
  }

  public isTyping(e: any) {
    let textTransformed: string = this.transformString(e.detail.value);

    this.placesService.getCollection(CollectionsEnum.PLACES, [
      { field: 'value', operator: '==', value: textTransformed }
    ]).subscribe({
      next: (places: IPlace[]) => {
        this.places = places;
      }
    })
  }

  public transformString(text: string): string {
    if (!text) return '';
    let transformed = text.toLowerCase();
    transformed = transformed.trim();
    transformed = transformed.replace(/\s+/g, '-');
    return transformed
  }
}
