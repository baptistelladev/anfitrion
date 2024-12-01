import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from 'src/app/core/services/firebase/analytics.service';
import { AnalyticsEventnameEnum } from 'src/app/shared/enums/Analytics';

@Component({
  selector: 'anfitrion-termos-e-condicoes-de-uso',
  templateUrl: './termos-e-condicoes-de-uso.page.html',
  styleUrls: ['./termos-e-condicoes-de-uso.page.scss'],
})
export class TermosECondicoesDeUsoPage implements OnInit {

  constructor(
    private analyticsService : AnalyticsService
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter(): void {
    this.analyticsService.tagViewInit(AnalyticsEventnameEnum.PAGE_VIEW);
  }

  public goToTermsAndConditions(): void {

  }

}
