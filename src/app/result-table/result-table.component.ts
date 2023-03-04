/*
 * Copyright 2022 Alexey Sergienko.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {Component, OnInit} from '@angular/core';
import {LocalStorageService} from "../local-storage.service";
import {TestResult} from "../model/result";
import {ResultExportService} from "../result-export.service";
import {saveAs} from 'file-saver';

@Component({
    selector: 'app-result-table',
    templateUrl: './result-table.component.html',
    styleUrls: ['./result-table.component.css']
})
export class ResultTableComponent implements OnInit {

    constructor(private storage: LocalStorageService, private exportService: ResultExportService) {
    }

    ngOnInit(): void {
    }

    getResults(): TestResult[] {
        return this.storage.getResults()
    }

    downloadResults() {
        let blob = new Blob([this.exportService.toCSV(this.getResults())], {type: "text/plain;charset=utf-8"})
        saveAs(blob, `${new Date().toISOString().split("T"[0])}.csv`)
    }

    downloadResponses(result: TestResult) {
        let blob = new Blob([this.exportService.responsesToCSV(result.responses)], {type: "text/plain;charset=utf-8"})
        saveAs(blob, `${result.date}_${result.userInfo.firstName}_${result.userInfo.lastName}.csv`)
    }

    downloadReferenceTable() {
        let blob = new Blob([this.exportService.referenceTable()], {type: "text/plain;charset=utf-8"})
        saveAs(blob, `reference_table.csv`)
    }

    deleteResults() {
        if (confirm("Вы точно хотите стереть все результаты?")) {
            this.storage.deleteResults();
        }
    }

}
