import { AppInfoService } from './core/services/firebase/app-info.service';
import {  Component, OnInit } from '@angular/core';
import { StorageService } from './core/services/storage.service';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import * as AppStore from './shared/store/app.state'
import { APP_LANG_KEY } from './shared/consts/keys';
import { ILang } from './shared/models/ILang';
import { MOCK_LANGS } from './shared/mocks/MockLangs';
import { IAppInfo } from './shared/models/IAppInfo';
import { CollectionsEnum } from './shared/enums/Collection';

@Component({
  selector: 'rgs-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  public openModalLanguage: boolean = false;
  public MOCK_LANGS: ILang[] = MOCK_LANGS;
  public currentLanguage: ILang;

  constructor(
    private storageService : StorageService,
    private translate : TranslateService,
    private store : Store,
    private appInfoService : AppInfoService
  ) {}

  async ngOnInit() {
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
        this.store.dispatch(AppStore.setCurrentLanguage({ language: this.currentLanguage }));
      } else {
        let foundLang = MOCK_LANGS.find((lang: ILang) => {
          return lang.value === res;
        })

        if (foundLang) {
          this.currentLanguage = foundLang;
        }

        this.translate.use(this.currentLanguage.value);
        this.store.dispatch(AppStore.setCurrentLanguage({ language: this.currentLanguage }));
      }
    })

    /*
    console.info(
      `\n%c⚠️ Xô rapaliga ⚠️%c \n${'vai trabalhar,vai...'} \n\n%cFica inspecionando código alheio.\nJá que você é curioso, pelo menos segue no insta https://www.instagram.com/ruagastronomicadesantos/`,
      "color:#ceb73f; background: #ceb73f33; font-size:1.5rem; padding: 20px 20px 16px 20px; margin: 1rem auto; font-family: Rockwell, Tahoma, 'Trebuchet MS', Helvetica; border: 2px solid #ceb73f; border-radius: 4px; font-weight: bold; text-shadow: 1px 1px 1px #000000bf;",
      'font-weight: bold; font-size: 1rem;color: #ceb73f;',
      "color: #ceb73f; font-size: 0.75rem; font-family: Tahoma, 'Trebuchet MS', Helvetica;",
    );
    */
  }

  public understood(): void {
    this.openModalLanguage = false;
    this.storageService.setStorageKey(APP_LANG_KEY, this.currentLanguage.value);
  }

  public async getAppInfo() {
    await this.appInfoService.getDocument(CollectionsEnum.APP_INFO, 'svHoTfx0UNjeFfJ1HPud')
    .then((appInfo: IAppInfo | undefined) => {
      if (appInfo) {
        // TIVE QUE FAZER ISSO PARA O TSLINT ACEITAR VÁRIOS DISPATCH
        if (appInfo.networks) { this.store.dispatch(AppStore.setAppInfoNetworks({ networks: appInfo.networks })); }
        if (appInfo.contact) { this.store.dispatch(AppStore.setAppInfoContact({ contact: appInfo.contact })); }
      }
    })
  }
}
