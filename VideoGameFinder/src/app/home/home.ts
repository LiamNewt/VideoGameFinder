import { Component } from '@angular/core';
import { Search } from "../search/search";
import { Results } from '../results/results';
import { Trending } from "../trending/trending";

@Component({
  selector: 'app-home',
  imports: [Search, Results, Trending],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}
