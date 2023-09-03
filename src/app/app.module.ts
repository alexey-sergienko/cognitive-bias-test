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

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PicturePickerComponent } from './picture-picker/picture-picker.component';
import { PictureLoopComponent } from './picture-loop/picture-loop.component';
import { CompletionScreenComponent } from './completion-screen/completion-screen.component';
import { StartScreenComponent } from './start-screen/start-screen.component';
import { UserInfoFormComponent } from './user-info-form/user-info-form.component';
import { InfoStageScreenComponent } from './info-stage-screen/info-stage-screen.component';
import {FormsModule} from "@angular/forms";
import { ResultTableComponent } from './result-table/result-table.component';
import { NumericTableGameComponent } from './numeric-table-game/numeric-table-game.component';
import { GameMenuComponent } from './game-menu/game-menu.component';
import { NumericTableGameMenuComponent } from './numeric-table-game-menu/numeric-table-game-menu.component';

@NgModule({
  declarations: [
    AppComponent,
    PicturePickerComponent,
    PictureLoopComponent,
    CompletionScreenComponent,
    StartScreenComponent,
    UserInfoFormComponent,
    InfoStageScreenComponent,
    ResultTableComponent,
    NumericTableGameComponent,
    GameMenuComponent,
    NumericTableGameMenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
