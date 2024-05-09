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

import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PictureLoopComponent} from "./picture-loop/picture-loop.component";
import {CompletionScreenComponent} from "./completion-screen/completion-screen.component";
import {StartScreenComponent} from "./start-screen/start-screen.component";
import {UserInfoFormComponent} from "./user-info-form/user-info-form.component";
import {ResultTableComponent} from "./result-table/result-table.component";
import {NumericTableGameComponent} from "./numeric-table-game/numeric-table-game.component";
import {GameMenuComponent} from "./game-menu/game-menu.component";
import {NumericTableGameMenuComponent} from "./numeric-table-game-menu/numeric-table-game-menu.component";
import {NumericTableGameResultsComponent} from "./numeric-table-game-results/numeric-table-game-results.component";

const routes: Routes = [
    {path: "startCbt", component: StartScreenComponent},
    {path: "userInfo", component: UserInfoFormComponent},
    {path: "test", component: PictureLoopComponent},
    {path: "complete", component: CompletionScreenComponent},
    {path: "results", component: ResultTableComponent},
    {path: "numericTableGame", component: NumericTableGameMenuComponent},
    {path: "numericTableGameResults", component: NumericTableGameResultsComponent},
    {path: "menu", component: GameMenuComponent},
    {path: '', redirectTo: '/menu', pathMatch: 'full'},
    {path: '**', redirectTo: ''}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
