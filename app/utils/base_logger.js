class Logger {
  constructor(bunyanLogger) {
    this.bunyanLogger = bunyanLogger;
    this.children = [];
  }

  child(opts) {
    const childLogger = new Logger(this.bunyanLogger.child(opts));
    this.children.push(childLogger);
    return childLogger;
  }

  trace(...params) {
    this.bunyanLogger.trace(...params);
  }

  debug(...params) {
    this.bunyanLogger.debug(...params);
  }

  info(...params) {
    this.bunyanLogger.info(...params);
  }

  warn(...params) {
    this.bunyanLogger.warn(...params);
  }

  error(...params) {
    this.bunyanLogger.error(...params);
  }

  fatal(...params) {
    this.bunyanLogger.fatal(...params);
  }

  reopenFileStreams() {
    this.bunyanLogger.reopenFileStreams();
    this.children.forEach(c => c.reopenFileStreams());
  }
}

module.exports = Logger;
