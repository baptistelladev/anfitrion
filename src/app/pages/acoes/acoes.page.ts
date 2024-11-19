import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { applyActionCode } from 'firebase/auth';
import { ModeEnum } from 'src/app/shared/enums/Mode';

@Component({
  selector: 'anfitrion-acoes',
  templateUrl: './acoes.page.html',
  styleUrls: ['./acoes.page.scss'],
})
export class AcoesPage implements OnInit {

  public emailIsVerified: boolean = false;
  public emailAndChangeHasVerified: boolean = false;
  public passwordIsVerified: boolean = false;

  public showResetPassword: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private auth : Auth
  ) { }

  ngOnInit(): void {
    // Obtém o parâmetro 'oobCode' da URL
    const oobCode = this.route.snapshot.queryParamMap.get('oobCode');
    const mode = this.route.snapshot.queryParamMap.get('mode');

    if (mode === ModeEnum.RESET_PASSWORD) {
      this.showResetPassword = true;
    } else {
      this.showResetPassword = false;

      if (oobCode) {
        applyActionCode(this.auth, oobCode)
        .then(() => {
          switch (mode) {
            case ModeEnum.VERIFY_AND_CHANGE_EMAIL:
              this.emailAndChangeHasVerified = true;
              break;

            case ModeEnum.VERIFY_EMAIL:
              this.emailIsVerified = true;
              break;
          }
        })
        .catch((error) => {

        });
      }
    }
  }

}
