const JasmineConsoleReporter = require('jasmine-console-reporter')

let consoleReporter = new JasmineConsoleReporter()
jasmine.getEnv().addReporter(consoleReporter)