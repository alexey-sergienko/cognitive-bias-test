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

import {Injectable} from '@angular/core';
import {TestResult} from "./model/result";

@Injectable({
    providedIn: 'root'
})
export class LocalStorageService {
    private STORAGE_KEY = 'TEST_RESULTS'

    constructor() {
    }

    saveResult(result: TestResult) {
        let values = []
        if (localStorage.getItem(this.STORAGE_KEY)) {
            values = JSON.parse(localStorage.getItem(this.STORAGE_KEY)!)
        }
        values.push(result)
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(values))
    }

    getResults(): TestResult[] {
        if (localStorage.getItem(this.STORAGE_KEY)) {
            return JSON.parse(localStorage.getItem(this.STORAGE_KEY)!)
        }
        return []
    }

    deleteResults() {
        if (localStorage.getItem(this.STORAGE_KEY)) {
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify([]))
        }
    }

}
