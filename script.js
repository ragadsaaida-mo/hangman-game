// ===== Hangman (Modern) =====
// משחק Hangman ב-JavaScript

// רשימת מילים 
const words = ["apple", "house", "bread", "mouse", "paper", "train", "candy", "plant"];

let secretWord = "";      // המילה הסודית
let displayWord = [];     // המילה כפי שמוצגת לשחקן (_ _ _)
let attempts = 6;         // מספר ניסיונות
let usedLetters = [];     // אותיות שכבר נבחרו

// ===== Timer =====
let timeLeft = 30;        // זמן לכל מהלך
let timerId = null;

// ===== פונקציות עזר =====

// בוחר מילה רנדומלית מהרשימה
function pickRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

// מציג את המילה עם הקווים / אותיות
function renderWord() {
  document.getElementById("word").textContent = displayWord.join(" ");
}

// מצייר את האיש לפי מספר הטעויות
function renderHangman() {
  const stage = 6 - attempts; // שלב = כמה טעויות נעשו

  document.querySelectorAll(".part").forEach((el) => {
    const step = Number(el.getAttribute("data-step"));
    if (step <= stage) el.classList.add("show");
    else el.classList.remove("show");
  });
}

// מציג ניסיונות, לבבות, זמן ואותיות שנבחרו
function renderStats() {
  document.getElementById("attempts").textContent = attempts;
  document.getElementById("hearts").textContent = "❤️".repeat(attempts);
  document.getElementById("time").textContent = timeLeft;

  const usedEl = document.getElementById("usedLetters");
  if (!usedLetters.length) {
    usedEl.textContent = "—";
  } else {
    usedEl.innerHTML = usedLetters
      .map(l => `<span class="chip">${l}</span>`)
      .join("");
  }

  renderHangman();
}

// מציג הודעה לשחקן (רגיל / הצלחה / שגיאה)
function setMessage(text, type = "info") {
  const msg = document.getElementById("message");
  msg.textContent = text;

  if (type === "danger") msg.style.color = "var(--danger)";
  else if (type === "good") msg.style.color = "var(--accent2)";
  else msg.style.color = "var(--text)";
}

// ===== Timer Functions =====

// עוצר את הטיימר
function stopTimer() {
  if (timerId !== null) {
    clearInterval(timerId);
    timerId = null;
  }
}

// מפעיל טיימר חדש של 30 שניות
function startTimer() {
  stopTimer();
  timeLeft = 30;
  renderStats();

  timerId = setInterval(() => {
    timeLeft--;
    renderStats();

    if (timeLeft <= 0) {
      stopTimer();
      setMessage("you lose", "danger");
      setTimeout(() => newGame(), 600);
    }
  }, 1000);
}

// מאפס טיימר אחרי מהלך
function resetTimer() {
  startTimer();
}

// ===== Game Logic =====

// התחלת משחק חדש
function initGame() {
  secretWord = pickRandomWord();

  displayWord = [];
  for (let i = 0; i < secretWord.length; i++) {
    displayWord.push("_");
  }

  attempts = 6;
  usedLetters = [];

  setMessage("");
  renderWord();
  renderStats();

  const input = document.getElementById("letter");
  if (input) input.focus();

  startTimer();
}

// סיום משחק (ניצחון / הפסד)
function endGame(message, isDanger) {
  stopTimer();
  setMessage(message, isDanger);
}

// ניחוש של אות
function guessLetter() {
  if (attempts <= 0 || !displayWord.includes("_")) return;

  const input = document.getElementById("letter");
  let letter = input.value.toLowerCase();
  input.value = "";

  if (!letter) return;
  letter = letter[0];

  // אם האות כבר נבחרה
  if (usedLetters.includes(letter)) {
    setMessage("You already used this letter!");
    return;
  }

  usedLetters.push(letter);
  resetTimer();

  if (secretWord.includes(letter)) {
    for (let i = 0; i < secretWord.length; i++) {
      if (secretWord[i] === letter) displayWord[i] = letter;
    }
    setMessage("Correct!", "good");
  } else {
    attempts--;
    setMessage("Wrong letter!", "danger");
  }

  renderWord();
  renderStats();

  if (attempts === 0) {
    endGame(`You lost! The word was: ${secretWord}`, true);
    return;
  }

  if (!displayWord.includes("_")) {
    endGame("You win! 🎉", false);
    return;
  }
}

// כפתור משחק חדש
function newGame() {
  initGame();
}

// ===== Events =====

// לחיצה על Enter = ניחוש
document.getElementById("letter").addEventListener("keydown", (e) => {
  if (e.key === "Enter") guessLetter();
});

// התחלת המשחק
initGame();

// חיבור לפונקציות מה-HTML
window.guessLetter = guessLetter;
window.newGame = newGame;
