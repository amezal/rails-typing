import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="typingtest"
export default class extends Controller {

  connect() {
    console.log('hola');
    this.position = 0;
    this.word = 0;
  }
  xd(e) {
    this.position++
    console.log(this.position)
  }
}
