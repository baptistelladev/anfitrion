import { Injectable } from '@angular/core';
import { Firestore, getDoc } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import { IUSer } from 'src/app/shared/models/IUser';
import * as UserStore from './../../../shared/store/user.state';
import { Auth, EmailAuthProvider, sendEmailVerification, updateEmail, verifyBeforeUpdateEmail, UserCredential } from '@angular/fire/auth';
import { reauthenticateWithCredential, updatePassword, User} from 'firebase/auth';
import { throwError } from 'rxjs';
import { CollectionsEnum } from 'src/app/shared/enums/Collection';
import { doc, updateDoc } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private firestore : Firestore,
    private store : Store,
    private auth: Auth
  ) { }

  public async getUserByUID(collectionName: string, userCred: any): Promise<boolean> {
    const docRef = doc(this.firestore, collectionName, userCred.uid);
    let user: IUSer | null = null;

    try {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        await this.dispatchUser({ ...docSnap.data() as IUSer });
        this.store.dispatch(UserStore.setUserEmail({ email: userCred.email }))
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Erro ao obter o documento:", error);
      return false
    }
  }

  private dispatchUser(user: IUSer): Promise<void> {
    return new Promise((resolve) => {
      this.store.dispatch(UserStore.setUser({ user }));
      resolve();
    });
  }

  public async updateUserEmail(newEmail: string, currentPassword: string, userId: string): Promise<boolean> {
    const user = this.auth.currentUser;

    if (!user) {
      throw new Error('Usuário não autenticado');
    }

    const credential = EmailAuthProvider.credential(user.email || '', currentPassword);

    try {
      // Reautentica o usuário
      await reauthenticateWithCredential(user, credential);

      // Envia o email de verificação para o novo endereço
      await verifyBeforeUpdateEmail(user, newEmail);
      return true;
    } catch (error) {
      throw error; // Lança o erro para ser tratado pelo chamador
    }
  }
}
