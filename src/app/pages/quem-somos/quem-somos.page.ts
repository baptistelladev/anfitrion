import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ILang } from 'src/app/shared/models/Lang';
import Swiper from 'swiper';

@Component({
  selector: 'rgs-quem-somos',
  templateUrl: './quem-somos.page.html',
  styleUrls: ['./quem-somos.page.scss'],
})
export class QuemSomosPage implements OnInit, AfterViewInit {

  @Input() currentLanguage: ILang;

  public TIPS: any[] = [
    {
      icon: 'wine-outline',
      title: {
        pt: 'adegas',
        en: 'wineries',
        es: 'bodegas'
      },
      text: {
        pt: '24 horas',
        en: 'open 24 hours',
        es: '24 horas'
      }
    },
    {
      icon: 'list-outline',
      title: {
        pt: 'valores de festival',
        en: 'festival prices',
        es: 'precios de festival'
      },
      text: {
        pt: 'de comida japonesa',
        en: 'for Japanese cuisine',
        es: 'de comida japonesa'
      }
    },
    {
      icon: 'calendar-outline',
      title: {
        pt: 'eventos',
        en: 'events',
        es: 'eventos'
      },
      text: {
        pt: 'previstos na semana',
        en: 'happening this week',
        es: 'previstos para la semana'
      }
    },
    {
      icon: 'cafe-outline',
      title: {
        pt: 'lista de',
        en: 'list of',
        es: 'lista de'
      },
      text: {
        pt: 'cafeterias e docerias',
        en: 'cafés and bakeries',
        es: 'cafeterías y pastelerías'
      }
    }
  ];


  @ViewChild('aboutUsSwiper')
  swiperRef: ElementRef | undefined;
  swiper?: Swiper;

  constructor(
    private modalCtrl : ModalController
  ) { }

  ngOnInit() {

  }

  ngAfterViewInit(): void {
    this.swiper = this.swiperRef?.nativeElement.swiper;
    setTimeout(() => {
      this.swiper?.autoplay.start();
    }, 1000);
  }

  public closeModal(): void {
    this.modalCtrl.dismiss(null, '', 'about-us-modal');
  }

}
