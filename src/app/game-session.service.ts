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
import {InfoStage, Stage, StageResponse} from "./model/stage";
import {Observable, Subject} from "rxjs";
import {LocalStorageService} from "./local-storage.service";
import {UserInfoService} from "./user-info.service";

@Injectable({
    providedIn: 'root'
})
export class GameSessionService {

    private stages: (Stage | InfoStage)[] = [
        {
            text: 'ИНСТРУКЦИЯ\n\nВам будут показаны карточки с разными изображениями. Изображения' +
                '  могут отличаться друг от друга по ряду характеристик.\n После появления первой карточки, 2 других появятся под' +
                '  ней.\n Из 2 нижних изображений выберите то, которое Вам нравится больше всего.\n' +
                '  \n\n' +
                '  В тесте нет "правильных" и "неправильных" ответов. Вы можете выбирать свободно.\n' +
                '  Постарайтесь выбирать побыстрее, особо не задумываясь.\n\n' +
                '    Во время теста,\n' +
                '      чтобы выбрать ВЕРХНЮЮ карточку: нажмите стрелку ВВЕРХ\n' +
                '      чтобы выбрать НИЖНЮЮ карточку: нажмите стрелку ВНИЗ\n' +
                '    \n\nНажмите [Пробел], чтобы начать тест.\n' +
                '  '
        },
        {text: 'Нажмите [Пробел], чтобы начать тренировочную сессию (ваши ответы не будут записаны).'},

        // Tutorial stages
        {
            index: 1,
            referenceImage: {path: 'CSr1.gif', match: 0},
            topCandidate: {path: 'CBb1.gif', match: 0},
            bottomCandidate: {path: 'QSb22.gif', match: 0},
            recordResponse: false
        },
        {
            index: 2,
            referenceImage: {path: 'QBb12.gif', match: 0},
            topCandidate: {path: 'QBr1.gif', match: 0},
            bottomCandidate: {path: 'QSb12.gif', match: 0},
            recordResponse: false
        },
        {
            index: 3,
            referenceImage: {path: 'QBb22.gif', match: 0},
            topCandidate: {path: 'QSb12.gif', match: 0},
            bottomCandidate: {path: 'QBb2.gif', match: 0},
            recordResponse: false
        },

        {text: 'Отлично! Теперь нажмите [Пробел], чтобы приступить к тестированию.'},
        // Real stages
        {
            index: 1,
            referenceImage: {path: 'CSr2.gif', match: 0},
            topCandidate: {path: 'CBb22.gif', match: 2},
            bottomCandidate: {path: 'CSr2.gif', match: 5},
            recordResponse: true
        },
        {
            index: 2,
            referenceImage: {path: 'QBb12.gif', match: 0},
            topCandidate: {path: 'CSr22.gif', match: 1},
            bottomCandidate: {path: 'QBb1.gif', match: 4},
            recordResponse: true
        },
        {
            index: 3,
            referenceImage: {path: 'CSr1.gif', match: 0},
            topCandidate: {path: 'QBb12.gif', match: 1},
            bottomCandidate: {path: 'QSr2.gif', match: 3},
            recordResponse: true
        },
        {
            index: 4,
            referenceImage: {path: 'QBb1.gif', match: 0},
            topCandidate: {path: 'CSr22.gif', match: 0},
            bottomCandidate: {path: 'QBb1.gif', match: 5},
            recordResponse: true
        },
        {
            index: 5,
            referenceImage: {path: 'CBr2.gif', match: 0},
            topCandidate: {path: 'QSb12.gif', match: 0},
            bottomCandidate: {path: 'QSb22.gif', match: 1},
            recordResponse: true
        },
        {
            index: 6,
            referenceImage: {path: 'QBb22.gif', match: 0},
            topCandidate: {path: 'QBb1.gif', match: 3},
            bottomCandidate: {path: 'CSr1.gif', match: 0},
            recordResponse: true
        },
        {
            index: 7,
            referenceImage: {path: 'CSr22.gif', match: 0},
            topCandidate: {path: 'CSr22.gif', match: 5},
            bottomCandidate: {path: 'CSr12.gif', match: 4},
            recordResponse: true
        },
        {
            index: 8,
            referenceImage: {path: 'QBb2.gif', match: 0},
            topCandidate: {path: 'CBb1.gif', match: 2},
            bottomCandidate: {path: 'CSr2.gif', match: 3},
            recordResponse: true
        },
        {
            index: 9,
            referenceImage: {path: 'QSb1.gif', match: 0},
            topCandidate: {path: 'QBr12.gif', match: 2},
            bottomCandidate: {path: 'CBr22.gif', match: 0},
            recordResponse: true
        },
        {
            index: 10,
            referenceImage: {path: 'CBr22.gif', match: 0},
            topCandidate: {path: 'CSb1.gif', match: 1},
            bottomCandidate: {path: 'CBr22.gif', match: 5},
            recordResponse: true
        },
        {
            index: 11,
            referenceImage: {path: 'QSb2.gif', match: 0},
            topCandidate: {path: 'QSb2.gif', match: 5},
            bottomCandidate: {path: 'CSb22.gif', match: 3},
            recordResponse: true
        },
        {
            index: 12,
            referenceImage: {path: 'QSr1.gif', match: 0},
            topCandidate: {path: 'CSr1.gif', match: 4},
            bottomCandidate: {path: 'QBr2.gif', match: 3},
            recordResponse: true
        },
        {
            index: 13,
            referenceImage: {path: 'QSr2.gif', match: 0},
            topCandidate: {path: 'CBb12.gif', match: 0},
            bottomCandidate: {path: 'QSr22.gif', match: 4},
            recordResponse: true
        },
        {
            index: 14,
            referenceImage: {path: 'QBr1.gif', match: 0},
            topCandidate: {path: 'CBr22.gif', match: 2},
            bottomCandidate: {path: 'CSb2.gif', match: 1},
            recordResponse: true
        },
        {
            index: 15,
            referenceImage: {path: 'CBb12.gif', match: 0},
            topCandidate: {path: 'QSr12.gif', match: 2},
            bottomCandidate: {path: 'CBr12.gif', match: 4},
            recordResponse: true
        },
        {
            index: 16,
            referenceImage: {path: 'QSb1.gif', match: 0},
            topCandidate: {path: 'CBb22.gif', match: 1},
            bottomCandidate: {path: 'CSr12.gif', match: 2},
            recordResponse: true
        },
        {
            index: 17,
            referenceImage: {path: 'QBb12.gif', match: 0},
            topCandidate: {path: 'CBr12.gif', match: 3},
            bottomCandidate: {path: 'QSr2.gif', match: 1},
            recordResponse: true
        },
        {
            index: 18,
            referenceImage: {path: 'QBb1.gif', match: 0},
            topCandidate: {path: 'QSb22.gif', match: 2},
            bottomCandidate: {path: 'QBb1.gif', match: 5},
            recordResponse: true
        },
        {
            index: 19,
            referenceImage: {path: 'CSr22.gif', match: 0},
            topCandidate: {path: 'QBb22.gif', match: 2},
            bottomCandidate: {path: 'QBb1.gif', match: 0},
            recordResponse: true
        },
        {
            index: 20,
            referenceImage: {path: 'QBb2.gif', match: 0},
            topCandidate: {path: 'QBr12.gif', match: 2},
            bottomCandidate: {path: 'CBb1.gif', match: 3},
            recordResponse: true
        },
        {
            index: 21,
            referenceImage: {path: 'CSr2.gif', match: 0},
            topCandidate: {path: 'CSr2.gif', match: 5},
            bottomCandidate: {path: 'QBb22.gif', match: 1},
            recordResponse: true
        },
        {
            index: 22,
            referenceImage: {path: 'CBr22.gif', match: 0},
            topCandidate: {path: 'CBb2.gif', match: 3},
            bottomCandidate: {path: 'CSr22.gif', match: 4},
            recordResponse: true
        },
        {
            index: 23,
            referenceImage: {path: 'QBr1.gif', match: 0},
            topCandidate: {path: 'CSb22.gif', match: 0},
            bottomCandidate: {path: 'QBr22.gif', match: 3},
            recordResponse: true
        },
        {
            index: 24,
            referenceImage: {path: 'QSr1.gif', match: 0},
            topCandidate: {path: 'CBr2.gif', match: 2},
            bottomCandidate: {path: 'QSb1.gif', match: 4},
            recordResponse: true
        },
        {
            index: 25,
            referenceImage: {path: 'CSr1.gif', match: 0},
            topCandidate: {path: 'CSr12.gif', match: 4},
            bottomCandidate: {path: 'QBb22.gif', match: 0},
            recordResponse: true
        },
        {
            index: 26,
            referenceImage: {path: 'QSb2.gif', match: 0},
            topCandidate: {path: 'CSb2.gif', match: 4},
            bottomCandidate: {path: 'QSb2.gif', match: 5},
            recordResponse: true
        },
        {
            index: 27,
            referenceImage: {path: 'QSr2.gif', match: 0},
            topCandidate: {path: 'CBb12.gif', match: 0},
            bottomCandidate: {path: 'CBb1.gif', match: 1},
            recordResponse: true
        },
        {
            index: 28,
            referenceImage: {path: 'CBr2.gif', match: 0},
            topCandidate: {path: 'CBr2.gif', match: 5},
            bottomCandidate: {path: 'CSr22.gif', match: 3},
            recordResponse: true
        },
        {
            index: 29,
            referenceImage: {path: 'CBb12.gif', match: 0},
            topCandidate: {path: 'CSr2.gif', match: 1},
            bottomCandidate: {path: 'CBb22.gif', match: 4},
            recordResponse: true
        },
        {
            index: 30,
            referenceImage: {path: 'QBb22.gif', match: 0},
            topCandidate: {path: 'QBb22.gif', match: 5},
            bottomCandidate: {path: 'CSr1.gif', match: 0},
            recordResponse: true
        },
        {
            index: 31,
            referenceImage: {path: 'QBr2.gif', match: 0},
            topCandidate: {path: 'QBr1.gif', match: 4},
            bottomCandidate: {path: 'CSr22.gif', match: 2},
            recordResponse: true
        },
        {
            index: 32,
            referenceImage: {path: 'CBb22.gif', match: 0},
            topCandidate: {path: 'QSr2.gif', match: 1},
            bottomCandidate: {path: 'CSb1.gif', match: 2},
            recordResponse: true
        },
        {
            index: 33,
            referenceImage: {path: 'CSb22.gif', match: 0},
            topCandidate: {path: 'CSb12.gif', match: 4},
            bottomCandidate: {path: 'QBr1.gif', match: 0},
            recordResponse: true
        },
        {
            index: 34,
            referenceImage: {path: 'CSb12.gif', match: 0},
            topCandidate: {path: 'CBb1.gif', match: 3},
            bottomCandidate: {path: 'CSb22.gif', match: 4},
            recordResponse: true
        },
        {
            index: 35,
            referenceImage: {path: 'QSr22.gif', match: 0},
            topCandidate: {path: 'CSr12.gif', match: 3},
            bottomCandidate: {path: 'QSr22.gif', match: 5},
            recordResponse: true
        },
        {
            index: 36,
            referenceImage: {path: 'QSr12.gif', match: 0},
            topCandidate: {path: 'QSr12.gif', match: 5},
            bottomCandidate: {path: 'QBb2.gif', match: 1},
            recordResponse: true
        },
        {
            index: 37,
            referenceImage: {path: 'CBb2.gif', match: 0},
            topCandidate: {path: 'QSr12.gif', match: 0},
            bottomCandidate: {path: 'QBb12.gif', match: 2},
            recordResponse: true
        },
        {
            index: 38,
            referenceImage: {path: 'QBr22.gif', match: 0},
            topCandidate: {path: 'CBr1.gif', match: 2},
            bottomCandidate: {path: 'QSb22.gif', match: 3},
            recordResponse: true
        },
        {
            index: 39,
            referenceImage: {path: 'QBr12.gif', match: 0},
            topCandidate: {path: 'QBb12.gif', match: 4},
            bottomCandidate: {path: 'QBr12.gif', match: 5},
            recordResponse: true
        },
        {
            index: 40,
            referenceImage: {path: 'CSb1.gif', match: 0},
            topCandidate: {path: 'QBr22.gif', match: 0},
            bottomCandidate: {path: 'QSb2.gif', match: 3},
            recordResponse: true
        },
        {
            index: 41,
            referenceImage: {path: 'CSb2.gif', match: 0},
            topCandidate: {path: 'QBr22.gif', match: 1},
            bottomCandidate: {path: 'QBr12.gif', match: 0},
            recordResponse: true
        },
        {
            index: 42,
            referenceImage: {path: 'CSr12.gif', match: 0},
            topCandidate: {path: 'CSr12.gif', match: 5},
            bottomCandidate: {path: 'QBb2.gif', match: 0},
            recordResponse: true
        },
        {
            index: 43,
            referenceImage: {path: 'QSb12.gif', match: 0},
            topCandidate: {path: 'QBr12.gif', match: 3},
            bottomCandidate: {path: 'QBr2.gif', match: 1},
            recordResponse: true
        },
        {
            index: 44,
            referenceImage: {path: 'CBr12.gif', match: 0},
            topCandidate: {path: 'CBr22.gif', match: 4},
            bottomCandidate: {path: 'QBb2.gif', match: 1},
            recordResponse: true
        },
        {
            index: 45,
            referenceImage: {path: 'QSb22.gif', match: 0},
            topCandidate: {path: 'QSb22.gif', match: 5},
            bottomCandidate: {path: 'CBr22.gif', match: 2},
            recordResponse: true
        },
        {
            index: 46,
            referenceImage: {path: 'QBr12.gif', match: 0},
            topCandidate: {path: 'CSb2.gif', match: 0},
            bottomCandidate: {path: 'QBr12.gif', match: 5},
            recordResponse: true
        },
        {
            index: 47,
            referenceImage: {path: 'CBb22.gif', match: 0},
            topCandidate: {path: 'CBr22.gif', match: 4},
            bottomCandidate: {path: 'QSb1.gif', match: 1},
            recordResponse: true
        },
        {
            index: 48,
            referenceImage: {path: 'CSb12.gif', match: 0},
            topCandidate: {path: 'QBb12.gif', match: 3},
            bottomCandidate: {path: 'CSb12.gif', match: 5},
            recordResponse: true
        },
        {
            index: 49,
            referenceImage: {path: 'CBb2.gif', match: 0},
            topCandidate: {path: 'QSr1.gif', match: 1},
            bottomCandidate: {path: 'QSr12.gif', match: 0},
            recordResponse: true
        },
        {
            index: 50,
            referenceImage: {path: 'QBr22.gif', match: 0},
            topCandidate: {path: 'QBr22.gif', match: 5},
            bottomCandidate: {path: 'CBr22.gif', match: 4},
            recordResponse: true
        },
        {
            index: 51,
            referenceImage: {path: 'QBr2.gif', match: 0},
            topCandidate: {path: 'CSb12.gif', match: 0},
            bottomCandidate: {path: 'QBr1.gif', match: 4},
            recordResponse: true
        },
        {
            index: 52,
            referenceImage: {path: 'CSb1.gif', match: 0},
            topCandidate: {path: 'CBb1.gif', match: 4},
            bottomCandidate: {path: 'QSr12.gif', match: 2},
            recordResponse: true
        },
        {
            index: 53,
            referenceImage: {path: 'CBr12.gif', match: 0},
            topCandidate: {path: 'CBr2.gif', match: 3},
            bottomCandidate: {path: 'QSb2.gif', match: 0},
            recordResponse: true
        },
        {
            index: 54,
            referenceImage: {path: 'CSr12.gif', match: 0},
            topCandidate: {path: 'QSr12.gif', match: 4},
            bottomCandidate: {path: 'CSb22.gif', match: 3},
            recordResponse: true
        },
        {
            index: 55,
            referenceImage: {path: 'CSb22.gif', match: 0},
            topCandidate: {path: 'QSr1.gif', match: 1},
            bottomCandidate: {path: 'CSb22.gif', match: 5},
            recordResponse: true
        },
        {
            index: 56,
            referenceImage: {path: 'CSb2.gif', match: 0},
            topCandidate: {path: 'CBr2.gif', match: 3},
            bottomCandidate: {path: 'QBb22.gif', match: 2},
            recordResponse: true
        },
        {
            index: 57,
            referenceImage: {path: 'QSb12.gif', match: 0},
            topCandidate: {path: 'CBr2.gif', match: 0},
            bottomCandidate: {path: 'QBr22.gif', match: 2},
            recordResponse: true
        },
        {
            index: 58,
            referenceImage: {path: 'QSr22.gif', match: 0},
            topCandidate: {path: 'QSr22.gif', match: 5},
            bottomCandidate: {path: 'QSb1.gif', match: 2},
            recordResponse: true
        },
        {
            index: 59,
            referenceImage: {path: 'QSb22.gif', match: 0},
            topCandidate: {path: 'CBb1.gif', match: 1},
            bottomCandidate: {path: 'CBb22.gif', match: 3},
            recordResponse: true
        },
        {
            index: 60,
            referenceImage: {path: 'CBb1.gif', match: 0},
            topCandidate: {path: 'CBr22.gif', match: 2},
            bottomCandidate: {path: 'QSb22.gif', match: 1},
            recordResponse: true
        },
    ];
    private currentStage = 0;

    private responses: StageResponse[] = [];

    private stageSubject: Subject<Stage | InfoStage>;

    constructor(private storageService: LocalStorageService, private userInfoService: UserInfoService) {
        this.stageSubject = new Subject<Stage | InfoStage>();
        this.reset();
    }

    reset() {
        this.stageSubject = new Subject<Stage | InfoStage>();
        this.responses = [];
        this.currentStage = 0;
    }

    start() {
        if (this.stages.length > 0) {
            this.stageSubject.next(this.stages[this.currentStage])
        } else {
            this.stageSubject.complete()
        }
    }

    stage(): Observable<Stage | InfoStage> {
        return this.stageSubject
    }

    submitResponse(response: StageResponse) {
        this.responses.push(response);
        this.currentStage += 1;

        if (this.currentStage < this.stages.length) {
            this.stageSubject.next(this.stages[this.currentStage]);
        } else {
            this.storageService.saveResult({
                date: new Date().toISOString().split('T')[0],
                userInfo: this.userInfoService.get()!,
                minPossibleBias: this.minCognitiveBias(),
                maxPossibleBias: this.maxCognitiveBias(),
                cognitiveBias: this.cognitiveBiasSum(),
                responses: this.responses
            })

            this.stageSubject.complete();
        }
    }

    getResponses(): StageResponse[] {
        return this.responses.map(x => x);
    }

    // Stats
    cognitiveBiasSum(): number {
        return this.responses.map(x => x.match).reduce((acc, currentValue) => acc + currentValue)
    }

    minCognitiveBias(): number {
        return this.stages.filter(s => 'index' in s).map(s => (s as Stage))
            .map(s => s.topCandidate.match <= s.bottomCandidate.match ? s.topCandidate.match : s.bottomCandidate.match)
            .reduce((acc, value) => acc + value)
    }

    maxCognitiveBias(): number {
        return this.stages.filter(s => 'index' in s).map(s => (s as Stage))
            .map(s => s.topCandidate.match >= s.bottomCandidate.match ? s.topCandidate.match : s.bottomCandidate.match)
            .reduce((acc, value) => acc + value)
    }
}
