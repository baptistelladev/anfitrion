import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { collection, query, where, getDocs, QueryConstraint, getDoc, CollectionReference, WhereFilterOp, doc, DocumentReference, orderBy, onSnapshot } from 'firebase/firestore';
import { from, Observable } from 'rxjs';
import { IFirebaseFilter } from 'src/app/shared/models/IFirebaseFilter';
import { ISuggestion } from 'src/app/shared/models/ISuggestion';

@Injectable({
  providedIn: 'root'
})
export class SuggestionsService {

  constructor(
    public firestore : Firestore
  ) { }

  /**
   * @description Responsável por recuperar as todas as sugestões.
   * @param collectionName obrigatório do tipo string - nome da coleção no firebase.
   * @param filters obrigatório do tipo IFirebaseFilter[] - representa uma lista com filtros do firebase.
   * @returns um Observable que representa a lista do tipo ISuggestion.
   */
  public getSuggestionsCollection(
    collectionName: string,
    filters: IFirebaseFilter[] = []
  ): Observable<ISuggestion[]> {
    const colRef = collection(this.firestore, collectionName) as CollectionReference;

    const queryConstraints: QueryConstraint[] = filters.map(filter =>
      where(filter.field, filter.operator, filter.value)
    );

    const q = query(colRef, ...queryConstraints);

    return new Observable<ISuggestion[]>(observer => {
      const unsubscribe = onSnapshot(
        q,
        querySnapshot => {
          const data = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          })) as ISuggestion[];

          observer.next(data);
        },
        error => {
          observer.error(error);
        }
      );

      return () => unsubscribe();
    });
  }

  public async getSuggestionsFilteredByValue(collectionName: string, value: string): Promise<ISuggestion | null> {
    try {
      const q = query(collection(this.firestore, collectionName), where('value', '==', value));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const docSnap = querySnapshot.docs[0];
        const data = docSnap.data() as ISuggestion;
        return { ...data };
      } else {
        return null;
    }
    } catch (error) {
      return null;
    }
  }
}
