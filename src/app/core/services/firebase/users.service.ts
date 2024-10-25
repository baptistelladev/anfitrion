import { Injectable } from '@angular/core';
import { doc, Firestore, getDoc } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import { IUSer } from 'src/app/shared/models/IUser';
import * as UserStore from './../../../shared/store/user.state';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private firestore : Firestore,
    private store : Store
  ) { }

  public async getUserByUID(collectionName: string, docId: string): Promise<boolean> {
    const docRef = doc(this.firestore, collectionName, docId);
    let user: IUSer | null = null;

    try {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        user = docSnap.data() as IUSer;

        await this.dispatchUser(user);
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
}
