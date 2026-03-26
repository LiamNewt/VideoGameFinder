import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { take } from 'rxjs';
import { GameSearch } from './videogamedetails.interface';
import { GameResults } from './videogamedetails.interface';

@Injectable({
  providedIn: 'root',
})
export class GameapiService {

  private _http=inject(HttpClient);

  private _baseUrl = "https://api.rawg.io/api/";
  private _apiKey = "9dacf80d00644deab26a734dcc3d840b"

  public games = signal<GameResults[]>([]);

  getGames(name: string)
  {

    const url = `${this._baseUrl}games?search=${name}&key=${this._apiKey}`;

    this._http.get<GameSearch>(url)
    .pipe(take(1))
    .subscribe(data => {
      if (data.results){
        this.games.set(data.results);
      } else{
        this.games.set([]);
        console.log(this.games());
      }
    })
  }
}
