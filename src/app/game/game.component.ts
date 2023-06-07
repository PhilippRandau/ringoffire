import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  takeNewCardAnimation = false;
  currentCard: string = '';
  game: Game = new Game();

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    this.newGame();
  }

  takeNewCard() {
    if (!this.takeNewCardAnimation && this.game.stack.length > 0) {
      this.takeNewCardAnimation = true;
      this.currentCard = this.game.stack.pop()!;

      this.game.currentPlayer++;
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
      setTimeout(() => {
        this.takeNewCardAnimation = false;
        this.game.playedCards.push(this.currentCard);
      }, 1250);
    }

  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe((name: string) => {
      if (name && name.length > 0) {
        this.game.players.push(name);
      }
    });
  }


  newGame() {
    this.game = new Game();
    console.log(this.game);
  }
}
