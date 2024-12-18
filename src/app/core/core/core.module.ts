import { DEFAULT_CURRENCY_CODE, isDevMode, LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { RouteReuseStrategy } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { StoreModule } from '@ngrx/store';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import { HttpClient, provideHttpClient } from '@angular/common/http';


import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { IonicStorageModule } from '@ionic/storage-angular';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { appReducer } from 'src/app/shared/store/app.state';
import { provideFirebaseApp } from '@angular/fire/app';
import { initializeApp } from 'firebase/app';
import { provideAnalytics, ScreenTrackingService } from '@angular/fire/analytics';
import { getAnalytics } from 'firebase/analytics';
import { provideFirestore } from '@angular/fire/firestore';
import { getFirestore } from 'firebase/firestore';
import { environment } from 'src/environments/environment';
// SWIPER
import { provideAuth } from '@angular/fire/auth';
import { getAuth } from 'firebase/auth';
import { userReducer } from 'src/app/shared/store/user.state';

// LOTTIE
import { provideLottieOptions } from 'ngx-lottie';
import player from 'lottie-web';

// SWIPER JS
import {register} from 'swiper/element/bundle';
register();

// NGX TRANSLATE
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

import localePt from '@angular/common/locales/pt';
registerLocaleData(localePt, 'pt-BR');

import { passiveSupport } from 'passive-events-support/src/utils'
passiveSupport({/*...*/})

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BrowserModule,
    IonicModule.forRoot(
      {
        mode: 'md',
        scrollAssist: false,
        swipeBackEnabled: false,
        innerHTMLTemplatesEnabled: true
        // scrollPadding: false
      }
    ),
    StoreModule.forRoot({
      app: appReducer,
      user: userReducer
    }),
    TranslateModule.forRoot({
      defaultLanguage: 'pt',
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    IonicStorageModule.forRoot({
      name: 'anfitrion-storage',
      storeName: 'anfitrion-store',
      dbKey: 'anfitrion-key'
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: !isDevMode()
    })
  ],
  exports: [
    IonicModule,
    BrowserModule
  ],
  providers: [
    provideHttpClient(),
    {
      provide: RouteReuseStrategy,
      useClass: IonicRouteStrategy
    },
    {
      provide: LOCALE_ID,
      useValue: "pt-BR"
    },
    {
      provide:  DEFAULT_CURRENCY_CODE,
      useValue: 'BRL'
    },
    provideFirebaseApp(() => initializeApp(environment.anfitrionFirebaseConfig)),
    provideAnalytics(() => getAnalytics()),
    ScreenTrackingService,
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
    provideLottieOptions({
      player: () => player
    })
  ],
})
export class CoreModule { }
