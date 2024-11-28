import { Component, Input, OnInit } from '@angular/core';
import { ISocialNetwork } from '../../models/INetwork';
import { NavController, Platform } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { Observable, take } from 'rxjs';
import * as AppStore from './../../../shared/store/app.state';
import { NetworksEnum } from '../../enums/Networks';


@Component({
  selector: 'anfitrion-social-networks',
  templateUrl: './social-networks.component.html',
  styleUrls: ['./social-networks.component.scss'],
})
export class SocialNetworksComponent  implements OnInit {
  @Input() centered: boolean;

  public socialNetworks: ISocialNetwork[];
  public socialNetworks$: Observable<ISocialNetwork[]>;

  public NetworksEnum = NetworksEnum;

  constructor(
    private store : Store,
    private navCtrl : NavController,
    private platform : Platform
  ) { }

  ngOnInit() {
    this.getSocialNetworksFromNGRX();
  }

  public getSocialNetworksFromNGRX(): void {
    this.socialNetworks$ = this.store.select(AppStore.selectAppInfoNetworks);

    this.socialNetworks$
    .pipe(take(2))
    .subscribe((networks: ISocialNetwork[]) => {
      this.socialNetworks = networks;
    })
  }

  public navToInsideApp(socialNetwork: ISocialNetwork): void {
    this.navCtrl.navigateForward(['/logado/' + socialNetwork.baseUrl])
  }

  public navToAppOrSite(socialNetwork: ISocialNetwork): void {
    if (this.platform.is('desktop')) {
      this.openExternalUrl(socialNetwork.baseUrl + (socialNetwork.value === NetworksEnum.YOUTUBE || socialNetwork.value === NetworksEnum.TIKTOK ? '@' : '') + socialNetwork.user, '_blank');
    }

    if (this.platform.is('mobileweb') || this.platform.is('mobile')) {
      this.openExternalUrl(socialNetwork.baseUrl + (socialNetwork.value === NetworksEnum.YOUTUBE || socialNetwork.value === NetworksEnum.TIKTOK ? '@' : '') + socialNetwork.user, '_self');
    }
  }

  public openExternalUrl(url: string, target: string = '_system'): void {
    if (typeof window !== 'undefined') {
      window.open(url, target);
    }
  }
}
