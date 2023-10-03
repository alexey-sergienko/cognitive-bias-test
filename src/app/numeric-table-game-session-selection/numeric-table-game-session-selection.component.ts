import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Router} from "@angular/router";
import {GameSession} from "../numeric-table-game-menu/numeric-table-game-menu.component";

@Component({
    selector: 'app-numeric-table-game-session-selection',
    templateUrl: './numeric-table-game-session-selection.component.html',
    styleUrls: ['./numeric-table-game-session-selection.component.css']
})
export class NumericTableGameSessionSelectionComponent implements OnInit {
    @Input() sessions!: GameSession[];
    @Output("sessionSelectedEvent") sessionSelectedEvent = new EventEmitter<GameSession>();

    constructor(private router: Router) {
    }

    ngOnInit(): void {
    }

    navigateBack() {
        this.router.navigate(["/numericTableGame"]).then(() => {
            window.location.reload();
        })
    }

    getUnfinishedSessions(): GameSession[] {
        return this.sessions.filter(s => !s.tableDone.reduce((p, c) => p && c));
    }

    onSessionSelected(gameSession: GameSession) {
        this.sessionSelectedEvent.emit(gameSession);
    }

}
