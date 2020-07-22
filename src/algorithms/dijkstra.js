import Animator from "../animator"

export default class Dijkstra {
    constructor(size) {

        this.animator = new Animator()
        this.wall = [];
        this.dist = [];
        this.visited = [];
        this.setSize(size);
    }

    setSize(size) {
        this.size = size;
        for (let i = 0; i < this.size ** 2; ++i) {
            this.visited.push(false);
            this.wall.push(false);
            this.dist.push(size * size);
        }
    }

    setStart(start) {
        this.start = start;
    }

    run(target) {

        let current = this.start;
        this.dist[current] = 0;
        console.log(current)

        this.itervalId = setInterval(function () {

            current = this.findNext();

            if (current === target || current === -1) {
                clearInterval(this.itervalId);
                return;
            }

            let i = current % this.size;
            let j = Math.floor(current / this.size);

            //update distances to unvisited neigh
            this.updateDist(i - 1, j, current);
            this.updateDist(i + 1, j, current);
            this.updateDist(i, j - 1, current);
            this.updateDist(i, j + 1, current);

            this.visited[current] = true;
            // console.log(document.getElementById(i + j * this.size))
            this.animator.setVisited(document.getElementById(i + j * this.size))
            // document.getElementById(i + j * this.size).classList.add("visited")

        }.bind(this)
            , 40);


    }

    updateDist(i, j, current) {
        if (i < 0 || j < 0 || j >= this.size || i >= this.size || this.visited[i + j * this.size] || this.wall[i + j * this.size])
            return;

        if (this.dist[current] + 1 < this.dist[i + j * this.size]) {
            this.dist[i + j * this.size] = this.dist[current] + 1;
            // document.getElementById(i + j * this.size).textContent = this.dist[i + j * this.size];
        }

    }

    findNext() {
        let minDist = this.size ** 2;
        let current = -1;

        for (let v = 0; v < this.size ** 2; ++v) {
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

        for (let i = 0; i < this.size ** 2; ++i) {
            this.visited[i] = false;
            this.wall[i] = false;
            this.dist[i] = this.size ** 2;
        }

        this.start = null;

    }

}
