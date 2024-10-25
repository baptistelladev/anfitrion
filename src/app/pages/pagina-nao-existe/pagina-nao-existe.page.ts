import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { Observable, take } from 'rxjs';
import { AnalyticsService } from 'src/app/core/services/firebase/analytics.service';
import { AnalyticsEventnameEnum } from 'src/app/shared/enums/Analytics';

@Component({
  selector: 'rgs-pagina-nao-existe',
  templateUrl: './pagina-nao-existe.page.html',
  styleUrls: ['./pagina-nao-existe.page.scss'],
})
export class PaginaNaoExistePage implements OnInit {
  constructor(
    private title : Title,
    private analyticsService : AnalyticsService
  ) { }

  ngOnInit() {
    this.analyticsService.tagViewInit(AnalyticsEventnameEnum.PAGE_VIEW);
  }

  ionViewDidEnter(): void {
    this.title.setTitle('Página não existe')
  }

}
