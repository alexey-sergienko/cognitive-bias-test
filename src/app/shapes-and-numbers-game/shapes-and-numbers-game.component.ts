import { Component, OnInit } from '@angular/core';
import {timer} from "rxjs";
import {Router} from "@angular/router";
import {LocalStorageService} from "../local-storage.service";
import {saveAs} from "file-saver";

@Component({
  selector: 'app-shapes-and-numbers-game',
  templateUrl: './shapes-and-numbers-game.component.html',
  styleUrls: ['./shapes-and-numbers-game.component.css']
})
export class ShapesAndNumbersGameComponent implements OnInit {
  isRegistrationStage: boolean;
  isShowContentStage: boolean;
  isInputStage: boolean;
  isResultStage: boolean;

  userName?: string;
  userAge?: string;
  isUserLeftHanded?: boolean;

  memoTimeMillis: number;
  dateTime: string;
  isTableNumeric: boolean;

  gameTable: GameTableCell[][];

  numericGameTable: GameTableCell[][] = [
    [
      {isNumeric: true, num: 34}, {isNumeric: true, num: 72}, {isNumeric: true, num: 45}, {isNumeric: true, num: 23},
      {isNumeric: true, num: 93}, {isNumeric: true, num: 81}, {isNumeric: true, num: 16}, {isNumeric: true, num: 62},
      {isNumeric: true, num: 82}, {isNumeric: true, num: 76}, {isNumeric: true, num: 53}, {isNumeric: true, num: 35},
      {isNumeric: true, num: 17}, {isNumeric: true, num: 54}, {isNumeric: true, num: 22}, {isNumeric: true, num: 71},
    ],
  ];

  imagesGameTable: GameTableCell[][] = [
    [
      {isNumeric: false, imagePath: "train"}, {isNumeric: false, imagePath: "magpie"}, {isNumeric: false, imagePath: "magpie"}, {isNumeric: false, imagePath: "horse"},
      {isNumeric: false, imagePath: "strawberry"}, {isNumeric: false, imagePath: "books"}, {isNumeric: false, imagePath: "boat"}, {isNumeric: false, imagePath: "butterfly"},
      {isNumeric: false, imagePath: "zebra"}, {isNumeric: false, imagePath: "globe"}, {isNumeric: false, imagePath: "house"}, {isNumeric: false, imagePath: "palm"},
      {isNumeric: false, imagePath: "pen"}, {isNumeric: false, imagePath: "pig"}, {isNumeric: false, imagePath: "mushroom"}, {isNumeric: false, imagePath: "crab"},
    ]
  ];

  constructor(private router: Router, private storage: LocalStorageService) {
    this.isRegistrationStage = true;
    this.isShowContentStage = false;
    this.isInputStage = false;
    this.isResultStage = false;
    this.memoTimeMillis = 5000;
    this.dateTime = "";
    this.isTableNumeric = true;
    this.gameTable = this.numericGameTable;
  }

  ngOnInit(): void {           
  }

  setUserLeftHanded(isLeftHanded: boolean) {
    this.isUserLeftHanded = isLeftHanded;
  }

  setMemoTime(millis: number) {
    this.memoTimeMillis = millis;
  }

  enableNumericTable() {
    this.isTableNumeric = true;
    this.gameTable = this.numericGameTable;
  }

  enableImagesTable() {
    this.isTableNumeric = false;
    this.gameTable = this.imagesGameTable;
  }

  onStartGame() {
    if (this.userName && this.userAge && typeof(this.isUserLeftHanded) === 'boolean') {
      this.dateTime = new Date().toISOString(),
      this.isRegistrationStage = false;
      this.isShowContentStage = true;
      timer(this.memoTimeMillis).subscribe(() => {
        this.isShowContentStage = false;
        this.isInputStage = true;
      })
    }
  }

  onSubmit(table: GameTableCell[][]) {
    this.isInputStage = false;
    this.isResultStage = true;

    this.saveNewResult({
      userName: this.userName!!,
      userAge: this.userAge!!,
      isUserLeftHanded: this.isUserLeftHanded!!,
      memorizationTimeSeconds: this.memoTimeMillis / 1000,
      dateTime: this.dateTime,
      table: table
    });
  }

  saveNewResult(result: GameResults) {
    let existingResults = this.getSavedResults();
    existingResults.push(result);
    this.saveResults(existingResults);
  }

  isCorrectInput(cell: GameTableCell) {
    return cell.isNumeric && (cell.num === Number(cell.input))
  }

  navigateToIndex() {
    this.router.navigate(["/"]);
  }

  navigateToGameMenu() {
    this.router.navigate(["/"]);
  }

  // Storage and download handling
  private SESSIONS_KEY = 'SHAPES_AND_NUMBERS_RESULTS_STORAGE';

  getSavedResults(): GameResults[] {
    let storedSessions = this.storage.get<GameResults[]>(this.SESSIONS_KEY);
    return storedSessions == null ? [] : storedSessions;
  }

  saveResults(sessions: GameResults[]) {
    this.storage.set(this.SESSIONS_KEY, sessions);
  }

  downloadResults(result: GameResults) {
    let csv = this.toCsv(this.numericSessionResults(result));
    let blob = new Blob([csv], {type: "text/plain;charset=utf-8"})
    saveAs(blob, `${result.userName}-${result.dateTime}.csv`)
  }

  private numericSessionResults(results: GameResults): DownloadableResults {
    let correctNumbers: Set<number> = new Set<number>();
    let correctAnswersOrdered = 0
    for (const row of results.table) {
      for (const cell of row) {
        correctNumbers.add(cell.num!!);
        if (cell.num!! === Number(cell.input)) {
          correctAnswersOrdered += 1;
        }
      }
    }
    
    let correctAnswers = 0;
    for (const row of results.table) {
      for (const cell of row) {
        if (correctNumbers.has(Number(cell.input))) {
          correctAnswers += 1;
        }
      }
    }

    return {
      correctAnswersIgnoringOrder: correctAnswers,
      correctAnswersOrdered: correctAnswersOrdered,
      gameResults: results
    }
  }

  private toCsv(result: DownloadableResults) {
    let header = "Дата;ФИО;Возраст;Пользователь левша;Время на запоминание (секунд);Количество правильных ответов (безотносительно порядка);Правильных ответов (включая порядок);\n"
    let aggregatedDataLine = `${result.gameResults.dateTime};${result.gameResults.userName};${result.gameResults.userAge};${result.gameResults.isUserLeftHanded};${result.gameResults.memorizationTimeSeconds};${result.correctAnswersIgnoringOrder}/16;${result.correctAnswersOrdered}/16\n`;
    let originalTableHeader = "\n Оригинальная таблица\n";
    let originalTable = result.gameResults.table.map(row => row.map(col => col.isNumeric ? col.num : col.imagePath).join(";")).join("\n");
    let inputTableHeader = "\n Введенная пользователем таблица\n";
    let inputTable = result.gameResults.table.map(row => row.map(col => col.input).join(";")).join("\n");

    return header + aggregatedDataLine + originalTableHeader + originalTable + inputTableHeader + inputTable;
  }
}

export interface GameTableCell {
  isNumeric: boolean
  num?: number
  imagePath?: string
  expectedImageDescriptions?: Set<string>
  input?: string
}

export interface GameResults {
  userName: string
  userAge: string
  isUserLeftHanded: boolean
  memorizationTimeSeconds: number
  dateTime: string,
  table: GameTableCell[][]
}

export interface DownloadableResults {
  correctAnswersIgnoringOrder: number
  correctAnswersOrdered: number
  gameResults: GameResults
}