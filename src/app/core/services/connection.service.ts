import { OverlayService } from 'src/app/shared/services/overlay.service';
import { NavController } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { Network } from '@capacitor/network';
import { SemInternetPage } from 'src/app/pages/sem-internet/sem-internet.page';
import { Store } from '@ngrx/store';
import * as AppStore from './../../shared/store/app.state';


@Injectable({
  providedIn: 'root'
})
export class ConnectionService {

  constructor(
    private navCtrl : NavController,
    private overlayService : OverlayService,
    private store : Store
  ) {
    this.listenNetwork()
  }

  private async listenNetwork() {
    // Obter o status inicial da rede
    const status = await Network.getStatus();

    const modal = await this.overlayService.fireModal({
      component: SemInternetPage,
      mode: 'md',
      id: 'modal-has-connection',
      backdropDismiss: false,
      cssClass: 'anf-full-size'
    })

    // Ouvir mudanças no status da rede
    Network.addListener('networkStatusChange', async (status) => {
      if (!status.connected) {
        await modal.present();
      } else {
        await modal.dismiss();
      }

      this.store.dispatch(AppStore.setHasConnection({ hasConnection: status.connected }))
    });
  }
}
