import { Component, OnDestroy, OnInit, Renderer2, AfterViewInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NavController } from '@ionic/angular';
import { AnalyticsService } from 'src/app/core/services/firebase/analytics.service';
import { AnalyticsEventnameEnum } from 'src/app/shared/enums/Analytics';

@Component({
  selector: 'anfitrion-bem-vindo-a-baixada-santista',
  templateUrl: './bem-vindo-a-baixada-santista.page.html',
  styleUrls: ['./bem-vindo-a-baixada-santista.page.scss'],
})
export class BemVindoABaixadaSantistaPage implements OnInit, AfterViewInit {

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

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.navCtrl.navigateRoot(['/logado/explorar']);
    }, 3000);
  }

}
