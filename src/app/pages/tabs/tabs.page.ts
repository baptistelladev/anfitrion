import { MOCK_TABS } from 'src/app/shared/mocks/MockTabs';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ITab } from 'src/app/shared/models/ITab';

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

  constructor(
    private router : Router
  ) { }

  ngOnInit() {
  }

  public checkRoute(value: any) {
    if (this.router.url === '/logado/sobre-nos') { this.applyDarkTabBar = true } else { this.applyDarkTabBar = false }
    if (this.router.url === '/logado/bem-vindo-a-baixada-santista') { this.hideTabs = true } else { setTimeout(() => {
      this.hideTabs = false
    }, 100); }


    this.currentUrlJustString = this.router.url.split('/')[1];


    console.log(this.router.url);


  }

}
