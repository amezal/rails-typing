import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="typingtest"
export default class extends Controller {

  static targets = ["blur", "words"]

  connect() {
    this.charPos = 0;
    this.wordPos = 0;
    this.correct = 0;
    this.running = false;
    this.timeLeft = 15;
    this.initCaret();
    //wpm = (characters/5) / minutes
  }

  focusin(e) {
    document.querySelector('.caret').classList.remove('invisible');

  }
  focusout(e) {

  }

  type(e) {
    let pressedSpace = false;
    let word = this.wordsTarget.children[this.wordPos];
    let nextWord = this.wordsTarget.children[this.wordPos + 1];
    const length = word.childElementCount;
    const caret = document.querySelector('.caret');
    caret.classList.remove('blink');

    //started test
    if (this.wordPos == 0 && this.charPos == 0 &&
      word.children[0].innerText == e.key) {
      this.running = true;
      let tick = window.setInterval(() => this.timeLeft--, 1000);
      window.setTimeout(() => {
        clearInterval(tick);
        this.timeLeft = 15;
      }, 30000);
    }

    //finished test
    if (!this.running || this.timeLeft <= 0) {
      alert(`wpm is: ${(Math.round(this.correct / 5) / (1 / 4))}`)
      return;
    }

    //pressed space
    if (e.keyCode === 32) {
      pressedSpace = true;
      if (this.charPos >= length) {
        this.correct += length + 1;
      } else {
        word.classList.add("border-b-2")
        word.classList.add("border-b-yellow-200")
      }

      this.wordPos++;
      this.charPos = 0;
      let i = this.charPos
      while (i < length) {
        word.children[i].classList.add("text-yellow-200");
        i++
      }
    }

    //types letter instead of space in last index
    if (this.charPos >= length) {
      return
    }

    const letter = word.children[this.charPos]
    const correct = letter.innerText === e.key;
    const letterPos = pressedSpace ? nextWord.getBoundingClientRect() : letter.getBoundingClientRect();
    let { x, y } = letterPos;
    x += pressedSpace ? 0 : 12;
    caret.style.left = `${x}px`;
    caret.style.top = `${y}px`;

    //checks if character typed is rorrect
    if (correct && e.key !== ' ' && e.key !== 'Backspace') {
      letter.classList.add("text-white");
      this.charPos++;
    }
    if (!correct && e.key !== ' ' && e.key !== 'Backspace') {
      letter.classList.add("text-yellow-200");
    }
  }

  initCaret() {
    let word = this.wordsTarget.children[this.wordPos];
    const letter = word.children[this.charPos];
    const letterPos = letter.getBoundingClientRect();
    let { x, y } = letterPos;
    const caret = document.querySelector('.caret');
    caret.style.left = `${x}px`;
    caret.style.top = `${y}px`;
  }

}
