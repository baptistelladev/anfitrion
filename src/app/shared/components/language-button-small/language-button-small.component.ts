import { Component, Input, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ILang } from '../../models/ILang';

@Component({
  selector: 'anfitrion-language-button-small',
  templateUrl: './language-button-small.component.html',
  styleUrls: ['./language-button-small.component.scss'],
})
export class LanguageButtonSmallComponent  implements OnInit {

  @Input() currentLanguage: ILang;
  @Input() color: string = 'gray-text';

  constructor(
    private navCtrl : NavController
  ) { }

  ngOnInit() {
  }

  public navToChangeLang(): void {
    this.navCtrl.navigateForward(['/trocar-idioma']);
  }
}
