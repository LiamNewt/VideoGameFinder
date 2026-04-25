import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GameapiService } from '../gameapi-service';
import { inject } from '@angular/core';
import { About } from "../about/about";


@Component({
  selector: 'app-trending',
  imports: [RouterLink, About],
  templateUrl: './trending.html',
  styleUrl: './trending.css',
})
export class Trending {
  public trendingGameService: GameapiService;

  constructor() {
    this.trendingGameService = inject(GameapiService);
    this.trendingGameService.getTrending();
  }

  scrollLeft(container: HTMLElement): void {
  container.scrollBy({
    left: -300,
    behavior: "smooth",
  });
}

  scrollRight(container: HTMLElement): void {
  container.scrollBy({
    left: 300,
    behavior: "smooth",
  });
}

}

