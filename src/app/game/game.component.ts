import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  takeNewCardAnimation = false;
  game: Game = new Game;

  constructor() {

  }

  ngOnInit(): void {
    this.newGame();
  }
  
  takeNewCard() {
    this.takeNewCardAnimation = true;

  }

  newGame() {
    this.game = new Game();
    console.log(this.game)
  }
}
