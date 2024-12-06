import { MOCK_TABS } from 'src/app/shared/mocks/MockTabs';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ITab } from 'src/app/shared/models/ITab';
import { NavController } from '@ionic/angular';
import { filter } from 'rxjs';
import { MapsService } from 'src/app/core/services/maps/maps.service';

@Component({
  selector: 'anfitrion-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

  public MOCK_TABS: ITab[] = MOCK_TABS;
  public applyDarkTabBar: boolean = false;
  public hideTabs: boolean = false;
  public currentUrlJustString: string;
  public currentPage: string;

  constructor(
    private router : Router,
    private navCtrl : NavController,
    private mapsService : MapsService
  ) { }

  ngOnInit() {
    this.router.events
    .pipe(filter(event => event instanceof NavigationEnd))
    .subscribe((event: NavigationEnd) => {
      let url = event.urlAfterRedirects;

      if (url === '/logado/sobre-nos') { this.applyDarkTabBar = true } else { this.applyDarkTabBar = false }
      if (url === '/logado/bem-vindo-a-baixada-santista') { this.hideTabs = true } else { setTimeout(() => {
        this.hideTabs = false
      }, 100); }

      this.currentUrlJustString = this.router.url.split('/')[2];
      this.currentPage = this.currentUrlJustString;

      console.log(this.currentPage);

    });
  }

  public segmentHasChanged(ev: any): void {
    this.currentPage = ev.detail.value;
    this.navCtrl.navigateRoot(['/logado/' + this.currentPage]);
  }

}
