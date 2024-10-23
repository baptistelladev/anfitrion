import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { ILang } from 'src/app/shared/models/Lang';
import * as AppStore from './../../../shared/store/app.state';
import Swiper from 'swiper';

@Component({
  selector: 'rgs-explorar',
  templateUrl: './explorar.page.html',
  styleUrls: ['./explorar.page.scss'],
})
export class ExplorarPage implements OnInit, AfterViewInit {

  public currentLanguage: ILang;
  public currentLanguage$: Observable<ILang>;
  public currentLanguageSubscription: Subscription;

  @ViewChild('explorarSwiper')
  swiperRef: ElementRef | undefined;
  swiper?: Swiper;

  public segments: any[] = [
    {
      value: 'CIDADE'
    },
    {
      value: 'PRAIA'
    }
  ]

  public selectedSegment: string = 'CIDADE';

  public cityFeatures: any[] = [
    {
      value: 'LUGARES',
      icon: 'storefront',
      text: {
        pt: 'Lugares',
        en: 'Places',
        es: 'Lugares'
      }
    },
    {
      value: 'PESSOAS',
      icon: 'people',
      text: {
        pt: 'Pessoas',
        en: 'People',
        es: 'Personas'
      }
    },
    {
      value: 'SERVIÇOS',
      icon: 'construct',
      text: {
        pt: 'Serviços',
        en: 'Services',
        es: 'Servicios'
      }
    }
  ];

  constructor(
    private store : Store
  ) { }

  ngOnInit() {
    this.getCurrentLanguageFromNGRX();
  }

  ngAfterViewInit(): void {
    this.swiper = this.swiperRef?.nativeElement.swiper;
  }

  public getCurrentLanguageFromNGRX(): void {
    this.currentLanguage$ = this.store.select(AppStore.selectAppCurrentLanguage);

    this.currentLanguageSubscription = this.currentLanguage$
    .subscribe((language: ILang) => {
      this.currentLanguage = language;
    })
  }

  public segmentChanged(): void {
    console.log('dada');
  }

}
