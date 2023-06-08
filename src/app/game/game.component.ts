import { Component, OnInit, inject } from '@angular/core';
import { Game } from 'src/models/game';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { Firestore, collection, collectionData, doc, docData, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  game: Game = new Game();
  firestore: Firestore = inject(Firestore);
  games$: Observable<any[]>;
  gameRoute: any;
  gameId!: string;

  constructor(private route: ActivatedRoute, public dialog: MatDialog) {
    const games = collection(this.firestore, `games`);
    this.games$ = collectionData(games);
  }


  ngOnInit(): void {
    this.newGame();
    this.route.params.subscribe((params) => {
      this.gameId = params['id'];
      docData(doc(this.firestore, `games/${this.gameId}`)).subscribe((game) => {
        this.game.currentPlayer = game['currentPlayer'];
        this.game.playedCards = game['playedCards'];
        this.game.players = game['players'];
        this.game.stack = game['stack'];
        this.game.currentCard = game['currentCard'];
        this.game.takeNewCardAnimation = game['takeNewCardAnimation'];
      })
    })
  }

  takeNewCard() {
    if (!this.game.takeNewCardAnimation && this.game.stack.length > 0) {
      this.game.takeNewCardAnimation = true;
      this.game.currentCard = this.game.stack.pop()!;
      

      this.game.currentPlayer++;
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
      this.updateGame();
      setTimeout(() => {
        this.game.takeNewCardAnimation = false;
        this.game.playedCards.push(this.game.currentCard);
        this.updateGame();
      }, 1250);
      
    }

  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe((name: string) => {
      if (name && name.length > 0) {
        this.game.players.push(name);
        this.updateGame();
      }
    });
  }


  newGame() {
    this.game = new Game();
  }

  updateGame() {
    updateDoc(doc(this.firestore, `games/${this.gameId}`), this.game.toJson())
  }
}
