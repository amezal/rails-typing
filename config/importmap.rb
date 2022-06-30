# Pin npm packages by running ./bin/importmap

pin "application", preload: true
pin "@hotwired/turbo-rails", to: "turbo.min.js", preload: true
pin "@hotwired/stimulus", to: "stimulus.min.js", preload: true
pin "@hotwired/stimulus-loading", to: "stimulus-loading.js", preload: true
pin "app/javascript/controllers/application.js"
pin "app/javascript/controllers/typingtest_controller.js"
# pin_all_from "app/javascript/controllers", under: "controllers"
# pin "flowbite", to: "https://ga.jspm.io/npm:flowbite@1.4.7/dist/flowbite.js"