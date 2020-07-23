import Animator from "../animator"

export default class Dijkstra {
    constructor(height, width) {

        this.animator = new Animator()
        this.wall = [];
        this.dist = [];
        this.visited = [];
        this.prev = [];
        this.finished = false;
        this.start=-1;
        this.setSize(height, width);
    }

    setSize(height, width) {
        this.height = height;
        this.width = width;
        for (let i = 0; i < height * width; ++i) {
            this.visited.push(false);
            this.wall.push(false);
            this.dist.push(Number.POSITIVE_INFINITY)
            this.prev.push(-1)
        }
    }

    setStart(start) {
        this.start = start;
    }

    run(target) {

        let current = this.start;
        this.dist[current] = 0;

        this.itervalId = setInterval(function () {

            current = this.findNext();

            if (current === target || current === -1) {
                clearInterval(this.itervalId);
                this.displayPath(target);
                this.finished=true;
                return;
            }

            let i = Math.floor(current / this.width);
            let j = current % this.width;

            //update distances to unvisited neigh
            this.updateDist(i - 1, j, current);
            this.updateDist(i + 1, j, current);
            this.updateDist(i, j - 1, current);
            this.updateDist(i, j + 1, current);

            this.visited[current] = true;
            this.animator.setVisited(document.getElementById(current))

        }.bind(this)
            , 30);

    }

    updateDist(i, j, current) {
        if (i < 0 || j < 0 || j >= this.width || i >= this.height || this.visited[i * this.width + j] || this.wall[i * this.width + j])
            return;

        if (this.dist[current] + 1 < this.dist[i * this.width + j]) {
            this.dist[i * this.width + j] = this.dist[current] + 1;
            this.prev[i * this.width + j] = current;
        }

    }

    findNext() {
        let minDist = Number.POSITIVE_INFINITY;
        let current = -1;

        for (let v = 0; v < this.width * this.height; ++v) {
            if (this.visited[v] || this.wall[v])
                continue;

            if (this.dist[v] < minDist) {
                current = v;
                minDist = this.dist[v];
            }
        }

        return current;
    }

    cleanUp() {

        for (let i = 0; i < this.height * this.width; ++i) {
            this.visited[i] = false;
            this.wall[i] = false;
            this.dist[i] = Number.POSITIVE_INFINITY;
            this.prev[i] = -1;
        }
        this.start = -1;
        this.finished = false;
    }

    displayPath(target) {

        let current=target;

        do{
            this.animator.setPath(document.getElementById(current));
            current = this.prev[current];
        }while(current!==this.start);

    }

}
