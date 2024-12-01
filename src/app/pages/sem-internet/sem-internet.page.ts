import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AnalyticsService } from 'src/app/core/services/firebase/analytics.service';
import { AnalyticsEventnameEnum } from 'src/app/shared/enums/Analytics';

@Component({
  selector: 'anfitrion-sem-internet',
  templateUrl: './sem-internet.page.html',
  styleUrls: ['./sem-internet.page.scss'],
})
export class SemInternetPage implements OnInit {

  constructor(
    private title : Title,
    private analyticsService : AnalyticsService
  ) { }

  ngOnInit() {
    this.title.setTitle('Sem internet')
  }

  ionViewWillEnter(): void {
    this.analyticsService.tagViewInit(AnalyticsEventnameEnum.PAGE_VIEW);
  }

}
