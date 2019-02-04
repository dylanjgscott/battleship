class Coordinate {

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

}

class Shot extends Coordinate {}

class Ship {

    constructor(start, end) {
        // swap x, if needed
        if(start.x > end.x) {
            [start.x, end.x] = [end.x, start.x];
        }
        // swap y, if needed
        if(start.y > end.y) {
            [start.y, end.y] = [end.y, start.y];
        }
        this.start = start;
        this.end = end;
        this.hits = [];
    }

    // check if a shot hits or not
    checkShot(shot) {
        // x too wide
        if(shot.x < this.start.x || shot.x > this.end.x) {
            return false;
        }
        // y too wide
        if(shot.y < this.start.y || shot.y > this.end.y) {
            return false;
        }
        // already hit there
        for(let i in this.hits) {
            let hit = this.hits[i];
            if(shot.x == hit.x && shot.y == hit.y) {
                return false;
            }
        }
        // ok it was a hit so remember where
        this.hits.push(shot);
        return true;
    }

    // ship status
    get sunk() {
        // floating
        if(this.hits.length < this.size) {
            return false;
        }
        // sunk
        else {
            return true;
        }

    }

    // number of squares occupied by ship
    get size() {
        return (this.end.x - this.start.x + 1) * (this.end.y - this.start.y + 1);
    }

}

exports.Coordinate = Coordinate;
exports.Ship = Ship;
exports.Shot = Shot;
