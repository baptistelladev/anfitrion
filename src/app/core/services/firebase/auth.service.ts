import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword, signOut, UserCredential } from '@angular/fire/auth';
import { NavController } from '@ionic/angular';
import { Observable, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public authState$: Observable<any>;
  public authStateSubscription: Subscription;

  constructor(private afAuth: Auth, private navCtrl : NavController) { }

  public async createUserWithEmailAndPassword(email: string, password: string): Promise<any> {
    try {
      const userCredential = await createUserWithEmailAndPassword(this.afAuth, email, password);
      return userCredential;
    } catch (error) {
      console.log(error);
      const errorMessage = this.getFirebaseErrorMessage(error);
      throw errorMessage;
    }
  }

  public async signInWithEmailAndPassword(email: string, password: string): Promise<any> {
    try {
      const userCredential = await signInWithEmailAndPassword(this.afAuth, email, password);
      return userCredential.user;
    } catch (error) {
      console.log(error);
      const errorMessage = this.getFirebaseErrorMessage(error);
      throw errorMessage;
    }
  }

  public async logout(): Promise<any> {
    try {
      await signOut(this.afAuth);
      console.log('Deslogou');
      return true;
    } catch (error) {
      console.log(error);
      const errorMessage = this.getFirebaseErrorMessage(error);
      throw errorMessage;
    }
  }

  public async recoverPassword(email: string): Promise<any> {
    try {
      await sendPasswordResetEmail(this.afAuth, email);
      return true;
    } catch (error) {
      console.log(error);
      const errorMessage = this.getFirebaseErrorMessage(error);
      throw errorMessage;
    }
  }

  private getFirebaseErrorMessage(error: any): string {

    switch (error.code) {
      case 'auth/email-already-in-use':
        return 'Este e-mail já está em uso.';
      case 'auth/invalid-email':
        return 'O e-mail fornecido é inválido.';
      case 'auth/weak-password':
        return 'A senha deve ter pelo menos 6 caracteres.';
      case 'auth/invalid-credential':
        return 'E-mail ou senha inválido.';
      // Adicione outros casos conforme necessário
      default:
        return 'Erro desconhecido. Tente novamente mais tarde.';
    }
  }
}
