import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'anfitrion-ajude-nosso-projeto',
  templateUrl: './ajude-nosso-projeto.page.html',
  styleUrls: ['./ajude-nosso-projeto.page.scss'],
})
export class AjudeNossoProjetoPage implements OnInit {

  constructor(private navCtrl : NavController) { }

  ngOnInit() {
  }

  public back(): void {
    this.navCtrl.back()
  }

}
