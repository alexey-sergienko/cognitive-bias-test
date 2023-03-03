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

export interface InfoStage {
    text: string
}

export function isInfoStage(o: any): o is InfoStage {
    return 'text' in o
}

export interface Stage {
    index: number,
    referenceImage: CandidateImage
    topCandidate: CandidateImage
    bottomCandidate: CandidateImage
    recordResponse: boolean // Determines whether the stage response will be recorded. Useful for "dry run" stages.
}

export interface CandidateImage {
    path: string,
    match: number
}

export interface StageResponse {
    top: boolean;
    match: number;
    stageIndex: number;
    referenceImage: string;
    topImage: string;
    bottomImage: string;
}
