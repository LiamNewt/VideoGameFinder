import { Component, inject } from '@angular/core';
import { Search } from "../search/search";
import { Results } from '../results/results';
import { Trending } from "../trending/trending";
import { GameapiService } from '../gameapi-service';
import { Genres } from '../genres/genres';

@Component({
  selector: 'app-home',
  imports: [Search, Results, Trending, Genres],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  
}
