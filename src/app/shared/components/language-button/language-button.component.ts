import { Component, Input, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ILang } from '../../models/ILang';

@Component({
  selector: 'anfitrion-language-button',
  templateUrl: './language-button.component.html',
  styleUrls: ['./language-button.component.scss'],
})
export class LanguageButtonComponent  implements OnInit {

  @Input() currentLanguage?: ILang;

  constructor(
    private navCtrl : NavController
  ) { }

  ngOnInit() {}

  public switchLanguage(): void {
    this.navCtrl.navigateForward(['/trocar-idioma'])
  }

}
