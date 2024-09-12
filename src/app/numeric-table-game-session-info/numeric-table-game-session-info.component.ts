import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
    selector: 'app-numeric-table-game-session-info',
    templateUrl: './numeric-table-game-session-info.component.html',
    styleUrls: ['./numeric-table-game-session-info.component.css']
})
export class NumericTableGameSessionInfoComponent implements OnInit {
    @Output("newSessionEvent") newSessionEvent = new EventEmitter<SessionInfo>();

    name: string = "";

    constructor() {
    }

    ngOnInit(): void {
    }

    onPressNext(): void {
        this.newSessionEvent.emit(new SessionInfo(this.name));
    }

}

export class SessionInfo {
    name: string;
    timestampISO: string;

    constructor(name: string) {
        this.name = name;
        this.timestampISO = new Date().toISOString();
    }
}