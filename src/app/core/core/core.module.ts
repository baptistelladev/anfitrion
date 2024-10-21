import { DEFAULT_CURRENCY_CODE, isDevMode, LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
import {register} from 'swiper/element/bundle';
import { provideAuth } from '@angular/fire/auth';
import { getAuth } from 'firebase/auth';
register();

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

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
      app: appReducer
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
      name: 'rgs-storage',
      storeName: 'rgs-store',
      dbKey: 'rgs-key'
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
    provideFirebaseApp(() => initializeApp(environment.firebaseCfg)),
    provideAnalytics(() => getAnalytics()),
    ScreenTrackingService,
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth())
  ],
})
export class CoreModule { }
