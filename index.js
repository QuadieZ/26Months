const fade = document.getElementById("fade");
const d = document.getElementById("dialogue");
const sp = document.getElementById("main");
const choiceDiv = document.getElementById("choices");
const questionTxt = document.getElementById("question");
const placeHolder = document.getElementById("answerbox");
const sp2 = document.getElementById("qsprite");
const d2 = document.getElementById("hintDialogue");
const hintp = document.getElementById("ansHint");
let dn = 0;
let scene = 1;
let ch = false;
let s;
let wrong = 0;
let hint = 0;
let tutorial = true;
let q = 0;

const sprites = [
  "dead.png", //0
  "mad.png", //1
  "smile1.png", //2
  "smile2.png", //3
  "smol1.png", //4
  "sweat.png", //5
  "sweatdead.png", //6
  "deadtalk.png", //7
];

const dialogues1 = [
  ["Yeah, it's you-know-what-day-it-is day. Surprise!", 4],
  ["Let's see... She got a letter for you! Lemme just find it...", 3],
  ["...", 0],
  ["Oh...", 6],
  ["...", 5],
  ["I'm sure it was here!", 1],
  ["Er, Oops. Might've dropped it somewhere. Wanna go find it together?", 5],
];

const questions = [
  [
    "When the Flower and Butterfly meet.",
    "161018",
    "Eight Digit Numbers",
    "Eh?...Is it like a date or something?",
    7,
    "Two years ago",
  ],
  [
    "Twenty and a bit more, That's what this special day is for.",
    "26",
    "Two Digit Numbers",
    "Seriously, more numbers?!",
    1,
    "Months",
  ],
  [
    "Always with the Flower, forever and ever",
    "butterfly",
    "alphabets",
    "OOh, I know this one!",
    2,
    "You",
  ],
  [
    "Our favourite ice-cream flavour.",
    "cookie",
    "alphabets",
    "Not even a riddle. Bet she's getting lazy.",
    7,
    "It's delicious",
  ],
  [
    "Wanna tell me something?",
    "",
    "Anything!",
    "Aw, go ahead. She's waiting to hear it.",
    4,
    "I love you",
  ],
];

const correctDialogue = [
  "Yay!",
  "Great Work!",
  "You did it! No wonder she always praises you.",
  "You're amazing!",
];

const wrongDialogue = [
  "Hmm.. Maybe try something else?",
  "Eh...? Any ideas?",
  "No worries. Let's try again!",
  "I thought that was it.",
];

function fadeInFunction() {
  let io = 1;
  let ifading = setInterval(itimer, 50);
  function itimer() {
    io = io - 0.05;
    fade.style.opacity = io;
    //console.log(fade.style.opacity);
    if (io < 0) {
      clearInterval(ifading);
      fade.style.display = "none";
    }
  }
}

function fadeOutFunction() {
  fade.style.display = "block";
  let oo = 0;
  let ofading = setInterval(otimer, 50);
  function otimer() {
    oo = oo + 0.05;
    fade.style.opacity = oo;
    //console.log(fade.style.opacity);
    if (oo > 1) {
      clearInterval(ofading);
    }
  }
}

function dialogueChange(x) {
  let len = x.length;
  if (dn < len) {
    d.innerHTML = x[dn][0];
    sp.src = "./assets/sprites/" + sprites[x[dn][1]];
    dn++;
    if (dn == 1) {
      this.document.getElementById("help").style.display = "none";
    }
  }
}

function yes() {
  d.innerHTML = "Fantastic! Let's get going then";
  sp.src = "./assets/sprites/" + sprites[2];
  ch = true;
}

function no() {
  d.innerHTML =
    "Eh, really? I'm so sorry then! \n (Actually, maybe you should choose 'Yes' 'cus she didn't have enough time to complete this route)";
  this.document.getElementById("nobut").style.opacity = 0;
}

function sceneOneEnd() {
  fadeOutFunction();
  setTimeout(function () {
    fadeInFunction();
    this.document.getElementById("sceneOne").style.display = "none";
    this.document.getElementById("sceneTwo").style.display = "flex";
  }, 1500);
  scene = 2;
  document.addEventListener("keyup", (event) => {
    if (event.code === "Enter") {
      checkAnswer();
    }
  });
}

function sceneTwoEnd() {
  fadeOutFunction();
  setTimeout(function () {
    fadeInFunction();
    this.document.getElementById("sceneTwo").style.display = "none";
    this.document.getElementById("sceneThree").style.display = "flex";
  }, 1500);
  scene = 3;
  document.getElementById("hintAmount").innerHTML = "Hint Used: " + hint;
  document.getElementById("wrongAmount").innerHTML = "Wrong Answers: " + wrong;
}

function runGame() {
  if (scene == 1) {
    dialogueChange(dialogues1);
    if (dn == dialogues1.length && ch == false) {
      choiceDiv.style.display = "flex";
    } else if (s == "change") {
      sceneOneEnd();
    } else if (dn == dialogues1.length && ch == true) {
      choiceDiv.style.display = "none";
      s = "change";
    }
  }
}

function requestHint() {
  hint++;
  if (tutorial == true) {
    hintp.innerHTML = ".......";
  } else {
    hintp.innerHTML = questions[q][5];
  }
}

function checkAnswer() {
  let answer = placeHolder.value.toLowerCase();
  //console.log(answer);
  if (tutorial == true) {
    if (answer.includes("yes")) {
      correctAns();
      tutorial = false;
    } else {
      sp2.src = "./assets/sprites/" + sprites[0];
      d2.innerHTML = "...";
    }
  } else {
    if (q < 4) {
      if (answer.includes(questions[q][1])) {
        q++;
        correctAns();
      } else {
        wrongAns();
      }
    } else if (q == 4) {
      const messageText = placeHolder.value;
      document.getElementById("message").innerHTML = messageText;
      sceneTwoEnd();
    }
  }
}

function correctAns() {
  //console.log("Yay");
  sp2.src = "./assets/sprites/" + sprites[2];
  d2.innerHTML =
    correctDialogue[Math.floor(Math.random() * correctDialogue.length)];
  setTimeout(function () {
    questionTxt.innerHTML = questions[q][0];
    placeHolder.value = "";
    hintp.innerHTML = "Click for hint!";
    placeHolder.placeholder = questions[q][2];
    d2.innerHTML = questions[q][3];
    sp2.src = "./assets/sprites/" + sprites[questions[q][4]];
  }, 2000);
}

function wrongAns() {
  //console.log("no");
  wrong++;
  sp2.src = "./assets/sprites/" + sprites[7];
  d2.innerHTML =
    wrongDialogue[Math.floor(Math.random() * wrongDialogue.length)];
  setTimeout(function () {
    questionTxt.innerHTML = questions[q][0];
    placeHolder.placeholder = questions[q][2];
    d2.innerHTML = questions[q][3];
    sp2.src = "./assets/sprites/" + sprites[questions[q][4]];
  }, 1500);
}

function startGame() {
  fadeInFunction();
  document.addEventListener("keyup", (event) => {
    if (event.code === "Space") {
      runGame();
    }
  });
  document.addEventListener("click", () => {
    runGame();
  });
}

function letterScene() {
  scene = 4;
  document.getElementById("sceneFour").style.display = "flex";
  document.getElementById("sceneThree").style.display = "none";
  document.addEventListener("keyup", (event) => {
    if (event.code === "Escape" && scene == 4) {
      document.getElementById("sceneFour").style.display = "none";
      document.getElementById("sceneThree").style.display = "flex";
      scene = 3;
    }
  });
}

window.onload = startGame();
