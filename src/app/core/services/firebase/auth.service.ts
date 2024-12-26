import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Auth, confirmPasswordReset, createUserWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signOut, UserCredential } from '@angular/fire/auth';
import { collection, doc, Firestore, setDoc } from '@angular/fire/firestore';
import { NavController } from '@ionic/angular';
import { addDoc } from 'firebase/firestore';
import { Observable, Subscription } from 'rxjs';
import { CollectionsEnum } from 'src/app/shared/enums/Collection';
import { IUSer } from 'src/app/shared/models/IUser';
import { StorageService } from '../storage.service';
import { USER_ID } from 'src/app/shared/consts/keys';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public authState$: Observable<any>;
  public authStateSubscription: Subscription;

  constructor(
    private afAuth: Auth,
    private navCtrl : NavController,
    private firestore : Firestore,
    private storageService : StorageService
  ) { }

  public async createUserWithEmailAndPassword(email: string, password: string, userInfo: IUSer ): Promise<any> {
    try {
      const userCredential = await createUserWithEmailAndPassword(this.afAuth, email, password);
      const user = userCredential.user;

      await setDoc(doc(this.firestore, CollectionsEnum.USERS, user.uid), {
        uid: user.uid,
        createdAt: user.metadata.creationTime,
        ...userInfo
      })

      await sendEmailVerification(user);

      return user
    } catch (error) {
      const errorMessage = this.getFirebaseErrorMessage(error);
      throw errorMessage;
    }
  }

  public async signInWithEmailAndPassword(email: string, password: string): Promise<any> {
    try {
      const userCredential = await signInWithEmailAndPassword(this.afAuth, email, password);
      await this.storageService.setStorageKey(USER_ID, userCredential.user.uid);
      return userCredential.user;
    } catch (error) {
      const errorMessage = this.getFirebaseErrorMessage(error);
      throw errorMessage;
    }
  }

  public async logout(): Promise<any> {
    try {
      await signOut(this.afAuth);
      return true;
    } catch (error) {
      const errorMessage = this.getFirebaseErrorMessage(error);
      throw errorMessage;
    }
  }

  public async recoverPassword(email: string): Promise<any> {
    try {
      await sendPasswordResetEmail(this.afAuth, email);
      return true;
    } catch (error) {
      const errorMessage = this.getFirebaseErrorMessage(error);
      throw errorMessage;
    }
  }

  public async confirmNewPassword(obbCode: string, newPassword: string): Promise<any> {
    try {
      const auth = this.afAuth;
      await confirmPasswordReset(auth, obbCode, newPassword);
    } catch (error: any) {
      return error
    }
  }

  private getFirebaseErrorMessage(error: any): any {

    let errorObj: { text: any, error: any } = { text: null, error: error };

    switch (error.code) {
      case 'auth/email-already-in-use':
        return errorObj = {
          error: error,
          text: {
            pt: 'O e-mail informado já está sendo usado',
            en: 'The email provided is already in use',
            es: 'El correo electrónico proporcionado ya está en uso'
          }
        }
      case 'auth/invalid-email':
        return errorObj = {
          error: error,
          text: {
            pt: 'O e-mail fornecido é inválido',
            en: 'The provided email is invalid',
            es: 'El correo electrónico proporcionado es inválido'
          }
        }
      case 'auth/weak-password':
        return errorObj = {
          error: error,
          text: {
            pt: 'A senha deve ter pelo menos 6 caracteres',
            en: 'The password must be at least 6 characters long',
            es: 'La contraseña debe tener al menos 6 caracteres'
          }
        }
      case 'auth/invalid-credential':
        return errorObj = {
          error: error,
          text: {
            pt: 'E-mail ou senha inválido',
            en: 'Invalid email or password',
            es: 'Correo electrónico o contraseña inválido'
          }
        }
      default:
        return errorObj = {
          error: error,
          text: {
            pt: 'Erro desconhecido. Tente novamente mais tarde',
            en: 'Unknown error. Please try again later',
            es: 'Error desconocido. Intente de nuevo más tarde'
          }
        }
    }
  }
}
