import { Injectable } from '@angular/core';
import { AlertController, AlertOptions, LoadingController, LoadingOptions, ModalController, ModalOptions, ToastController, ToastOptions } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class OverlayService {

  constructor(
    private toastCtrl : ToastController,
    private modalCtrl : ModalController,
    private alertCtrl : AlertController,
    private loadingCtrl : LoadingController
  ) { }

  /**
   * @description Dispara o <ion-toast>.
   * @param options obrigatório do tipo ToastOptions.
   * @returns HTMLIonToastElement <ion-toast>.
   */
  public async fireToast(options?: ToastOptions): Promise<HTMLIonToastElement> {
    const toast = await this.toastCtrl.create({
      mode: 'md',
      ...options
    })

    return toast;
  }

  /**
   * @description Dispara o <ion-modal>.
   * @param options obrigatório do tipo ModalOptions.
   * @returns HTMLIonModalElement <ion-modal>.
   */
  public async fireModal(options: ModalOptions): Promise<HTMLIonModalElement> {
    const modal = await this.modalCtrl.create({
      mode: 'md',
      ...options
    })

    return modal;
  }

  /**
   * @description Dispara o <ion-alert>.
   * @param options obrigatório do tipo AlertOptions.
   * @returns HTMLIonAlertElement <ion-alert>.
   */
  public async fireAlert(options?: AlertOptions): Promise<HTMLIonAlertElement> {
    const alert = await this.alertCtrl.create({
      mode: 'md',
      ...options
    })

    return alert;
  }

  /**
   * @description Dispara o <ion-loading>.
   * @param options obrigatório do tipo LoadingOptions.
   * @returns HTMLIonLoading <ion-loading>.
   */
  public async fireLoading(options?: LoadingOptions): Promise<HTMLIonLoadingElement> {
    const loading = await this.loadingCtrl.create({
      mode: 'ios',
      spinner: 'lines-sharp',
      ...options
    })

    return loading;
  }
}
