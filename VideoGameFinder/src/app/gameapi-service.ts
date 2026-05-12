import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { take } from 'rxjs';
import { GameDetails, GameScreenshots, GameSearch, Genres, GameStoreResponse, Store, StoreResponse, Achievement, Achievements, WishlistGame} from './videogamedetails.interface';
import { GameResults } from './videogamedetails.interface';
import { Wishlist } from './wishlist/wishlist';
import { environment } from '../environments/environment';


@Injectable({
  providedIn: 'root',
})
export class GameapiService {

  private _http=inject(HttpClient);

  private _baseUrl = "https://api.rawg.io/api/";
  private _apiKey = "9dacf80d00644deab26a734dcc3d840b";
  private api = environment.apiUrl;

  private _lastTrendSearch = "";
  private _lastSearch = "";
  private _lastGenre = "";
  private _currentMode: 'search' | 'genre' = 'search';

  public games = signal<GameResults[]>([]);
  public genreGames = signal<GameResults[]>([]);
  public game = signal<GameDetails | null>(null);
  public genres = signal<Genres | null>(null);
  public stores = signal<Store[]>([]);
  public storesForGames = signal<GameStoreResponse | null>(null);
  public screenshots = signal<GameScreenshots | null>(null);
  public achievements = signal<Achievement[]>([]);
  public wishlist = signal<WishlistGame[]>([]);
  public showWishlistPopup = signal(false);

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
    this._currentMode = 'search';
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
      if (this._currentMode !== 'search')
      {
        this.currentPage.set(1);
      }
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

  getGamesForGenre(genre: string)
  {
    this._currentMode = 'genre';
    this._lastGenre = genre;
    const url = `${this._baseUrl}games?genres=${genre}&page=${this.currentPage()}&key=${this._apiKey}`;

    this._http.get<GameSearch>(url)
    .pipe(take(1))
    .subscribe(data => {
      if (data.results){
        this.genreGames.set(data.results);
      } else{
        this.genreGames.set([]);
        console.log(this.genreGames());
      }
      const total = Number(data.count || 0);

      this.totalResults.set(total);

      this.maxPages.set(
        Math.ceil(total / this.resultsPerPage)
      );  
      if (this._currentMode !== 'genre'){
        this.currentPage.set(1);
      }
    })
  }

  getStores()
  {
    const url = `${this._baseUrl}stores?key=${this._apiKey}`;

    this._http.get<StoreResponse>(url)
    .pipe(take(1))
    .subscribe (data => {
      this.stores.set(data.results);
      console.log(this.stores());
    })
  }

  getStoresForGames(id: string)
  {
    const url = `${this._baseUrl}games/${id}/stores?key=${this._apiKey}`;

    this._http.get<GameStoreResponse>(url)
    .pipe(take(1))
    .subscribe(data => {
      this.storesForGames.set(data)
      console.log(this.storesForGames());

    })
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

  getAchievements(id: string)
  {
    const url = `${this._baseUrl}games/${id}/achievements?page_size=100&key=${this._apiKey}`;
    
    this._http.get<Achievements>(url)
    .pipe(take(1))
    .subscribe(data => {
      this.achievements.set(data.results);
      console.log(this.achievements())
    })
  }

  nextPage() {
    if (this.currentPage() < this.maxPages()){
      this.currentPage.update(page => page + 1);
      if (this._currentMode === 'search')
      {
      this.getGames(this._lastSearch);
      }
      else if (this._currentMode=== 'genre')
      {
      this.getGamesForGenre(this._lastGenre);
      }

    }
  }

  previousPage(){
    if (this.currentPage() > 1){
      this.currentPage.update(page => page - 1);
      if (this._currentMode === 'search')
      {
      this.getGames(this._lastSearch);
      }
      else if (this._currentMode=== 'genre')
      {
      this.getGamesForGenre(this._lastGenre);
      }
    }
  }

  addToWishlist(game: GameResults)
  {
    const wishlist = {
      gameId: game.id,
      name: game.name,
      image: game.background_image,
      rating: game.rating,
      released: game.released, 
    };

    this._http.post(this.api, wishlist)
    .subscribe(() => {
      this.getWishlistGames();
      this.showWishlistPopup.set(true);

      setTimeout(() => {
        this.showWishlistPopup.set(false)
      }, 3000);
    });
  }

  getWishlistGames()
  {
    this._http.get<WishlistGame[]>(this.api)
    .pipe(take(1))
    .subscribe(data => {
      this.wishlist.set(data);
    });
  }

  deleteWishlistGame(gameId: string)
  {
    const url = this.api + '/' + gameId;
    this._http.delete(url)
    .subscribe(data => {
      this.getWishlistGames();
    });
  }
}
