import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController, AlertController, ModalController, NavController, Platform, PopoverController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { OverlayService } from 'src/app/shared/services/overlay.service';
import { App } from '@capacitor/app';


@Injectable({
  providedIn: 'root'
})
export class BackButtonService {

  private backButtonSubscription: Subscription;

  constructor(
    private platform: Platform,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private popoverCtrl: PopoverController,
    private actionSheetCtrl: ActionSheetController,
    private router : Router,
    private navCtrl : NavController,
    private overlayService : OverlayService,
    private translate : TranslateService
  ) {
    this.initializeBackButtonBehavior();
  }

  private initializeBackButtonBehavior() {
    this.backButtonSubscription = this.platform.backButton.subscribeWithPriority(0, async () => {
      // Primeiro verifica e fecha overlays, se existirem
      const modal = await this.modalCtrl.getTop();
      if (modal) {
        return modal.dismiss();
      }

      const alert = await this.alertCtrl.getTop();
      if (alert) {
        return alert.dismiss();
      }

      const popover = await this.popoverCtrl.getTop();
      if (popover) {
        return popover.dismiss();
      }

      const actionSheet = await this.actionSheetCtrl.getTop();
      if (actionSheet) {
        return actionSheet.dismiss();
      }

      // Caso não haja nenhum overlay, chama a função `back()` personalizada
      let route: string = this.router.url;

      switch (route) {
        case '/login':
          this.exitAppAlert();
          break;

        case '/logado/explorar':
          App.minimizeApp();
          break;

        case '/logado/sugestoes-do-anfitriao':
        this.navCtrl.navigateBack('/logado/explorar');
          break;

        default:
          this.navCtrl.back();
          break;
      }

      return;
    });
  }

  public async exitAppAlert() {
    const alert = await this.overlayService.fireAlert({
      mode: 'ios',
      cssClass: 'anf-alert negative-btn',
      subHeader: `${this.translate.instant('SHARED.EXIT_APP_TITLE')}`,
      message: `${this.translate.instant('SHARED.EXIT_APP_TEXT')}`,
      buttons: [
        {
          role: 'cancel',
          text: `${this.translate.instant('SHARED.CANCEL')}`,
          handler: async () => {
            await this.alertCtrl.dismiss(null, 'cancel', 'alert-exit-app');
          }
        },
        {
          role: 'confirm',
          text: `${this.translate.instant('SHARED.EXIT_APP_YES')}`,
          handler: async () => {
            await App.exitApp();
          }
        }
      ]
    });

    await alert.present();
  }
}
