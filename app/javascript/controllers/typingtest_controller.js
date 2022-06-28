import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="typingtest"
export default class extends Controller {

  connect() {
    console.log('hola');
    this.position = 0;
    this.word = 0;
    this.correct = 0;
    //wpm = (characters/5) / minutes
  }
  xd(e) {

    let pressedSpace = false;
    let word = this.element.children[this.word];
    let nextWord = this.element.children[this.word + 1];
    const length = word.childElementCount;

    if (e.key === ' ') {
      pressedSpace = true;
      if (this.position >= length - 1) {
        this.correct += length + 1;
      }

      this.word++;
      this.position = 0;
      let i = this.position
      while (i < length) {
        word.children[i].classList.add("text-yellow-200");
        i++
      }
    }

    const letter = word.children[this.position]
    const correct = letter.innerText === e.key;
    const letterPos = pressedSpace ? nextWord.getBoundingClientRect() : letter.getBoundingClientRect()
    let { x, y } = letterPos
    x += pressedSpace ? 0 : 12;
    const caret = document.querySelector('.caret');
    caret.classList.remove("invisible")
    caret.style.left = `${x}px`;
    caret.style.top = `${y}px`;


    if (correct && e.key !== ' ' && e.key !== 'Backspace') {
      letter.classList.add("text-white")
      this.position++
    }
    if (!correct && e.key !== ' ' && e.key !== 'Backspace') {
      letter.classList.add("text-yellow-200");
    }
  }
}
