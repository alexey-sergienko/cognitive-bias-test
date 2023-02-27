import {Injectable} from '@angular/core';
import {TestResult} from "./model/result";
import {StageResponse} from "./model/stage";

@Injectable({
    providedIn: 'root'
})
export class ResultExportService {

    constructor() {
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
}
