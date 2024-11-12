import { Component, OnInit } from '@angular/core';
import { applyActionCode, Auth } from '@angular/fire/auth';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'anfitrion-verificar-alteracao-de-email',
  templateUrl: './verificar-alteracao-de-email.page.html',
  styleUrls: ['./verificar-alteracao-de-email.page.scss'],
})
export class VerificarAlteracaoDeEmailPage implements OnInit {

  public status: string = 'Aguarde, estamos verificando seu e-mail...';

  constructor(
    private route: ActivatedRoute,
    private auth : Auth
  ) { }

  ngOnInit(): void {
    // Obtém o parâmetro 'oobCode' da URL
    const oobCode = this.route.snapshot.queryParamMap.get('oobCode');

    if (oobCode) {
      this.verifyEmail(oobCode);
    } else {
      this.status = 'Link de verificação inválido.';
    }
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
