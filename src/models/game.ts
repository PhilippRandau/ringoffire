export class Game{
    public players: string[] = [];
    public stack: string[] = [];
    public playedCards: string[] = [];
    public currentPlayer: number = 0;

    constructor(){
        for (let i = 0; i < 14; i++) {
            this.stack.push('ace_' + 1);       
        }
    }
}