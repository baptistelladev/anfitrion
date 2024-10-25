import { Component, OnDestroy, OnInit, Renderer2, AfterViewInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'rgs-bem-vindo-a-baixada-santista',
  templateUrl: './bem-vindo-a-baixada-santista.page.html',
  styleUrls: ['./bem-vindo-a-baixada-santista.page.scss'],
})
export class BemVindoABaixadaSantistaPage implements OnInit, AfterViewInit {

  constructor(
    private navCtrl : NavController
  ) { }

  ngOnInit() {

  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.navCtrl.navigateForward(['/logado/explorar']);
    }, 3000);
  }

}
