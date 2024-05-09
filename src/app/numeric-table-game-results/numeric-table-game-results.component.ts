import {Component, OnInit} from '@angular/core';
import {GameSession} from "../numeric-table-game-menu/numeric-table-game-menu.component";
import {LocalStorageService} from "../local-storage.service";
import {TestResult} from "../model/result";
import {saveAs} from "file-saver";
import {StageResponse} from "../model/stage";

@Component({
    selector: 'app-numeric-table-game-results',
    templateUrl: './numeric-table-game-results.component.html',
    styleUrls: ['./numeric-table-game-results.component.css']
})
export class NumericTableGameResultsComponent implements OnInit {

    constructor(private storage: LocalStorageService) {
    }

    ngOnInit(): void {
    }

    private SESSIONS_KEY = 'NUMERIC_GAME_SESSION_STORAGE';

    getFinishedSessions(): GameSession[] {
        let storedSessions = this.storage.get<GameSession[]>(this.SESSIONS_KEY);
        return storedSessions == null ? [] : storedSessions.filter(s => s.tableDone.reduce((p, c) => p && c));
    }

    downloadResponses(session: GameSession) {
        let blob = new Blob([this.responsesToCSV(session)], {type: "text/plain;charset=utf-8"})
        saveAs(blob, `${session.sessionInfo.name}_${session.sessionInfo.timestampISO}.csv`)
    }

    private responsesToCSV(session: GameSession): string {
        let header = 'Номер таблицы;Искомое число;Время нахождения (секунды)\n'

        let data = session.tableResults.map((table, tableIndex) => {
            return table.map((timeToFindMillis, cellIndex) => `${tableIndex + 1};${cellIndex + 1};${timeToFindMillis / 1000}`).join('\n');
        });

        return header + data.join('\n');
    }

    downloadAllResults(sessions: GameSession[]) {
        let header = 'Имя обследуемого;Дата обследования;1;2;3;4;5;Флуктуация;ЭР;ВР;ПУ;Дельта\n'

        let data = sessions.map(session => {
            let name = session.sessionInfo.name;
            let date = session.sessionInfo.timestampISO;
            let tableCompletionSeconds = session.tableResults.map((table) => (table.reduce((a, b) => a + b)) / 1000);

            let fluctuation = 0; //SUM(ABS(L2-K2),ABS(M2-L2),ABS(N2-M2),ABS(O2-N2)/SUM(K2,L2,M2,N2,O2)*100)
            for (let i = 1; i < tableCompletionSeconds.length; i++) {
                fluctuation += Math.abs(tableCompletionSeconds[i] - tableCompletionSeconds[i - 1]);
            }
            fluctuation /= tableCompletionSeconds.reduce((a, b) => a + b);
            fluctuation *= 100;

            let EP = tableCompletionSeconds.reduce((a, b) => a + b) / 5
            let BP = tableCompletionSeconds[1] / EP
            let PU = tableCompletionSeconds[4] / EP
            let delta = Math.max(...tableCompletionSeconds) - Math.min(...tableCompletionSeconds)

            return `${name};${date};${tableCompletionSeconds[0]};${tableCompletionSeconds[1]};${tableCompletionSeconds[2]};${tableCompletionSeconds[3]};${tableCompletionSeconds[4]};${fluctuation};${EP};${BP};${PU};${delta}`
        })

        let result = header + data.join('\n');

        let blob = new Blob([result], {type: "text/plain;charset=utf-8"})
        saveAs(blob, `Шульте_${new Date().toISOString()}.csv`)
    }

}
