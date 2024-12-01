import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NavController } from '@ionic/angular';
import { AnalyticsService } from 'src/app/core/services/firebase/analytics.service';
import { AnalyticsEventnameEnum } from 'src/app/shared/enums/Analytics';

@Component({
  selector: 'anfitrion-ajude-nosso-projeto',
  templateUrl: './ajude-nosso-projeto.page.html',
  styleUrls: ['./ajude-nosso-projeto.page.scss'],
})
export class AjudeNossoProjetoPage implements OnInit {

  constructor(
    private navCtrl : NavController,
    private title : Title,
    private analyticsService : AnalyticsService
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter(): void {
    this.title.setTitle('Bem vindo');
    this.analyticsService.tagViewInit(AnalyticsEventnameEnum.PAGE_VIEW);
  }

  public back(): void {
    this.navCtrl.back()
  }

}
