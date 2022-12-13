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
import {BehaviorSubject, Observable, Subject} from "rxjs";
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
      referenceImage: 'CSr1.gif',
      topCandidate: {path: 'CBb1.gif', match: 0},
      bottomCandidate: {path: 'QSb22.gif', match: 0},
      recordResponse: false
    },
    {
      index: 2,
      referenceImage: 'QBb12.gif',
      topCandidate: {path: 'QBr1.gif', match: 0},
      bottomCandidate: {path: 'QSb12.gif', match: 0},
      recordResponse: false
    },
    {
      index: 3,
      referenceImage: 'QBb22.gif',
      topCandidate: {path: 'QSb12.gif', match: 0},
      bottomCandidate: {path: 'QBb2.gif', match: 0},
      recordResponse: false
    },

    {text: 'Отлично! Теперь нажмите [Пробел], чтобы приступить к тестированию.'},
    // Real stages
    {
      index: 1,
      referenceImage: 'CSr2.gif',
      topCandidate: {path: 'CBb22.gif', match: 2},
      bottomCandidate: {path: 'CSr2.gif', match: 5},
      recordResponse: true
    },
    {
      index: 2,
      referenceImage: 'QBb12.gif',
      topCandidate: {path: 'CSr22.gif', match: 1},
      bottomCandidate: {path: 'QBb1.gif', match: 4},
      recordResponse: true
    },
    {
      index: 3,
      referenceImage: 'CSr1.gif',
      topCandidate: {path: 'QBb12.gif', match: 1},
      bottomCandidate: {path: 'QSr2.gif', match: 3},
      recordResponse: true
    },
    {
      index: 4,
      referenceImage: 'QBb1.gif',
      topCandidate: {path: 'CSr22.gif', match: 0},
      bottomCandidate: {path: 'QBb1.gif', match: 5},
      recordResponse: true
    },
    {
      index: 5,
      referenceImage: 'CBr2.gif',
      topCandidate: {path: 'QSb12.gif', match: 0},
      bottomCandidate: {path: 'QSb22.gif', match: 1},
      recordResponse: true
    },
    {
      index: 6,
      referenceImage: 'QBb22.gif',
      topCandidate: {path: 'QBb1.gif', match: 3},
      bottomCandidate: {path: 'CSr1.gif', match: 0},
      recordResponse: true
    },
    {
      index: 7,
      referenceImage: 'CSr22.gif',
      topCandidate: {path: 'CSr22.gif', match: 5},
      bottomCandidate: {path: 'CSr12.gif', match: 4},
      recordResponse: true
    },
    {
      index: 8,
      referenceImage: 'QBb2.gif',
      topCandidate: {path: 'CBb1.gif', match: 2},
      bottomCandidate: {path: 'CSr2.gif', match: 3},
      recordResponse: true
    },
    {
      index: 9,
      referenceImage: 'QSb1.gif',
      topCandidate: {path: 'QBr12.gif', match: 2},
      bottomCandidate: {path: 'CBr22.gif', match: 0},
      recordResponse: true
    },
    {
      index: 10,
      referenceImage: 'CBr22.gif',
      topCandidate: {path: 'CSb1.gif', match: 1},
      bottomCandidate: {path: 'CBr22.gif', match: 5},
      recordResponse: true
    },
    {
      index: 11,
      referenceImage: 'QSb2.gif',
      topCandidate: {path: 'QSb2.gif', match: 5},
      bottomCandidate: {path: 'CSb22.gif', match: 3},
      recordResponse: true
    },
    {
      index: 12,
      referenceImage: 'QSr1.gif',
      topCandidate: {path: 'CSr1.gif', match: 4},
      bottomCandidate: {path: 'QBr2.gif', match: 3},
      recordResponse: true
    },
    {
      index: 13,
      referenceImage: 'QSr2.gif',
      topCandidate: {path: 'CBb12.gif', match: 0},
      bottomCandidate: {path: 'QSr22.gif', match: 4},
      recordResponse: true
    },
    {
      index: 14,
      referenceImage: 'QBr1.gif',
      topCandidate: {path: 'CBr22.gif', match: 2},
      bottomCandidate: {path: 'CSb2.gif', match: 1},
      recordResponse: true
    },
    {
      index: 15,
      referenceImage: 'CBb12.gif',
      topCandidate: {path: 'QSr12.gif', match: 2},
      bottomCandidate: {path: 'CBr12.gif', match: 4},
      recordResponse: true
    },
    {
      index: 16,
      referenceImage: 'QSb1.gif',
      topCandidate: {path: 'CBb22.gif', match: 1},
      bottomCandidate: {path: 'CSr12.gif', match: 2},
      recordResponse: true
    },
    {
      index: 17,
      referenceImage: 'QBb12.gif',
      topCandidate: {path: 'CBr12.gif', match: 3},
      bottomCandidate: {path: 'QSr2.gif', match: 1},
      recordResponse: true
    },
    {
      index: 18,
      referenceImage: 'QBb1.gif',
      topCandidate: {path: 'QSb22.gif', match: 2},
      bottomCandidate: {path: 'QBb1.gif', match: 5},
      recordResponse: true
    },
    {
      index: 19,
      referenceImage: 'CSr22.gif',
      topCandidate: {path: 'QBb22.gif', match: 2},
      bottomCandidate: {path: 'QBb1.gif', match: 0},
      recordResponse: true
    },
    {
      index: 20,
      referenceImage: 'QBb2.gif',
      topCandidate: {path: 'QBr12.gif', match: 2},
      bottomCandidate: {path: 'CBb1.gif', match: 3},
      recordResponse: true
    },
    {
      index: 21,
      referenceImage: 'CSr2.gif',
      topCandidate: {path: 'CSr2.gif', match: 5},
      bottomCandidate: {path: 'QBb22.gif', match: 1},
      recordResponse: true
    },
    {
      index: 22,
      referenceImage: 'CBr22.gif',
      topCandidate: {path: 'CBb2.gif', match: 3},
      bottomCandidate: {path: 'CSr22.gif', match: 4},
      recordResponse: true
    },
    {
      index: 23,
      referenceImage: 'QBr1.gif',
      topCandidate: {path: 'CSb22.gif', match: 0},
      bottomCandidate: {path: 'QBr22.gif', match: 3},
      recordResponse: true
    },
    {
      index: 24,
      referenceImage: 'QSr1.gif',
      topCandidate: {path: 'CBr2.gif', match: 2},
      bottomCandidate: {path: 'QSb1.gif', match: 4},
      recordResponse: true
    },
    {
      index: 25,
      referenceImage: 'CSr1.gif',
      topCandidate: {path: 'CSr12.gif', match: 4},
      bottomCandidate: {path: 'QBb22.gif', match: 0},
      recordResponse: true
    },
    {
      index: 26,
      referenceImage: 'QSb2.gif',
      topCandidate: {path: 'CSb2.gif', match: 4},
      bottomCandidate: {path: 'QSb2.gif', match: 5},
      recordResponse: true
    },
    {
      index: 27,
      referenceImage: 'QSr2.gif',
      topCandidate: {path: 'CBb12.gif', match: 0},
      bottomCandidate: {path: 'CBb1.gif', match: 1},
      recordResponse: true
    },
    {
      index: 28,
      referenceImage: 'CBr2.gif',
      topCandidate: {path: 'CBr2.gif', match: 5},
      bottomCandidate: {path: 'CSr22.gif', match: 3},
      recordResponse: true
    },
    {
      index: 29,
      referenceImage: 'CBb12.gif',
      topCandidate: {path: 'CSr2.gif', match: 1},
      bottomCandidate: {path: 'CBb22.gif', match: 4},
      recordResponse: true
    },
    {
      index: 30,
      referenceImage: 'QBb22.gif',
      topCandidate: {path: 'QBb22.gif', match: 5},
      bottomCandidate: {path: 'CSr1.gif', match: 0},
      recordResponse: true
    },
    {
      index: 31,
      referenceImage: 'QBr2.gif',
      topCandidate: {path: 'QBr1.gif', match: 4},
      bottomCandidate: {path: 'CSr22.gif', match: 2},
      recordResponse: true
    },
    {
      index: 32,
      referenceImage: 'CBb22.gif',
      topCandidate: {path: 'QSr2.gif', match: 1},
      bottomCandidate: {path: 'CSb1.gif', match: 2},
      recordResponse: true
    },
    {
      index: 33,
      referenceImage: 'CSb22.gif',
      topCandidate: {path: 'CSb12.gif', match: 4},
      bottomCandidate: {path: 'QBr1.gif', match: 0},
      recordResponse: true
    },
    {
      index: 34,
      referenceImage: 'CSb12.gif',
      topCandidate: {path: 'CBb1.gif', match: 3},
      bottomCandidate: {path: 'CSb22.gif', match: 4},
      recordResponse: true
    },
    {
      index: 35,
      referenceImage: 'QSr22.gif',
      topCandidate: {path: 'CSr12.gif', match: 3},
      bottomCandidate: {path: 'QSr22.gif', match: 5},
      recordResponse: true
    },
    {
      index: 36,
      referenceImage: 'QSr12.gif',
      topCandidate: {path: 'QSr12.gif', match: 5},
      bottomCandidate: {path: 'QBb2.gif', match: 1},
      recordResponse: true
    },
    {
      index: 37,
      referenceImage: 'CBb2.gif',
      topCandidate: {path: 'QSr12.gif', match: 0},
      bottomCandidate: {path: 'QBb12.gif', match: 2},
      recordResponse: true
    },
    {
      index: 38,
      referenceImage: 'QBr22.gif',
      topCandidate: {path: 'CBr1.gif', match: 2},
      bottomCandidate: {path: 'QSb22.gif', match: 3},
      recordResponse: true
    },
    {
      index: 39,
      referenceImage: 'QBr12.gif',
      topCandidate: {path: 'QBb12.gif', match: 4},
      bottomCandidate: {path: 'QBr12.gif', match: 5},
      recordResponse: true
    },
    {
      index: 40,
      referenceImage: 'CSb1.gif',
      topCandidate: {path: 'QBr22.gif', match: 0},
      bottomCandidate: {path: 'QSb2.gif', match: 3},
      recordResponse: true
    },
    {
      index: 41,
      referenceImage: 'CSb2.gif',
      topCandidate: {path: 'QBr22.gif', match: 1},
      bottomCandidate: {path: 'QBr12.gif', match: 0},
      recordResponse: true
    },
    {
      index: 42,
      referenceImage: 'CSr12.gif',
      topCandidate: {path: 'CSr12.gif', match: 5},
      bottomCandidate: {path: 'QBb2.gif', match: 0},
      recordResponse: true
    },
    {
      index: 43,
      referenceImage: 'QSb12.gif',
      topCandidate: {path: 'QBr12.gif', match: 3},
      bottomCandidate: {path: 'QBr2.gif', match: 1},
      recordResponse: true
    },
    {
      index: 44,
      referenceImage: 'CBr12.gif',
      topCandidate: {path: 'CBr22.gif', match: 4},
      bottomCandidate: {path: 'QBb2.gif', match: 1},
      recordResponse: true
    },
    {
      index: 45,
      referenceImage: 'QSb22.gif',
      topCandidate: {path: 'QSb22.gif', match: 5},
      bottomCandidate: {path: 'CBr22.gif', match: 2},
      recordResponse: true
    },
    {
      index: 46,
      referenceImage: 'QBr12.gif',
      topCandidate: {path: 'CSb2.gif', match: 0},
      bottomCandidate: {path: 'QBr12.gif', match: 5},
      recordResponse: true
    },
    {
      index: 47,
      referenceImage: 'CBb22.gif',
      topCandidate: {path: 'CBr22.gif', match: 4},
      bottomCandidate: {path: 'QSb1.gif', match: 1},
      recordResponse: true
    },
    {
      index: 48,
      referenceImage: 'CSb12.gif',
      topCandidate: {path: 'QBb12.gif', match: 3},
      bottomCandidate: {path: 'CSb12.gif', match: 5},
      recordResponse: true
    },
    {
      index: 49,
      referenceImage: 'CBb2.gif',
      topCandidate: {path: 'QSr1.gif', match: 1},
      bottomCandidate: {path: 'QSr12.gif', match: 0},
      recordResponse: true
    },
    {
      index: 50,
      referenceImage: 'QBr22.gif',
      topCandidate: {path: 'QBr22.gif', match: 5},
      bottomCandidate: {path: 'CBr22.gif', match: 4},
      recordResponse: true
    },
    {
      index: 51,
      referenceImage: 'QBr2.gif',
      topCandidate: {path: 'CSb12.gif', match: 0},
      bottomCandidate: {path: 'QBr1.gif', match: 4},
      recordResponse: true
    },
    {
      index: 52,
      referenceImage: 'CSb1.gif',
      topCandidate: {path: 'CBb1.gif', match: 4},
      bottomCandidate: {path: 'QSr12.gif', match: 2},
      recordResponse: true
    },
    {
      index: 53,
      referenceImage: 'CBr12.gif',
      topCandidate: {path: 'CBr2.gif', match: 3},
      bottomCandidate: {path: 'QSb2.gif', match: 0},
      recordResponse: true
    },
    {
      index: 54,
      referenceImage: 'CSr12.gif',
      topCandidate: {path: 'QSr12.gif', match: 4},
      bottomCandidate: {path: 'CSb22.gif', match: 3},
      recordResponse: true
    },
    {
      index: 55,
      referenceImage: 'CSb22.gif',
      topCandidate: {path: 'QSr1.gif', match: 1},
      bottomCandidate: {path: 'CSb22.gif', match: 5},
      recordResponse: true
    },
    {
      index: 56,
      referenceImage: 'CSb2.gif',
      topCandidate: {path: 'CBr2.gif', match: 3},
      bottomCandidate: {path: 'QBb22.gif', match: 2},
      recordResponse: true
    },
    {
      index: 57,
      referenceImage: 'QSb12.gif',
      topCandidate: {path: 'CBr2.gif', match: 0},
      bottomCandidate: {path: 'QBr22.gif', match: 2},
      recordResponse: true
    },
    {
      index: 58,
      referenceImage: 'QSr22.gif',
      topCandidate: {path: 'QSr22.gif', match: 5},
      bottomCandidate: {path: 'QSb1.gif', match: 2},
      recordResponse: true
    },
    {
      index: 59,
      referenceImage: 'QSb22.gif',
      topCandidate: {path: 'CBb1.gif', match: 1},
      bottomCandidate: {path: 'CBb22.gif', match: 3},
      recordResponse: true
    },
    {
      index: 60,
      referenceImage: 'CBb1.gif',
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
        userInfo: this.userInfoService.get()!,
        minPossibleBias: this.minCognitiveBias(),
        maxPossibleBias: this.maxCognitiveBias(),
        cognitiveBias: this.cognitiveBiasSum()
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
