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
        let header = 'Номер вопроса;Исходное изображение;Опция 1 (верх);Опция 2 (низ);Уровень схожести выбранного с исходным изображением;\n';

        return header + responses.map(r => `${r.stageIndex};${r.referenceImage};${r.topImage};${r.bottomImage};${r.match};`)
            .join("\n");
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

        return header + data
    }

    private boolToInt(b: boolean): string {
        return b ? '1' : '0'
    }
}
