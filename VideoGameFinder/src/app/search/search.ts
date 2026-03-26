import { Component } from '@angular/core';
import { GameapiService } from '../gameapi-service';
import { FormsModule } from '@angular/forms';
import { inject } from '@angular/core';


@Component({
  selector: 'app-search',
  imports: [FormsModule],
  templateUrl: './search.html',
  styleUrl: './search.css',
})
export class Search {

  protected gameName: string = "";

  games =inject(GameapiService);

  searched=false;

  protected add(){
    this.searched=true;
    this.games.getGames(this.gameName);
    this.gameName='';
  }
}
