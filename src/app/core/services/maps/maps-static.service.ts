import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class MapsStaticService {

  private baseUrl: string = 'https://maps.googleapis.com/maps/api/staticmap'

  constructor(
    public httpClient : HttpClient
  ) { }

  /**
   * Função para obter um mapa estático do Google Maps com parâmetros dinâmicos.
   *
   * @param center Posição central do mapa (ex: "Zürich")
   * @param zoom Nível de zoom (ex: 12)
   * @param size Tamanho da imagem (ex: "400x400")
   * @param markers Marcadores a serem exibidos no mapa (ex: ["40.7128,-74.0060", "34.0522,-118.2437"])
   * @param key Chave da API do Google Maps
   * @returns URL da imagem gerada pelo mapa
   */
  public async getStaticMap(
    center: string = '',
    zoom: number = 15,
    size: string = '380x380',
    key: string = environment.googleMaps.apiKey
  ): Promise<string> {
    try {
      // Cria a string da URL com os parâmetros fornecidos
      let url = `${this.baseUrl}?center=${encodeURIComponent(center)}&zoom=${zoom}&size=${size}&key=${key}`;
      console.log('URL gerada:', url);

      // Faz a requisição para obter o mapa como um Blob
      const imageBlob = await firstValueFrom(this.httpClient.get(url, { responseType: 'blob' }));

      // Cria uma URL para a imagem (Blob URL)
      const imageUrl = URL.createObjectURL(imageBlob);
      return imageUrl;

    } catch (error: any) {
      console.error('Erro ao obter o mapa:', error);

      // Exibe mais detalhes sobre o erro
      if (error.response) {
        console.error('Erro da resposta:', error.response);
      } else if (error.message) {
        console.error('Mensagem de erro:', error.message);
      }

      throw error; // Lança o erro para ser tratado externamente, se necessário
    }
  }
}
