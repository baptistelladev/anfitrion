import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { collection, query, where, getDocs, QueryConstraint, getDoc, CollectionReference, WhereFilterOp } from 'firebase/firestore';
import { from, Observable } from 'rxjs';
import { IFIrebaseFilter } from 'src/app/shared/models/IFirebaseFilter';

@Injectable({
  providedIn: 'root'
})
export class SuggestionsService {

  constructor(
    public firestore : Firestore
  ) { }

  public getSuggestions(
    collectionName: string,
    filters: IFIrebaseFilter[] = []
  ): Observable<any[]> {
    // Cria a referência da coleção
    const colRef = collection(this.firestore, collectionName) as CollectionReference;

    // Constrói a lista de restrições da consulta
    const queryConstraints: QueryConstraint[] = filters.map(filter =>
      where(filter.field, filter.operator, filter.value)
    );

    // Cria a consulta com todos os filtros
    const q = query(colRef, ...queryConstraints);

    // Converte a `Promise` resultante do `getDocs` em um `Observable`
    return from(getDocs(q).then(querySnapshot =>
      querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    ));
  }


}
