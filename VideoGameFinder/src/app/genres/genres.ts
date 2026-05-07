import { Component, inject } from '@angular/core';
import { GameapiService } from '../gameapi-service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-genres',
  imports: [RouterLink],
  templateUrl: './genres.html',
  styleUrl: './genres.css',
})
export class Genres {
    public genreService: GameapiService;

  constructor() {
    this.genreService = inject(GameapiService);
    this.genreService.getGenres();
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
