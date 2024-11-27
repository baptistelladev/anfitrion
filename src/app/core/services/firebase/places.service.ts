import { Injectable } from '@angular/core';
import { collectionData, Firestore } from '@angular/fire/firestore';
import { collection, CollectionReference, doc, getDocs, orderBy, query, QueryConstraint, updateDoc, where } from 'firebase/firestore';
import { from, Observable } from 'rxjs';
import { IFIrebaseFilter } from 'src/app/shared/models/IFirebaseFilter';
import { IPlace } from 'src/app/shared/models/IPlace';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  constructor(
    private firestore : Firestore
  ) { }

  public getCollection(
    collectionName: string,
    filters: IFIrebaseFilter[] = [],
    orderByField: string = '',
    orderDirection: 'asc' | 'desc' = 'asc'
  ): Observable<IPlace[]> {
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
      querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as IPlace[]
    ));
  }

  public async getCollectionFilteredBy(collectionName: string, field: string): Promise<IPlace[]> {
    const itemCollection = collection(this.firestore, collectionName);
    const q = query(itemCollection, where(field, '==', true));

    const querySnapshot = await getDocs(q);

    // Aqui, você pode garantir que os dados estão no formato de IShortEstablishment
    const items: IPlace[] = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data() as IPlace // Asegure-se de que os dados correspondam à interface
    }));

    return items;
  }

  public async getDocumentByValue(collectionName: string, fieldName: string, value: string): Promise<IPlace | null> {
    try {
        const q = query(collection(this.firestore, collectionName), where(fieldName, '==', value));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            const docSnap = querySnapshot.docs[0]; // Pega o primeiro documento encontrado
            const data = docSnap.data() as IPlace; // Cast para IShortEstablishment
            return { id: docSnap.id, ...data }; // Retorna o documento com o ID
        } else {
            console.log("Documento não encontrado!");
            return null;
        }
    } catch (error) {
        console.error("Erro ao obter o documento:", error);
        return null; // Retorna null em caso de erro
    }
  }
}
