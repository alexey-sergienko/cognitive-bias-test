import { Component, OnInit } from '@angular/core';
import { timer } from "rxjs";
import { Router } from "@angular/router";
import { LocalStorageService } from "../local-storage.service";
import { saveAs } from "file-saver";

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
      { isNumeric: true, num: 34 }, { isNumeric: true, num: 72 }, { isNumeric: true, num: 45 }, { isNumeric: true, num: 23 },
      { isNumeric: true, num: 93 }, { isNumeric: true, num: 81 }, { isNumeric: true, num: 16 }, { isNumeric: true, num: 62 },
      { isNumeric: true, num: 82 }, { isNumeric: true, num: 76 }, { isNumeric: true, num: 53 }, { isNumeric: true, num: 35 },
      { isNumeric: true, num: 17 }, { isNumeric: true, num: 54 }, { isNumeric: true, num: 22 }, { isNumeric: true, num: 71 },
    ],
  ];

  imagesGameTable: GameTableCell[][] = [
    [
      {
        isNumeric: false,
        imagePath: "train",
        expectedImageDescriptions: [
          "поезд", "поез", "поездд",
          "вагон", "вагонн",
          "паровоз", "паравоз",
          "электричка", "электричкаа",
          "состав", "соства",
          "локомотив", "локамотив",
          "жд поезд", "ждпоезд"
        ]
      },
      {
        isNumeric: false,
        imagePath: "magpie",
        expectedImageDescriptions: [
          "сорока", "сороко", "сорокаа",
          "птица", "птицаа", "птитца",
          "ворона", "варона", "воронна",
          "ворон", "варон",
          "птичка", "птичька",
          "пернатая", "пернатое"
        ]
      },
      {
        isNumeric: false,
        imagePath: "flower",
        expectedImageDescriptions: [
          "цветок", "цветоок", "цветокк",
          "цветы", "цвети", "цветыы",
          "цветочек", "цветочик",
          "растение", "расстение", "растенее",
          "цветение", "цветеньие",
          "бутон", "бутонн",
          "цветочек"
        ]
      },
      {
        isNumeric: false,
        imagePath: "horse",
        expectedImageDescriptions: [
          "лошадь", "лошад", "лошать", "лошдь",
          "конь", "кон", "коонь",
          "лошадка", "лошатка",
          "лошадка",
          "жеребец", "жеребецц",
          "кобыла", "кабыла",
          "жеребенок", "жеребёнок", "жеребенокк",
          "жеребёнок"
        ]
      },
      {
        isNumeric: false,
        imagePath: "strawberry",
        expectedImageDescriptions: [
          "клубника", "клубнка", "клубнника", "клубникаа",
          "ягода", "ягодаа", "ягодда",
          "ягодка", "яготка",
          "земляника", "земляниика", "земленика",
          "клубничка", "клубничька",
          "клубничная ягода"
        ]
      },
      {
        isNumeric: false,
        imagePath: "books",
        expectedImageDescriptions: [
          "книги", "книгиы", "книги",
          "книга", "книгаа", "книна",
          "учебники", "учебнки", "учебникии",
          "учебник", "учебникк",
          "ежедневники", "ежедневникки", "ежедневникии",
          "ежедневник", "ежедненик",
          "литература", "литеретура",
          "издания", "изданя",
          "тома", "томмы",
          "книжки", "книжкии", "книшки",
          "книжка", "книшка"
        ]
      },
      {
        isNumeric: false,
        imagePath: "boat",
        expectedImageDescriptions: [
          "лодка", "лодко", "лоддка", "лодкаа",
          "корабль", "карабль", "кораб", "корабльь",
          "судно", "судноо", "судно",
          "парусник", "парусникк", "парустник",
          "гондола", "гонддола", "гондало",
          "шлюпка", "шлюпко", "шлюппка",
          "яхта", "яхтаа", "яхтта",
          "катер", "каттер",
          "баржа", "баржаа",
          "плот", "плотт",
          "каноэ", "каное", "каноэ",
          "байдарка", "байдаркаа",
          "моторная лодка", "моторная лоддка",
          "кораблик", "корабликк",
          "лодочка", "лодочька"
        ]
      },
      {
        isNumeric: false,
        imagePath: "butterfly",
        expectedImageDescriptions: [
          "бабочка", "бабачка", "баббочка", "бабочкаа",
          "капустница", "капустнитца", "капустницаа",
          "мотылек", "мотылёк", "матылек", "матылёк", "мотылекк",
          "мотылёкк",
          "бабочка капустница",
          "насекомое", "насикомае", "насекомоее",
          "букашка", "бугашка",
          "чешуекрылое", "чешуикрылое"
        ]
      },
      {
        isNumeric: false,
        imagePath: "zebra",
        expectedImageDescriptions: [
          "зебра", "зебро", "зеббра", "зебраа",
          "марти", "мартиi", "мартиы",
          "лошадь", "лошад", "лошать",
          "лошадка", "лошатка",
          "животное", "живатное", "животноее",
          "зеброчка", "зеброчкаа",
          "полосатая лошадь", "полосатая лошать",
          "полосатое животное", "полосатое жевотное"
        ]
      },
      {
        isNumeric: false,
        imagePath: "globe",
        expectedImageDescriptions: [
          "глобус", "глобусс", "глобос",
          "земля", "земла", "земмля", "земляа",
          "планета", "планетаа", "планета",
          "шар", "шаар", "шарр",
          "сфера", "сфэра", "сффера",
          "земной шар", "земнои шар", "земнойшар",
          "модель земли", "модель землли",
          "карта", "картаа",
          "карта мира", "картаа мира",
          "мир", "миир"
        ]
      },
      {
        isNumeric: false,
        imagePath: "house",
        expectedImageDescriptions: [
          "лошадь", "лошад", "лошать",
          "конь", "кон", "коонь",
          "дом", "доом", "домм",
          "домик", "домикк", "домиек",
          "жилье", "жильё", "жылье",
          "здание", "зданее", "здпние",
          "строение", "строениее", "строинее",
          "коттедж", "котедж", "коттэдж",
          "жилище", "жилищее",
          "особняк", "особнякк",
          "хата", "хатаа",
          "домишко", "домишка"
        ]
      },
      {
        isNumeric: false,
        imagePath: "palm",
        expectedImageDescriptions: [
          "пальма", "палма", "пальмаа", "пальмма",
          "кокос", "кокосс", "какаос",
          "дерево", "деревоo", "деревоа", "деревво",
          "пальмовое дерево", "пальмовое деревоо",
          "кокосовая пальма", "кокосавая пальма",
          "тропическое дерево", "тропическое деревво",
          "растение", "расстение", "растенее",
          "пальмочка", "пальмачка",
          "кокосовая пальма"
        ]
      },
      {
        isNumeric: false,
        imagePath: "pen",
        expectedImageDescriptions: [
          "ручка", "ручко", "руччка", "ручкаа",
          "фломастер", "фломастерр", "фламастер", "фломастир",
          "маркер", "маркерр", "маркер",
          "ручка шариковая", "шариковая ручка", "шариковая ручька",
          "авторучка", "автаручка",
          "письменная ручка", "писменная ручка",
          "канцелярская ручка", "канцеляркая ручка",
          "перо", "пиро",
          "стержень", "стерженьь"
        ]
      },
      {
        isNumeric: false,
        imagePath: "pig",
        expectedImageDescriptions: [
          "свинья", "свиня", "свиньяя", "свинья",
          "поросенок", "поросёнок", "поросеннок", "паросенок", "паросёнок",
          "поросенокк", "поросёнокк",
          "минипиг", "мини-пиг", "мини пиг", "минипигг",
          "свинка", "свинкаа", "свинька",
          "поросенок", "поросёнок",
          "кабан", "кабанн",
          "кабанчик", "кабанчек",
          "хрюшка", "хрюшька",
          "хрюша", "хрюшаа",
          "свин", "свинн"
        ]
      },
      {
        isNumeric: false,
        imagePath: "mushroom",
        expectedImageDescriptions: [
          "гриб", "грибб", "грибб",
          "мухомор", "мухоморр", "мухомар",
          "грибы", "гриби", "гриббы",
          "мухоморы", "мухомари", "мухоморыы",
          "поганка", "паганка", "поганкаа",
          "поганки", "поганкии",
          "грибок", "грибокк",
          "грибочек", "грибочик",
          "грибочки", "грибочкии",
          "грибница", "грибнитца",
          "шляпка", "шляпька",
          "лесной гриб", "леснои гриб",
          "красный мухомор", "красный мухамор",
          "ядовитый гриб", "ядовитыйгриб"
        ]
      },
      {
        isNumeric: false,
        imagePath: "crab",
        expectedImageDescriptions: [
          "краб", "крабб", "краап",
          "лобстер", "лобстерр", "лапстер",
          "рак", "раак", "ракк",
          "скорпион", "скорпиён", "скарпион", "скорпионн",
          "красти-крабс", "красти крабс", "красти краб",
          "крабс", "крабик", "крабикк",
          "ракообразное", "ракообразноее", "ракообразное",
          "морской рак", "морской раак",
          "морской краб", "морской крааб",
          "ракообразный", "ракообразныи",
          "морское животное", "морское жевотное"
        ]
      }
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
    if (this.userName && this.userAge && typeof (this.isUserLeftHanded) === 'boolean') {
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
    if (cell.isNumeric) {
      return cell.isNumeric && (cell.num === Number(cell.input))
    }
    return cell.input ? (cell.expectedImageDescriptions?.includes(cell.input.toLocaleLowerCase())) : false;
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
    let csv = result.table[0][0].isNumeric ? this.toCsv(this.numericSessionResults(result)) : this.toCsv(this.imageSessionResults(result));
    let blob = new Blob([csv], { type: "text/plain;charset=utf-8" })
    saveAs(blob, `${result.userName}-${result.dateTime}.csv`)
  }

  deleteResult(result: GameResults) {
    let existingResults = this.getSavedResults();
    let filteredResults = existingResults.filter(r => r.dateTime !== result.dateTime);
    this.saveResults(filteredResults);
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

  private imageSessionResults(results: GameResults): DownloadableResults {
    let allCorrectOptions = new Set<string>();
    let correctAnswersOrdered = 0;
    let correctAnswers = 0;

    for (const row of results.table) {
      for (const cell of row) {
        console.log(cell)
        cell.expectedImageDescriptions?.forEach(d => allCorrectOptions.add(d));
        if (cell.expectedImageDescriptions?.includes(cell.input?.toLocaleLowerCase() ?? "N/A")) {
          correctAnswersOrdered += 1;
        }
      }
    }

    for (const row of results.table) {
      for (const cell of row) {
        if (allCorrectOptions.has(cell.input?.toLocaleLowerCase() ?? "N/A")) {
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
  expectedImageDescriptions?: string[]
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