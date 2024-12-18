import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { collection, CollectionReference, getDocs, onSnapshot, orderBy, query, QueryConstraint, where } from 'firebase/firestore';
import { from, Observable } from 'rxjs';
import { IFirebaseFilter } from 'src/app/shared/models/IFirebaseFilter';
import { IPlace } from 'src/app/shared/models/IPlace';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {

  constructor(
    private firestore : Firestore
  ) { }

  public getCollection(
    collectionName: string,
    filters: IFirebaseFilter[] = [],
    orderByField: string = '',
    orderDirection: 'asc' | 'desc' = 'asc'
  ): Observable<any[]> {
    // Cria a referência da coleção
    const colRef = collection(this.firestore, collectionName);

    // Constrói a lista de restrições da consulta
    const queryConstraints: QueryConstraint[] = filters.map(filter =>
      where(filter.field, filter.operator, filter.value)
    );

    if (orderByField) {
      queryConstraints.push(orderBy(orderByField, orderDirection));
    }

    // Cria a consulta com todos os filtros
    const q = query(colRef, ...queryConstraints);

    // Converte o onSnapshot em um Observable para refletir atualizações em tempo real
    return new Observable<IPlace[]>(observer => {
      onSnapshot(q, querySnapshot => {
        const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as IPlace));
        observer.next(data);
      }, error => {
        observer.error(error);
      });
    });
  }
}
