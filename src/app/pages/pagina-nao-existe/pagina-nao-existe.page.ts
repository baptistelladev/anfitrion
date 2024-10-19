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

  public translatedPage: any;
  public translatedPage$: Observable<any>;

  constructor(
    private translate : TranslateService,
    private title : Title,
    private analyticsService : AnalyticsService
  ) { }

  ngOnInit() {
    this.analyticsService.tagViewInit(AnalyticsEventnameEnum.PAGE_VIEW);
  }

  ionViewDidEnter(): void {
    this.getTitleFromPage();
  }

  public getTitleFromPage(): void {
    this.translatedPage$ = this.translate.get('PAGE_NOT_FOUND')

    this.translatedPage$
    .pipe(take(2))
    .subscribe((resp: any) => {
      this.translatedPage = resp;
      this.title.setTitle(this.translatedPage['PAGE_TITLE'])
    })
  }

}
