import { Injectable } from '@angular/core';
import { IShortEstablishment } from 'src/app/shared/models/Establishment';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  public async orderByAdressNumberCrescent(establishments: IShortEstablishment[]) {
    return establishments.sort((a, b) => {
        // Converter o número do endereço para inteiro para comparação
        const numeroA = parseInt(a.adress.number);
        const numeroB = parseInt(b.adress.number);

        return numeroA - numeroB;
    })
  }

  public async orderByAdressNumberDecrescent(establishments: IShortEstablishment[]) {
    return establishments.sort((a, b) => {
        // Converter o número do endereço para inteiro para comparação
        const numeroA = parseInt(a.adress.number);
        const numeroB = parseInt(b.adress.number);

        return numeroB - numeroA;
    })
  }
}
