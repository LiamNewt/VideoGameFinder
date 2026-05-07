import { Component, inject } from '@angular/core';
import { GameapiService } from '../gameapi-service';
import { input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-details',
  imports: [RouterLink],
  templateUrl: './details.html',
  styleUrl: './details.css',
})
export class Details {
  gameAPI=inject(GameapiService);
  
  protected id = input.required<string>();
  selectedScreenshot: string = "";

  ngOnInit() {
    let gameId=this.id();
    this.gameAPI.getGameByID(gameId);
    this.gameAPI.getGameScreenshots(gameId);
  }

  
}
