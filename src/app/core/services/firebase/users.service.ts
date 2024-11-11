import { Injectable } from '@angular/core';
import { doc, Firestore, getDoc } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import { IUSer } from 'src/app/shared/models/IUser';
import * as UserStore from './../../../shared/store/user.state';
import { Auth, EmailAuthProvider, sendEmailVerification, updateEmail, verifyBeforeUpdateEmail } from '@angular/fire/auth';
import { reauthenticateWithCredential, UserCredential } from 'firebase/auth';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private firestore : Firestore,
    private store : Store,
    private auth: Auth
  ) { }

  public async getUserByUID(collectionName: string, docId: string): Promise<boolean> {
    const docRef = doc(this.firestore, collectionName, docId);
    let user: IUSer | null = null;

    try {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        await this.dispatchUser({ ...docSnap.data() as IUSer });
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

  public async updateUserEmail(newEmail: string, currentPassword: string): Promise<boolean> {
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

      console.log('Email de verificação enviado para o novo email!');
      return true;
    } catch (error) {
      console.error('Erro ao atualizar o e-mail:', error);
      throw error; // Lança o erro para ser tratado pelo chamador
    }
  }
}
