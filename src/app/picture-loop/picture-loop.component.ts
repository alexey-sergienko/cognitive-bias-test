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

import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {GameSessionService} from "../game-session.service";
import {InfoStage, isInfoStage, Stage} from "../model/stage";
import {Subscription, timer} from "rxjs";
import {Router} from "@angular/router";

@Component({
    selector: 'app-picture-loop',
    templateUrl: './picture-loop.component.html',
    styleUrls: ['./picture-loop.component.css']
})
export class PictureLoopComponent implements OnInit, OnDestroy {
    infoStage: InfoStage | null;
    pictureStage: Stage | null;
    stageResponseSubmitted: boolean;

    showReference: boolean = false;
    showCandidates: boolean = false;

    private timeMillisCandidatesShown: number;

    private stageSubscription: Subscription | null;

    constructor(private gameSession: GameSessionService, private router: Router) {
        this.infoStage = null;
        this.pictureStage = null;
        this.stageResponseSubmitted = false;
        this.stageSubscription = null;
        this.timeMillisCandidatesShown = 0;
    }

    ngOnInit(): void {
        this.gameSession.reset();

        this.stageSubscription = this.gameSession.stage().subscribe(
            (s: Stage | InfoStage) => {
                if (!isInfoStage(s)) {
                    this.infoStage = null;
                    this.pictureStage = s;
                    this.stageResponseSubmitted = false;
                    this.showReference = false;
                    this.showCandidates = false;

                    timer(1000).subscribe(() => {
                        this.showReference = !this.showReference;
                    })
                    timer(3000).subscribe(() => {
                        this.showCandidates = !this.showCandidates;
                        this.timeMillisCandidatesShown = Date.now();
                    });
                } else {
                    this.infoStage = s;
                    this.pictureStage = null;
                }
            },
            e => {
                console.log("Error: " + e);
            },
            () => {
                console.log("Game session completed. Navigating to completion screen.");
                this.router.navigate(["/complete"])
            }
        );
        this.gameSession.start();
    }

    ngOnDestroy(): void {
        this.stageSubscription?.unsubscribe();
    }

    @HostListener('document:keydown', ['$event'])
    handleKeyDownEvent(event: KeyboardEvent) {
        let keyCode = event.code;

        if (this.pictureStage !== null && !this.stageResponseSubmitted && this.showCandidates) {
            switch (keyCode) {
                case 'ArrowUp':
                    this.gameSession.submitResponse({
                        top: true,
                        match: this.pictureStage!.topCandidate.match,
                        stageIndex: this.pictureStage!.index,
                        referenceImage: this.pictureStage!.referenceImage,
                        topImage: this.pictureStage!.topCandidate,
                        bottomImage: this.pictureStage!.bottomCandidate,
                        timeToChoiceMillis: Date.now() - this.timeMillisCandidatesShown
                    })
                    break;
                case 'ArrowDown':
                    this.gameSession.submitResponse({
                        top: false,
                        match: this.pictureStage!.bottomCandidate.match,
                        stageIndex: this.pictureStage!.index,
                        referenceImage: this.pictureStage!.referenceImage,
                        topImage: this.pictureStage!.topCandidate,
                        bottomImage: this.pictureStage!.bottomCandidate,
                        timeToChoiceMillis: Date.now() - this.timeMillisCandidatesShown
                    })
                    break;
            }
        }

        if (this.infoStage !== null && keyCode === 'Space') {
            this.gameSession.submitResponse({
                top: false,
                match: 0,
                stageIndex: 0,
                referenceImage: {
                    path: '',
                    match: 0,
                    color: false,
                    shape: false,
                    count: false,
                    size: false,
                    filled: false
                },
                topImage: {path: '', match: 0, color: false, shape: false, count: false, size: false, filled: false},
                bottomImage: {path: '', match: 0, color: false, shape: false, count: false, size: false, filled: false},
                timeToChoiceMillis: Date.now() - this.timeMillisCandidatesShown
            })
        }
    }

}
