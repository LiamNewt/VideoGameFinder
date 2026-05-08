import { Component, inject} from '@angular/core';
import { GameapiService } from '../gameapi-service';
import { RouterLink } from '@angular/router';
import { input } from '@angular/core';


@Component({
  selector: 'app-genregamepage',
  imports: [RouterLink],
  templateUrl: './genregamepage.html',
  styleUrl: './genregamepage.css',
})
export class Genregamepage {
  gameAPI=inject(GameapiService);
    protected genre = input.required<string>();
    protected name = input.required<string>();
    selectedGenre = "";

    ngOnInit(){
    let genreId= this.genre(); 
    this.selectedGenre = this.name();
    this.gameAPI.getGamesForGenre(genreId);
  }
}