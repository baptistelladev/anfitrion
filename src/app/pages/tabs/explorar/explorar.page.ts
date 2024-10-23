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
      value: 'CIDADE'
    },
    {
      value: 'PRAIA'
    }
  ]

  public selectedSegment: string = 'CIDADE';

  public cityFeatures: any[] = [
    {
      value: 'ANFITRION',
      icon: 'bulb',
      text: {
        pt: 'Sugestões',
        en: '',
        es: ''
      },
      isDisabled: false,
      show: true,
      description: {
        pt: 'está visitando a cidade ou quer conhecer lugares novos.',
        en: '',
        es: ''
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
        en: '',
        es: ''
      }
    }
  ];

  constructor(
    private store : Store
  ) { }

  ngOnInit() {
    this.getCurrentLanguageFromNGRX();
    this.selectCityFeature('LUGARES');
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
