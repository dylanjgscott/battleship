class Log {

    constructor() {
        this.errors = [];
        this.messages = [];
        this.shots = [];
    }

    addError(error) {
        this.errors.push(error);
    }

    addShot(shot, state) {
        this.shots.push({
            state: state,
            x: shot.x,
            y: shot.y,
        });
    }

    log(message) {
        this.messages.push(message);
    }

}
module.exports = Log;
