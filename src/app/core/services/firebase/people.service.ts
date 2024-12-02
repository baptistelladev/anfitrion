import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { collection, CollectionReference, getDocs, orderBy, query, QueryConstraint, where } from 'firebase/firestore';
import { from, Observable } from 'rxjs';
import { IFIrebaseFilter } from 'src/app/shared/models/IFirebaseFilter';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {

  constructor(
    private firestore : Firestore
  ) { }

  public getCollection(
    collectionName: string,
    filters: IFIrebaseFilter[] = [],
    orderByField: string = '',
    orderDirection: 'asc' | 'desc' = 'asc'
  ): Observable<any[]> {
    // Cria a referência da coleção
    const colRef = collection(this.firestore, collectionName) as CollectionReference;

    // Constrói a lista de restrições da consulta
    const queryConstraints: QueryConstraint[] = filters.map(filter =>
      where(filter.field, filter.operator, filter.value)
    );

    if (orderByField) {
      // Verifica se a consulta já possui um orderBy
      const hasOrderBy = queryConstraints.some(constraint => constraint instanceof QueryConstraint && constraint.type === 'orderBy');

      if (!hasOrderBy) {
        queryConstraints.push(orderBy(orderByField, orderDirection));
      }
    }

    // Cria a consulta com todos os filtros
    const q = query(colRef, ...queryConstraints);

    // Converte a `Promise` resultante do `getDocs` em um `Observable`
    return from(getDocs(q).then(querySnapshot =>
      querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as any[]
    ));
  }
}
