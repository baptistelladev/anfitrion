import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { applyActionCode } from 'firebase/auth';

@Component({
  selector: 'anfitrion-acoes',
  templateUrl: './acoes.page.html',
  styleUrls: ['./acoes.page.scss'],
})
export class AcoesPage implements OnInit {

  public status: string = 'Aguarde';

  constructor(
    private route: ActivatedRoute,
    private auth : Auth
  ) { }

  ngOnInit(): void {
    // Obtém o parâmetro 'oobCode' da URL
    const oobCode = this.route.snapshot.queryParamMap.get('oobCode');
    const mode = this.route.snapshot.queryParamMap.get('mode');

    console.log(mode);

  }

  private verifyEmail(oobCode: string): void {
    applyActionCode(this.auth, oobCode)
      .then(() => {
        this.status = 'E-mail verificado com sucesso!';
      })
      .catch((error) => {
        this.status = `Erro ao verificar e-mail: ${error.message}`;
      });
  }

}
