import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
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

    showSessionCreationScreen: boolean = false;
    showSessionSelectionScreen: boolean = false;
    showGameScreen: boolean = false;
    currentTable: number = 0;

    constructor(private storage: LocalStorageService, private router: Router) {
    }

    ngOnInit(): void {
    }

    navigateToIndex() {
        this.router.navigate(["/"]);
    }

    navigateToResults() {
        this.router.navigate(["/numericTableGameResults"]);
    }

    onStartSessionSelection(): void {
        this.showSessionSelectionScreen = true;
    }

    onNewSession(): void {
        this.showSessionCreationScreen = true;
    }

    onSessionSelected(session: GameSession) {
        this.showSessionSelectionScreen = false;
        this.currentSession = session;
    }

    onSessionCreated(sessionInfo: SessionInfo): void {
        this.showSessionCreationScreen = false;
        this.currentSession = new GameSession(sessionInfo, this.tables.length);

        let sessions = this.getSessions();
        sessions.push(this.currentSession);
        this.saveSessions(sessions);
    }

    onStartTable(index: number) {
        this.currentTable = index;
        this.showGameScreen = true;
    }

    onTableDone(results: number[]) {
        this.currentSession!.nextTable += 1;
        this.currentSession!.tableDone[this.currentTable] = true;
        this.currentSession!.tableResults[this.currentTable] = results;
        this.showGameScreen = false;

        let sessions = this.getSessions();
        for (let i = 0; i < sessions.length; i++) {
            if (this.currentSession!.sessionInfo.name == sessions[i].sessionInfo.name && this.currentSession!.sessionInfo.timestampISO == sessions[i].sessionInfo.timestampISO) {
                sessions[i] = this.currentSession!;
                this.saveSessions(sessions);
                break;
            }
        }
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

export class GameSession {
    sessionInfo: SessionInfo;
    tableDone: Array<boolean>;
    tableResults: Array<number[]>;
    nextTable: number;

    constructor(sessionInfo: SessionInfo, length: number) {
        this.sessionInfo = sessionInfo;
        this.tableDone = Array(length).map(() => false);
        this.tableResults = Array(length);
        this.nextTable = 0;
    }
}