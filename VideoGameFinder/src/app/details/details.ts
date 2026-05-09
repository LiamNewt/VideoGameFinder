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
    this.gameAPI.getStores();
    this.gameAPI.getStoresForGames(gameId);
    this.gameAPI.getAchievements(gameId);
  }

  getStoreName(store_id: number): string
  {
    const store = this.gameAPI.stores()
    .find(store => store.id === store_id)
    return store ? store.name : 'Store';
  };

  getStoreIcons(store_id: number): string
  {
    switch(store_id){
      case 1:
        return 'fa-brands fa-steam';
        break;
      case 2:
        return 'fa-brands fa-xbox';
        break;
      case 3:
        return 'fa-brands fa-playstation';
        break;
      case 4:
        return 'fa-brands fa-apple';
        break;
      case 5:
        return 'fa-solid fa-gamepad'
      case 6:
        return 'fa-solid fa-gamepad';
        break;
      case 7:
        return 'fa-brands fa-xbox';
        break;   
      case 8:
        return 'fa-brands fa-google-play';
        break;
      case 9:
        return 'fa-solid fa-gamepad';
        break;
      case 10:
        return 'fa-solid fa-gamepad';
        break;
      case 11:
        return 'fa-solid fa-gamepad';
        break;
      default:
        return 'fa-brands fa-store'
    }

  }
  

  
  
}
