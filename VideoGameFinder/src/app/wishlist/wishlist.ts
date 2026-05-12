import { Component, inject } from '@angular/core';
import { GameapiService } from '../gameapi-service';
import { input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { signal } from '@angular/core';

@Component({
  selector: 'app-wishlist',
  imports: [RouterLink],
  templateUrl: './wishlist.html',
  styleUrl: './wishlist.css',
})
export class Wishlist {
  gameAPI=inject(GameapiService);
  
  protected id = input.required<string>();

  showWishlistPopup = signal(false);
  
  ngOnInit() {
    let gameId=this.id();
    
    this.gameAPI.deleteWishlistGame(gameId);
  }

}
