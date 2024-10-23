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
export class ExplorarPage implements OnInit, AfterViewInit, OnDestroy {

  public selectedCityFeature: any;

  public currentLanguage: ILang;
  public currentLanguage$: Observable<ILang>;
  public currentLanguageSubscription: Subscription;

  @ViewChild('explorarSwiper')
  swiperRef: ElementRef | undefined;
  swiper?: Swiper;

  public segments: any[] = [
    {
      value: 'CIDADE',
      text: {
        pt: ["na", "cidade"],
        en: ["in the", "city"],
        es: ["en la", "ciudad"]
      },
    },
    {
      value: 'PRAIA',
      text: {
        pt: ["na", "praia"],
        en: ["at the", "beach"],
        es: ["en la", "playa"]
      },
    }
];

  public selectedSegment: string = 'CIDADE';

  public cityFeatures: any[] = [
    {
      value: 'ANFITRION',
      icon: 'bulb',
      text: {
        pt: 'Sugestões',
        en: 'Suggestions',
        es: 'Sugerencias'
      },
      isDisabled: false,
      show: true,
      description: {
        pt: 'está visitando a cidade ou quer conhecer lugares novos.',
        en: 'is visiting the city or wants to discover new places.',
        es: 'está visitando la ciudad o quiere conocer lugares nuevos.'
      }
    },
    {
      value: 'LUGARES',
      icon: 'map',
      text: {
        pt: 'Lugares',
        en: 'Places',
        es: 'Lugares'
      },
      isDisabled: false,
      show: true,
      description: {
        pt: 'procura por barzinhos, adegas, tabacarias...',
        en: 'looking for bars, wineries, tobacco shops...',
        es: 'buscando bares, bodegas, tiendas de tabaco...'
      }
    }
  ];

  constructor(
    private store : Store
  ) { }

  ngOnInit() {
    this.getCurrentLanguageFromNGRX();
    this.selectCityFeature('ANFITRION');
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

  public selectCityFeature(value: string) {
    this.selectedCityFeature = this.cityFeatures.find((feature: any) => {
      return feature.value === value;
    })

    console.log(this.selectedCityFeature);

  }

  ngOnDestroy() {
    this.currentLanguageSubscription.unsubscribe();
  }

}
