import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="typingtest"
export default class extends Controller {

  static targets = ["blur", "words"]

  connect() {
    this.charPos = 0;
    this.wordPos = 0;
    this.correct = 0;
    this.running = false;
    this.timeLeft = 30;
    // this.initCaret();
    //wpm = (characters/5) / minutes
  }

  focusin(e) {
    document.querySelector('.caret').classList.remove('invisible');
    this.initCaret();
  }
  focusout(e) {
    document.querySelector('.caret').classList.add('invisible');
    document.querySelector('.caret').classList.remove('blink');
    this.initCaret();
  }

  type(e) {
    let pressedSpace = false;
    let word = this.wordsTarget.children[this.wordPos];
    let nextWord = this.wordsTarget.children[this.wordPos + 1];
    const length = word.childElementCount;
    const caret = document.querySelector('.caret');
    caret.classList.remove('blink');
    caret.scrollIntoView();

    //started test
    if (this.wordPos == 0 && this.charPos == 0 &&
      word.children[0].innerText == e.key) {
      this.running = true;
      this.tick = window.setInterval(() => {
        this.timeLeft > 0 && this.timeLeft--;
        document.querySelector('.timer').innerText = this.timeLeft - 1;
      }, 1000);
      this.timer = window.setTimeout(() => {
        clearInterval(this.tick);
        this.timeLeft = 30;
        console.log(`wpm is: ${(Math.round(this.correct / 5) / (1 / 2))}`)
        this.saveEntry();
      }, 5001);
    }

    //finished test
    if (!this.running || this.timeLeft <= 0) {
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
    if (y > this.lastHeight + 10) {
      this.wordsTarget.scrollTop += 32;
    }
    this.lastHeight = y;

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
    let word = this.wordsTarget.children[0];
    const letter = word.children[0];
    const letterPos = letter.getBoundingClientRect();
    let { x, y } = letterPos;
    const caret = document.querySelector('.caret');
    caret.style.left = `${x}px`;
    caret.style.top = `${y}px`;
  }

  saveEntry() {
    console.log(`wpm is: ${(Math.round(this.correct / 5) / (1 / 2))}`)
    const wpm = (Math.round(this.correct / 5) / (1 / 2))
    fetch('/test_entries', {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').content
      },
      body: JSON.stringify({
        wpm: wpm,
        accuracy: 100,
      })
    })
      .then(res => res.text())
      .then(Turbo.renderStreamMessage)
  }

  refresh() {
    clearInterval(this.tick)
    clearTimeout(this.timer)
    this.connect();
    this.focusout();
  }

}
