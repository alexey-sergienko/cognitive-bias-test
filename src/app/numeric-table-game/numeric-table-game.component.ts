import {Component, Input, OnInit} from '@angular/core';
import {timer} from "rxjs";

@Component({
    selector: 'app-numeric-table-game',
    templateUrl: './numeric-table-game.component.html',
    styleUrls: ['./numeric-table-game.component.css']
})
export class NumericTableGameComponent implements OnInit {
    @Input() numberTable!: Array<Array<number>>;

    private startTime: number;

    private expectedNumber: number = 1;
    private totalNumbers: number = 25;

    tiles: Array<Array<NumericTile>> = []

    constructor() {
        this.startTime = Date.now();
    }

    ngOnInit(): void {
        this.startTime = Date.now();

        this.tiles = Array(this.numberTable.length);

        for (let i = 0; i < this.numberTable.length; i++) {
            this.tiles[i] = Array(this.numberTable[i].length)
            for (let j = 0; j < this.numberTable[i].length; j++) {
                this.tiles[i][j] = new NumericTile(this.numberTable[i][j])
            }
        }
    }

    onTileClick(tile: NumericTile) {
        if (tile.value === this.expectedNumber) {
            tile.found = true;
            tile.showWarning = false;
            tile.timeToFindMillis = Date.now() - this.startTime;

            this.expectedNumber += 1;
            this.startTime = Date.now();

            tile.showSuccess = true;
            timer(500).subscribe(() => {
                tile.showSuccess = false;
            })
        } else {
            if (!tile.showSuccess) {
                tile.showWarning = true;
                timer(500).subscribe(() => {
                    tile.showWarning = false;
                })
            }
        }

        if (this.expectedNumber > this.totalNumbers) {
            // TODO end the game and process the results
            this.onGameEnd();
        }
    }

    private onGameEnd() {
        for (let row of this.tiles) {
            for (let tile of row) {
                tile.showTimeToFind = true;
            }
        }
    }

}

class NumericTile {
    value: number;
    found: boolean;
    timeToFindMillis: number;

    showSuccess: boolean;
    showWarning: boolean;
    showTimeToFind: boolean;

    constructor(value: number) {
        this.value = value;
        this.found = false;
        this.timeToFindMillis = -1;

        this.showSuccess = false;
        this.showWarning = false;
        this.showTimeToFind = false;
    }
}