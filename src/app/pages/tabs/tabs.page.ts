import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TABS } from 'src/app/shared/mocks/tabs';
import { ITab } from 'src/app/shared/models/Tabs';

@Component({
  selector: 'rgs-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

  public tabs: ITab[] = TABS;
  public applyDarkTabBar: boolean = false;
  public currentUrlJustString: string;

  constructor(
    private router : Router
  ) { }

  ngOnInit() {
  }

  public checkRoute() {
    if (this.router.url === '/sobre-nos') { this.applyDarkTabBar = true } else { this.applyDarkTabBar = false }

    this.currentUrlJustString = this.router.url.split('/')[1];

  }

}
