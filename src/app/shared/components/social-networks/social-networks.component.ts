import { Component, Input, OnInit } from '@angular/core';
import { ISocialNetwork } from '../../models/INetwork';
import { NavController } from '@ionic/angular';
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
    private store : Store
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

}
