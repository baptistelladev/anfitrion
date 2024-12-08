import { Component, Input, OnInit } from '@angular/core';
import { OverlayService } from '../../services/overlay.service';
import { SearchModalComponent } from '../search-modal/search-modal.component';
import { ILang } from '../../models/ILang';
import { ICity } from '../../models/ICity';

@Component({
  selector: 'anfitrion-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent  implements OnInit {

  @Input() currentLang: ILang;
  @Input() currentCityAsParam: ICity | undefined;
  @Input() currentLocationAsParam: string | undefined;
  @Input() id: string;
  @Input() placeTypeOBJ: any;

  constructor(
    private overlayService : OverlayService
  ) { }

  ngOnInit() {}

  public async openSearchModal() {
    const modal = await this.overlayService.fireModal({
      id: this.id,
      mode: 'md',
      component: SearchModalComponent,
      breakpoints: [1],
      backdropDismiss: false,
      initialBreakpoint: 1,
      handle: false,
      componentProps: {
        currentLang: this.currentLang,
        currentCityAsParam: this.currentCityAsParam,
        currentLocationAsParam: this.currentLocationAsParam,
        id: this.id,
        placeTypeOBJ: this.placeTypeOBJ
      }
    })

    await modal.present();

    return modal;
  }

}
