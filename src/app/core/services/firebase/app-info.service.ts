import { Injectable } from '@angular/core';
import { Firestore, getDoc } from '@angular/fire/firestore';
import { doc } from 'firebase/firestore';
import { IAppInfo } from 'src/app/shared/models/AppInfo';

@Injectable({
  providedIn: 'root'
})
export class AppInfoService {

  constructor(
    private firestore : Firestore
  ) { }

  public async getDocument(collectionName: string, documentId: string): Promise<IAppInfo | undefined> {
    const itemDocument = doc(this.firestore, collectionName, documentId);

    return getDoc(itemDocument)
      .then((docSnap) => {
        if (docSnap.exists()) {
          return docSnap.data() as IAppInfo; // Retorna os dados do documento
        } else {
          return undefined; // Retorna undefined se o documento não existir
        }
      })
      .catch((error) => {
        throw error; // Lança o erro para que possa ser tratado pelo chamador
      });
  }
}
