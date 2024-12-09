import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable, Subscription, take } from 'rxjs';
import { ILang } from 'src/app/shared/models/ILang';
import { ISuggestion } from 'src/app/shared/models/ISuggestion';
import * as AppStore from './../../../../shared/store/app.state';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { SuggestionsService } from 'src/app/core/services/firebase/suggestions.service';
import { CollectionsEnum } from 'src/app/shared/enums/Collection';
import { SuggestionsEnum } from 'src/app/shared/enums/Suggestions';
import { IonContent, IonSelect, NavController } from '@ionic/angular';
import Swiper from 'swiper';
import { MOCK_FILTERS } from 'src/app/shared/mocks/MockFilters';
import { FilterEnum } from 'src/app/shared/enums/FilterEnum';
import { IPlace } from 'src/app/shared/models/IPlace';
import { PlacesService } from 'src/app/core/services/firebase/places.service';
import { IFIrebaseFilter } from 'src/app/shared/models/IFirebaseFilter';
import { IFilter } from 'src/app/shared/models/IFilter';
import { ICity } from 'src/app/shared/models/ICity';

@Component({
  selector: 'anfitrion-festival-comida-japonesa',
  templateUrl: './festival-comida-japonesa.page.html',
  styleUrls: ['./festival-comida-japonesa.page.scss'],
})
export class FestivalComidaJaponesaPage implements OnInit, OnDestroy, AfterViewInit {

  public hideRightControl: boolean = false;
  public hideLeftControl: boolean = true;

  @ViewChild('japaneseSwiper')
  swiperRef: ElementRef | undefined;
  swiper?: Swiper;
  @ViewChild('filterSelector') filterSelector: IonSelect;
  @ViewChild('japaneseFoodContent') japaneseFoodContent: IonContent;

  public paramAsUrl: string; // NÃO SERÁ USADO MAS FICARÁ COMO REFERÊNCIA
  public lastPathFromUrl: string // O PARAM SERÁ SUBSTITUIDO POR ISSO, POIS ESSA TELA TEM ROTA DEDICADA.

  public currentLanguage: ILang;
  public currentLanguage$: Observable<ILang>;
  public currentLanguageSubscription: Subscription;

  public currentSuggestion: ISuggestion;
  public currentSuggestion$: Observable<ISuggestion>;
  public currentSuggestionSubscription: Subscription;

  public currentCity: ICity;
  public currentCity$: Observable<ICity>;
  public currentCitySubscription: Subscription;

  public places: any[] | null;
  public places$: Observable<IPlace[]>;
  public placesSubscription: Subscription;

  public selectedFilter: string;

  public filterButtons: any[] = [
    {
      icon: 'options'
    }
  ]

  public activeFilter: any;
  public MOCK_FILTERS: IFilter[];

  constructor(
    private store : Store,
    private route : ActivatedRoute,
    private title : Title,
    private suggestionsService : SuggestionsService,
    private navCtrl : NavController,
    private router : Router,
    private placesService : PlacesService
  ) { }

  async ngOnInit() {
    this.getCurrentCityFromNGRX();
    this.getCurrentSuggestionFromNGRX();
    this.getCurrentLanguageFromNGRX();
  }

  public ngAfterViewInit(): void {
    this.swiper = this.swiperRef?.nativeElement.swiper;
  }

  public getCurrentCityFromNGRX(): void {
    this.currentCity$ = this.store.select(AppStore.selectAppCurrentCity);

    this.currentCitySubscription = this.currentCity$
    .subscribe((city: ICity) => {
      this.currentCity = city;
        console.log(this.currentCity);

    })
  }

  public getCurrentLanguageFromNGRX(): void {
    this.currentLanguage$ = this.store.select(AppStore.selectAppCurrentLanguage);

    this.currentLanguageSubscription = this.currentLanguage$
    .subscribe((language: ILang) => {
      this.currentLanguage = language;
    })
  }

  public async initialFilter(value: string) {
    this.selectedFilter = value;
  }

  public slideSwiperTo(index: number): void {
    this.swiper?.slideTo(index, 800);
  }

  public async getCurrentSuggestionFromNGRX() {
    this.currentSuggestion$ = this.store.select(AppStore.selectCurrentSuggestion);

    this.currentSuggestionSubscription = this.currentSuggestion$
    .subscribe(async (suggestion: ISuggestion) => {
      if (suggestion.id) {
        this.currentSuggestion = suggestion;

        await this.setFilters();
        await this.initialFilter(FilterEnum.ALL);
        await this.defineActiveFilter(FilterEnum.ALL);
      } else {
        this.getSuggestionFromUrl();
      }
    })
  }

  /**
   * @description Tomar cuidado com esta função pois ela é usada em outras telas de sugestões.
   * Neste tela em específico nós não mandamos parâmetro da tela anterior, o Festival de Comida Japonesa possui rota dedicada no projeto.
   * Então "desmembramo" a url e pegamos o último "pedaço".
   */
  public getSuggestionFromUrl() {
    let urlSplited: string[] = this.router.url.split('/');
    this.lastPathFromUrl = urlSplited[urlSplited.length - 1];

    if (this.lastPathFromUrl) {
      this.title.setTitle('Festival de Comida Japonesa');

      this.suggestionsService
      .getSuggestions(CollectionsEnum.SUGGESTIONS_BAIXADA_SANTISTA, [
        { field: 'value', operator: '==', value: SuggestionsEnum.FESTIVAL_COMIDA_JAPONESA }
      ])
      .pipe((take(1)))
      .subscribe({
        next: async (suggestion: any[]) => {
          if (suggestion) {
            this.currentSuggestion = suggestion[0];

            await this.setFilters();
            await this.initialFilter(FilterEnum.ALL);
            await this.defineActiveFilter(FilterEnum.ALL);
          }
        }
      })
    } else {
      this.navCtrl.navigateBack(['/logado/sugestoes-do-anfitriao'])
    }
  }

  public back(): void {
    this.navCtrl.navigateBack(['/logado/sugestoes-do-anfitriao'])
  }

  public openFilterSelect(): void {
    this.filterSelector.open();
  }

  public filterByCharacteristic(e: any): void {
    this.defineActiveFilter(e.detail.value);
  }

  public async defineActiveFilter(value: string) {
    this.places = null;

    let filterFound = this.MOCK_FILTERS.find((filter: any) => {
      return filter.value === value;
    })

    if (filterFound) {
      this.activeFilter = filterFound;
    }

    switch (filterFound?.value) {
      case FilterEnum.ALL:
      this.getPlaces([
        { field: 'suggestions', operator: 'array-contains', value: this.currentSuggestion?.value },
        { field: 'origin.value', operator: '==', value: this.currentCity?.value }
      ]);
      break;
    }
  }

  public seePlace(place: IPlace, e: any): void {
    if (place.isBuilding) {
      e.preventDefault();
    } else {
      this.navCtrl.navigateForward(['/logado/estabelecimento/' + place.value]);
      this.store.dispatch(AppStore.setCurrentEstablishment({ establishment: place } ))
    }
  }

  public async setFilters(): Promise<IFilter[]> {
    this.MOCK_FILTERS = MOCK_FILTERS.filter((filter: IFilter) => {
      return !filter.dontShowIn.includes(this.currentSuggestion?.value)
    })

    return this.MOCK_FILTERS
  }

  public getPlaces(filters: IFIrebaseFilter[] = []) {
    this.places$ = this.placesService
      .getCollection(
        CollectionsEnum.PLACES,
        filters
      );

      this.placesSubscription = this.places$
      .subscribe((places: IPlace[]) => {
        this.places = places;
      })
  }

  public listenForSwiperForControl(ev: any): void {
    this.hideLeftControl = ev.detail[0].isBeginning;
    this.hideRightControl = ev.detail[0].isEnd;
  }

  public async scrollToTop() {
    this.japaneseFoodContent.scrollToTop(600);
  }

  public ngOnDestroy(): void {
    this.currentLanguageSubscription.unsubscribe();
    this.currentSuggestionSubscription.unsubscribe();
    //this.placesSubscription.unsubscribe();
  }

}
