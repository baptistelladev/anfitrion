import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { collection, query, where, getDocs, QueryConstraint, getDoc, CollectionReference, WhereFilterOp, doc, DocumentReference, orderBy } from 'firebase/firestore';
import { from, Observable } from 'rxjs';
import { IFIrebaseFilter } from 'src/app/shared/models/IFirebaseFilter';
import { ISuggestion } from 'src/app/shared/models/ISuggestion';

@Injectable({
  providedIn: 'root'
})
export class SuggestionsService {

  constructor(
    public firestore : Firestore
  ) { }

  public getSuggestions(
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
      querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    ));
  }

  public async getSuggestionsFilteredByValue(collectionName: string, value: string): Promise<ISuggestion | null> {
    try {
      const q = query(collection(this.firestore, collectionName), where('value', '==', value));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const docSnap = querySnapshot.docs[0]; // Pega o primeiro documento encontrado
        const data = docSnap.data() as ISuggestion; // Cast para IShortEstablishment
        return { id: docSnap.id, ...data }; // Retorna o documento com o ID
      } else {
        return null;
    }
    } catch (error) {
      return null; // Retorna null em caso de erro
    }
  }
}
