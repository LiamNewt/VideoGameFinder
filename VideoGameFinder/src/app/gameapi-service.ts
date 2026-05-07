import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { take } from 'rxjs';
import { GameDetails, GameScreenshots, GameSearch, Genres, Platform} from './videogamedetails.interface';
import { GameResults } from './videogamedetails.interface';

@Injectable({
  providedIn: 'root',
})
export class GameapiService {

  private _http=inject(HttpClient);

  private _baseUrl = "https://api.rawg.io/api/";
  private _apiKey = "9dacf80d00644deab26a734dcc3d840b"

  private _lastTrendSearch = "";
  private _lastSearch = "";

  public games = signal<GameResults[]>([]);
  public game = signal<GameDetails | null>(null);
  public genres = signal<Genres | null>(null);


  public screenshots = signal<GameScreenshots | null>(null);
  //Trending
  public trendingGames = signal<GameResults[]>([]);
  public currentTrendPage = signal(1);
  public maxTrendPage = signal(1);
  //All Games
  public totalResults = signal(0);
  public currentPage = signal(1);
  public maxPages = signal(1);

  resultsPerPage = 9;



  getGames(name: string)
  {
    this._lastSearch = name;
    const url = `${this._baseUrl}games?search=${name}&page=${this.currentPage()}&key=${this._apiKey}`;

    this._http.get<GameSearch>(url)
    .pipe(take(1))
    .subscribe(data => {
      if (data.results){
        this.games.set(data.results);
      } else{
        this.games.set([]);
        console.log(this.games());
      }

      const total = Number(data.count || 0);

      this.totalResults.set(total);

      this.maxPages.set(
        Math.ceil(total / this.resultsPerPage)
      );  
    })
  }

  getTrending(){
    const url = `${this._baseUrl}games?dates=2025-01-01,2026-12-31&ordering=-added&key=${this._apiKey}`;

    this._http.get<GameSearch>(url)
    .pipe(take(1))
    .subscribe(data => {
      if (data.results){
        this.trendingGames.set(data.results);
      } else{
        this.trendingGames.set([]);
        console.log(this.trendingGames());
      }
    })
  }

  getGameByID(id: string)
  {
    const url = `${this._baseUrl}games/${id}?key=${this._apiKey}`;

    this._http.get<GameDetails>(url)
    .pipe(take(1))
    .subscribe(data => {
      this.game.set(data);
      console.log(this.game());
    })
  }

  getGenres()
  {
    const url = `${this._baseUrl}genres?key=${this._apiKey}`;

    this._http.get<Genres>(url)
    .pipe(take(1))
    .subscribe(data => {
      this.genres.set(data);
      console.log(this.genres());
    })
  }

  getPlatforms()
  {

  }

  getGameScreenshots(id: string)
  {
    const url = `${this._baseUrl}games/${id}/screenshots?key=${this._apiKey}`;

    this._http.get<GameScreenshots>(url)
    .pipe(take(1))
    .subscribe(data => {
      this.screenshots.set(data);
      console.log(this.screenshots());
    })
  }

  nextPage() {
    if (this.currentPage() < this.maxPages()){
      this.currentPage.update(page => page + 1);
      this.getGames(this._lastSearch);
    }
  }

  previousPage(){
    if (this.currentPage() > 1){
      this.currentPage.update(page => page - 1);
      this.getGames(this._lastSearch);
    }
  }



}
