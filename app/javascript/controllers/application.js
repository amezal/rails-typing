import { Application } from "@hotwired/stimulus"
import TypingTestController from './typingtest_controller'

const application = Application.start()

// Configure Stimulus development experience
application.debug = false
window.Stimulus = application
Stimulus.register("typingtest", TypingTestController)


export { application }
