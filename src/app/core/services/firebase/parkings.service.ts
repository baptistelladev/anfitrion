import { Injectable } from '@angular/core';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { IShortParking } from 'src/app/shared/models/IParking';

@Injectable({
  providedIn: 'root'
})
export class ParkingsService {

  constructor(
    private firestore : Firestore
  ) {};

  public getCollection(collectionName: string): Observable<IShortParking[]> {
    const itemCollection = collection(this.firestore, collectionName);
    return collectionData<any>(itemCollection);
  }
}
