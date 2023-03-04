import {Injectable} from '@angular/core';
import {TestResult} from "./model/result";
import {StageResponse} from "./model/stage";
import {GameSessionService} from "./game-session.service";

@Injectable({
    providedIn: 'root'
})
export class ResultExportService {

    constructor(private gameSession: GameSessionService) {
    }

    toCSV(results: TestResult[]): string {
        let header = "Дата;Имя;Фамилия;Возраст;Минимальное возможное значение CBT;Максимальное возможное значение CBT;Значение CBT в данной сессии;\n"

        return header + results.map(r => `${r.date};${r.userInfo.firstName};${r.userInfo.lastName};${r.userInfo.age};${r.minPossibleBias};${r.maxPossibleBias};${r.cognitiveBias}`)
            .join("\n");
    }

    responsesToCSV(responses: StageResponse[]): string {
        let header = 'Trial;Stim;Color;Shape;Num;Size;Filled;Match;Item;Min;Max;Time'
        let data = responses.map((r, i) => {
            let trial = i + 1;
            let stim = r.top ? '1' : '2';

            let candidate = r.top ? r.topImage : r.bottomImage;
            let color = this.boolToInt(candidate.color);
            let shape = this.boolToInt(candidate.shape);
            let count = this.boolToInt(candidate.count);
            let size = this.boolToInt(candidate.size);
            let filled = this.boolToInt(candidate.filled);
            let match = candidate.match;
            let item = candidate.path;

            let minMatch = r.topImage.match <= r.bottomImage.match ? r.topImage.match : r.bottomImage.match;
            let maxMatch = r.topImage.match >= r.bottomImage.match ? r.topImage.match : r.bottomImage.match;

            let time = 0; // TODO measure time from start of stage to candidate selection

            return `${trial};${stim};${color};${shape};${count};${size};${filled};${match};${item};${minMatch};${maxMatch};${time}`
        })

        return header + data.join('\n');
    }

    referenceTable(): string {
        let header = 'Trial;Stim;Color;Shape;Num;Size;Filled;Match;Item\n'

        let data = this.gameSession.getStages()
            .map((stage, index) => {
                let ref = `${index + 1};0;${this.boolToInt(stage.referenceImage.color)};${this.boolToInt(stage.referenceImage.shape)};${this.boolToInt(stage.referenceImage.count)};${this.boolToInt(stage.referenceImage.size)};${this.boolToInt(stage.referenceImage.filled)};-1;${stage.referenceImage.path}`
                let top = `${index + 1};1;${this.boolToInt(stage.topCandidate.color)};${this.boolToInt(stage.topCandidate.shape)};${this.boolToInt(stage.topCandidate.count)};${this.boolToInt(stage.topCandidate.size)};${this.boolToInt(stage.topCandidate.filled)};${stage.topCandidate.match};${stage.topCandidate.path}`
                let bottom = `${index + 1};2;${this.boolToInt(stage.bottomCandidate.color)};${this.boolToInt(stage.bottomCandidate.shape)};${this.boolToInt(stage.bottomCandidate.count)};${this.boolToInt(stage.bottomCandidate.size)};${this.boolToInt(stage.bottomCandidate.filled)};${stage.bottomCandidate.match};${stage.bottomCandidate.path}`

                return [ref, top, bottom].join('\n')
            })

        return header + data.join('\n')
    }

    private boolToInt(b: boolean): string {
        return b ? '1' : '0'
    }
}
