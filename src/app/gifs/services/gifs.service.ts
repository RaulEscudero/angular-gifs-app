import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SearchResponse, Gif } from '../interfaces/gifs.interfaces';

@Injectable({ providedIn: 'root' })
export class GifsService {

  public gifsList: Gif[] = [];

  private _tagsHistory: string[] = [];
  private apiKey: string = 'H3C3ULBYaCgWK5aUW7IO7EULnPFOANuQ';
  private serviceUrl: string = 'https://api.giphy.com/v1/gifs';

  constructor(private http: HttpClient) {
    this.loadLocalStorage();
  }

  get tagHistory() {
    return [...this._tagsHistory];
  }

  public searchTag(tag: string): void {
    // quitamos blancos
    if (tag.length === 0) return;
    // quitar repetidos
    // maximo 10
    this.organizeHistory(tag);

    const params = new HttpParams()
      .set('apiKey', this.apiKey)
      .set('limit', '10')
      .set('q', tag);

    this.http.get<SearchResponse>(`${this.serviceUrl}/search`, { params })
      .subscribe(resp => {
        this.gifsList = resp.data;

      });

    // otra manera de hacer la llamada al servicio
    //fetch('http://api.giphy.com/v1/gifs/search?apiKey=H3C3ULBYaCgWK5aUW7IO7EULnPFOANuQ&q=valorant&limit=10')
    //.then( resp => resp.json)
    //.then (data => console.log(data));
  }

  private organizeHistory(tag: string): void {
    tag = tag.toLowerCase();
    if (this._tagsHistory.includes(tag)) {
      this._tagsHistory = this._tagsHistory.filter((oldTag) => oldTag !== tag);
    }
    this._tagsHistory.unshift(tag);
    this._tagsHistory = this._tagsHistory.splice(0, 10);
    this.saveLocalStorage();
  }

  private saveLocalStorage(): void {
    localStorage.setItem('history', JSON.stringify(this._tagsHistory));
  }

  private loadLocalStorage(): void {
    // si no hay datos
    if (!localStorage.getItem('history')) return;

    this._tagsHistory = JSON.parse(localStorage.getItem('history')!);

    if (this._tagsHistory.length === 0) return;
    this.searchTag(this._tagsHistory[0]);
  }

}
