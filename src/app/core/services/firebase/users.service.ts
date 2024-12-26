import { Injectable } from '@angular/core';
import { Firestore, getDoc, collection } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import { IUSer } from 'src/app/shared/models/IUser';
import * as UserStore from './../../../shared/store/user.state';
import { Auth, EmailAuthProvider, sendEmailVerification, updateEmail, verifyBeforeUpdateEmail, UserCredential } from '@angular/fire/auth';
import { reauthenticateWithCredential, updatePassword, User} from 'firebase/auth';
import { throwError } from 'rxjs';
import { CollectionsEnum } from 'src/app/shared/enums/Collection';
import { doc, updateDoc } from 'firebase/firestore';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  public today = moment();
  public eightenYearsLimitDate = this.today.subtract(18, 'years');

  constructor(
    private firestore : Firestore,
    private store : Store,
    private auth: Auth
  ) { }

  /**
   * @description Responsável por obter usuário pelo ID único.
   * @param collectionName obrigatório do tipo string - nome da coleção no firebase.
   * @param userCred credenciais geradas ao logar com o usuário.
   * @returns uma promessa do tipo boolean.
   */
  public async getUserByUID(
    collectionName: string,
    userCred: any
  ): Promise<boolean> {
    const docRef = doc(this.firestore, collectionName, userCred.uid);
    let user: IUSer | null = null;

    try {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        await this.dispatchUser({ ...docSnap.data() as IUSer });
        await this.dispatchUserEmail(userCred.email);
        await this.dispatchEighteenAccess({ ...docSnap.data() as IUSer });

        return true;
      } else {
        return false;
      }
    } catch (error) {
      return false
    }
  }

  /**
   * @description Responsável disparar as informações do usuário via ngrx para refletir no app inteiro.
   * @param user obrigatório do tipo IUser - representa as informações do usuário.
   * @returns uma promessa do tipo void.
   */
  private dispatchUser(user: IUSer): Promise<void> {
    return new Promise((resolve) => {
      this.store.dispatch(UserStore.setUser({ user }));
      resolve();
    });
  }

  /**
   * @description Responsável disparar as informações DE EMAIL do usuário via ngrx para refletir no app inteiro.
   * @param user obrigatório do tipo IUser - representa as informações do usuário.
   * @returns uma promessa do tipo void.
   */
  private dispatchUserEmail(email: string): Promise<void> {
    return new Promise((resolve) => {
      this.store.dispatch(UserStore.setUserEmail({ email: email }));
      resolve();
    });
  }

  /**
   * @description Responsável por disparar via ngrx se o usuário é maior de 18 anos e pode acessar conteúdo +18.
   * @param user obrigatório do tipo IUser - representa as informações do usuário.
   * @returns uma promessa do tipo void.
   */
  private dispatchEighteenAccess(user: IUSer): Promise<void> {
    return new Promise((resolve) => {
      if (user.birthDate && moment(user.birthDate, 'YYYY-MM-DD').isSameOrBefore(this.eightenYearsLimitDate)) {
        this.store.dispatch(UserStore.setEighteenAccess({ canAccessEighteenContent: true }));
      } else {
        this.store.dispatch(UserStore.setEighteenAccess({ canAccessEighteenContent: false }));
      }

      resolve();
    });
  }

  /**
   * @description Responsável por atualizar as informações de usuário MAS SOMENTE AS PRINCIPAIS DO PERFIL.
   * @param userJustMainInfo obrigatório do tipo string - nome da coleção no firebase.
   * @returns uma promessa do tipo boolean.
   */
  private dispatchUpdateUserJustMainInfo(userJustMainInfo: any): Promise<void> {
    return new Promise((resolve) => {
      this.store.dispatch(UserStore.updateUserJustMainInfo({ userJustMainInfo: userJustMainInfo }));
      resolve();
    });
  }

  /**
   * @description Responsável por atualizar as informações de usuário MAS SOMENTE O E-MAIL.
   * @param userJustMainInfo obrigatório do tipo string - nome da coleção no firebase.
   * @returns uma promessa do tipo boolean.
   */
  public async updateUserEmail(newEmail: string, currentPassword: string, userId: string): Promise<boolean> {
    const user = this.auth.currentUser;

    if (!user) {
      throw new Error('Usuário não autenticado');
    }

    const credential = EmailAuthProvider.credential(user.email || '', currentPassword);

    try {
      await reauthenticateWithCredential(user, credential);
      await verifyBeforeUpdateEmail(user, newEmail);
      return true;
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description Responsável por atualizar os dados do usuário.
   * @param docId obrigatório do tipo string - id da conta do usuário.
   * @param userInfo obrigatório do tipo any - dados do usuário.
   * @returns uma promessa do tipo void.
   */
  public async updateUserInfo(docId: string, userInfo: any): Promise<void> {
    try {
      const docRef = doc(this.firestore, CollectionsEnum.USERS, docId);
      await updateDoc(docRef, userInfo);
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        let userJustMainInfo = {
          firstName: userInfo.firstName,
          lastName: userInfo.lastName,
          birthDate: userInfo.birthDate,
          userType: userInfo.userType,
          sex: userInfo.sex
        }

        await this.dispatchUpdateUserJustMainInfo(userJustMainInfo);
      }
    } catch (error) {
      throw error;
    }
  }
}
