import {Injectable} from '@angular/core';
import {TestResult} from "./model/result";

@Injectable({
    providedIn: 'root'
})
export class ResultExportService {

    constructor() {
    }

    toCSV(results: TestResult[]): string {
        let header = "Имя;Фамилия;Возраст;Минимальное возможное значение CBT;Максимальное возможное значение CBT;Значение CBT в данной сессии\n"

        return header + results.map(r => `${r.userInfo.firstName};${r.userInfo.lastName};${r.userInfo.age};${r.minPossibleBias};${r.maxPossibleBias};${r.cognitiveBias}`)
            .join("\n");
    }
}
