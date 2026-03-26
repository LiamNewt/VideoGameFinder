import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GameapiService } from '../gameapi-service';
import { inject } from '@angular/core';

@Component({
  selector: 'app-results',
  imports: [RouterLink],
  templateUrl: './results.html',
  styleUrl: './results.css',
})
export class Results {
  public gameService: GameapiService;

  constructor() {
    this.gameService = inject(GameapiService);
  }
}
