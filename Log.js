class Entry {

    constructor() {
        this.error = null;
        this.messages = [];
        this.shot = null;
        this.state = null;
    }

    log(message) {
        this.messages.push(message);
    }

}

class Log {

    constructor() {
        this.entries = [];
        this.activeEntry = new Entry();
        this.entries.push(this.activeEntry);
    }

    error(error) {
        this.activeEntry.error = error;
    }

    log(message) {
        this.activeEntry.log(message);
    }

    shot(shot, state) {
        this.activeEntry.shot = shot;
        this.activeEntry.state = state;
        this.activeEntry = new Entry();
        this.entries.push(this.activeEntry);
    }

}
module.exports = Log;
