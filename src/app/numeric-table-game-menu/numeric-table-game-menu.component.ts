import {Component, OnInit} from '@angular/core';
import {Route} from "@angular/router";
import {SessionInfo} from "../numeric-table-game-session-info/numeric-table-game-session-info.component";
import {LocalStorageService} from "../local-storage.service";

@Component({
    selector: 'app-numeric-table-game-menu',
    templateUrl: './numeric-table-game-menu.component.html',
    styleUrls: ['./numeric-table-game-menu.component.css']
})
export class NumericTableGameMenuComponent implements OnInit {

    tableOne: Array<Array<number>> = [
        [21, 12, 1, 7, 20],
        [6, 16, 17, 3, 18],
        [19, 4, 8, 25, 13],
        [24, 2, 22, 10, 5],
        [9, 14, 11, 23, 15]
    ];

    tableTwo: Array<Array<number>> = [
        [6, 1, 18, 22, 14],
        [12, 10, 15, 3, 25],
        [2, 20, 5, 23, 13],
        [16, 21, 8, 11, 24],
        [9, 4, 17, 19, 7]
    ];

    tableThree: Array<Array<number>> = [
        [12, 21, 4, 13, 8],
        [1, 10, 17, 19, 2],
        [23, 16, 5, 15, 6],
        [7, 24, 22, 18, 25],
        [11, 20, 3, 14, 9]
    ];

    tableFour: Array<Array<number>> = [
        [22, 25, 7, 21, 11],
        [8, 2, 10, 3, 23],
        [17, 12, 16, 5, 18],
        [1, 15, 20, 9, 24],
        [19, 13, 4, 14, 6]
    ];

    tableFive: Array<Array<number>> = [
        [4, 19, 12, 13, 8],
        [1, 11, 17, 25, 2],
        [16, 14, 5, 15, 6],
        [7, 21, 22, 18, 20],
        [9, 24, 3, 23, 10]
    ]

    tables = [this.tableOne, this.tableTwo, this.tableThree, this.tableFour, this.tableFive];
    currentSession: GameSession | null = null;

    showSessionInfoScreen: boolean = false;
    showGameScreen: boolean = false;
    currentTableIdx: number = 0;

    constructor(private storage: LocalStorageService) {
    }

    ngOnInit(): void {
    }

    generateTable(): Array<Array<number>> {
        return [
            [...Array(5)].map((_, i) => (1 + i)),
            [...Array(5)].map((_, i) => (6 + i)),
            [...Array(5)].map((_, i) => (11 + i)),
            [...Array(5)].map((_, i) => (16 + i)),
            [...Array(5)].map((_, i) => (21 + i))
        ]
    }

    onNewSession(): void {
        this.showSessionInfoScreen = true;
    }

    onSessionCreated(sessionInfo: SessionInfo): void {
        this.showSessionInfoScreen = false;
        this.currentSession = new GameSession(sessionInfo, this.tables.length);
        // TODO save session to local data, show table selection (with all greyed out but the next possible in order)

        let sessions = this.getSessions();
        sessions.push(this.currentSession);
        this.saveSessions(sessions);
    }

    // Session handling

    private SESSIONS_KEY = 'NUMERIC_GAME_SESSION_STORAGE';

    getSessions(): GameSession[] {
        let storedSessions = this.storage.get<GameSession[]>(this.SESSIONS_KEY);
        return storedSessions == null ? [] : storedSessions;
    }

    saveSessions(sessions: GameSession[]) {
        this.storage.set(this.SESSIONS_KEY, sessions);
    }
}

class GameSession {
    sessionInfo: SessionInfo;
    tableResults: Array<boolean>;

    constructor(sessionInfo: SessionInfo, length: number) {
        this.sessionInfo = sessionInfo;
        this.tableResults = Array(length).map(() => false);
    }


}