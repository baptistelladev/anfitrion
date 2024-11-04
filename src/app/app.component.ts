import { AppInfoService } from './core/services/firebase/app-info.service';
import {  Component, OnInit } from '@angular/core';
import { StorageService } from './core/services/storage.service';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import * as AppStore from './shared/store/app.state'
import { APP_LANG_KEY, CURRENT_CITY } from './shared/consts/keys';
import { ILang } from './shared/models/ILang';
import { MOCK_LANGS } from './shared/mocks/MockLangs';
import { IAppInfo } from './shared/models/IAppInfo';
import { CollectionsEnum } from './shared/enums/Collection';
import { ICity } from './shared/models/ICity';
import { MOCK_CITIES } from './shared/mocks/MockCities';
import { ActionPerformed, PushNotificationSchema, PushNotifications, Token } from '@capacitor/push-notifications';
import { StatusBar, Style } from '@capacitor/status-bar';
import { Platform } from '@ionic/angular';
import { ConnectionService } from './core/services/connection.service';
import * as moment from 'moment';


@Component({
  selector: 'anfitrion-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  public openModalLanguage: boolean = false;
  public MOCK_LANGS: ILang[] = MOCK_LANGS;
  public MOCK_CITIES: ICity[] = MOCK_CITIES;

  public currentLanguage: ILang;
  public currentCity: ICity;

  constructor(
    private storageService : StorageService,
    private translate : TranslateService,
    private store : Store,
    private appInfoService : AppInfoService,
    private platform : Platform,
    private connectionService : ConnectionService
  ) {}

  async ngOnInit() {

    await this.platform.ready()
    .then(async (res: string) => {
      this.getAppInfo();

      await this.storageService.createStorage();

      await this.storageService.getStorageKey(APP_LANG_KEY).then((res: string) => {
        if (res === null || !res) {

          let foundLang = MOCK_LANGS.find((lang: ILang) => {
            return lang.value === 'pt';
          })

          if (foundLang) {
            this.currentLanguage = foundLang;
          }

          this.translate.use(this.currentLanguage.value);
          this.storageService.setStorageKey(APP_LANG_KEY, this.currentLanguage.value);
          this.store.dispatch(AppStore.setCurrentLanguage({ language: this.currentLanguage }));
        } else {
          let foundLang = MOCK_LANGS.find((lang: ILang) => {
            return lang.value === res;
          })

          if (foundLang) {
            this.currentLanguage = foundLang;
          }

          this.translate.use(this.currentLanguage.value);
          this.storageService.setStorageKey(APP_LANG_KEY, this.currentLanguage.value);
          this.store.dispatch(AppStore.setCurrentLanguage({ language: this.currentLanguage }));
        }
      })

      await this.storageService.getStorageKey(CURRENT_CITY).then((res: string) => {
        if (res === null || !res) {

          let foundCity = this.MOCK_CITIES.find((city: ICity) => {
            return city.value === 'SANTOS';
          })

          if (foundCity) {
            this.currentCity = foundCity;
          }

          this.storageService.setStorageKey(CURRENT_CITY, this.currentCity.value)
          this.store.dispatch(AppStore.setCurrentCity({ city: this.currentCity }));

        } else {
          let foundCity = this.MOCK_CITIES.find((city: ICity) => {
            return city.value === res;
          })

          if (foundCity) {
            this.currentCity = foundCity;
          }

          this.storageService.setStorageKey(CURRENT_CITY, this.currentCity.value)
          this.store.dispatch(AppStore.setCurrentCity({ city: this.currentCity }));
        }
      })

      switch (this.currentLanguage.value) {
        case 'pt':
          moment.locale('pt-BR')
          break;

        default:
          moment.locale(this.currentLanguage.value)
          break;
      }

      if (this.platform.is('mobile') ) {
        await this.initializePushNotifications();
        this.setStatusBarLook();
      }
    })
  }

  public setStatusBarLook(): void {
    StatusBar.setBackgroundColor({ color: '#222222' });
    StatusBar.setStyle({ style: Style.Dark });
  }

  public understood(): void {
    this.openModalLanguage = false;
    this.storageService.setStorageKey(APP_LANG_KEY, this.currentLanguage.value);
  }

  private async getAppInfo() {
    await this.appInfoService.getDocument(CollectionsEnum.APP_INFO, 'svHoTfx0UNjeFfJ1HPud')
    .then((appInfo: IAppInfo | undefined) => {
      if (appInfo) {
        // TIVE QUE FAZER ISSO PARA O TSLINT ACEITAR VÁRIOS DISPATCH
        if (appInfo.networks) { this.store.dispatch(AppStore.setAppInfoNetworks({ networks: appInfo.networks })); }
        if (appInfo.contact) { this.store.dispatch(AppStore.setAppInfoContact({ contact: appInfo.contact })); }
      }
    })
  }

  private async initializePushNotifications() {
    console.log('Initializing Push Notifications');

    try {
      const permissions = await PushNotifications.requestPermissions();
      if (permissions.receive === 'granted') {
        await PushNotifications.register();
        this.setupPushListeners();
        console.log('Push notifications registered successfully');
      } else {
        console.warn('Push notifications permission not granted');
      }
    } catch (error) {
      console.error('Error requesting push notifications permissions:', error);
    }
  }

  private setupPushListeners() {
    // Listener for successful registration
    PushNotifications.addListener('registration', (token: Token) => {
      alert(token.value);
    });

    // Listener for registration errors
    PushNotifications.addListener('registrationError', (error: any) => {
      console.error('Error on push registration:', error);
    });

    // Listener for received notifications when app is open
    PushNotifications.addListener('pushNotificationReceived', (notification: PushNotificationSchema) => {
      console.log('Push notification received:', notification);
    });

    // Listener for action performed on notification
    PushNotifications.addListener('pushNotificationActionPerformed', (notification: ActionPerformed) => {
      console.log('Push notification action performed:', notification);
    });
  }
}
