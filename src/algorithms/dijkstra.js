import Animator from "../animator"
import PriorityQueue from "../priorityQueue"
import Timeline from "../timeline"

export default class Dijkstra {
    constructor(height, width, animator, timeline) {

        this.queue = new PriorityQueue();
        this.animator = animator;
        this.timeline = timeline;
        this.wall = [];
        this.dist = [];
        this.visited = [];
        this.prev = [];
        this.pathToShow = [];
        this.finished = false;
        this.start = -1;
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
        this.queue.insert(current, this.dist[current]);

        this.itervalId = setInterval(function () {

            current = this.queue.pop();

            if (current === target || current === -1) {
                clearInterval(this.itervalId);
                this.finish(target);
                return;
            }

            let i = Math.floor(current / this.width);
            let j = current % this.width;

            //update distances to unvisited neigh
            this.updateDist(i - 1, j, current);
            this.updateDist(i, j + 1, current);
            this.updateDist(i + 1, j, current);
            this.updateDist(i, j - 1, current);

            this.visited[current] = true;
            this.animator.setVisited(document.getElementById(current))
            this.timeline.add(current)

        }.bind(this)
            , 30);

    }

    updateDist(i, j, current) {
        if (i < 0 || j < 0 || j >= this.width || i >= this.height || this.visited[i * this.width + j] || this.wall[i * this.width + j])
            return;

        if (this.dist[current] + 1 < this.dist[i * this.width + j]) {
            this.dist[i * this.width + j] = this.dist[current] + 1;
            this.queue.insert(i * this.width + j, this.dist[current] + 1);
            this.prev[i * this.width + j] = current;
        }

    }

    finish(target) {
        this.finished = true;
        this.displayPath(target);
        this.queue.clear();
        this.timeline.enable();
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
        this.pathToShow = [];
    }

    displayPath(id) {

        this.pathToShow.forEach(id => {
            this.animator.setVisited(document.getElementById(id));
        })
        this.pathToShow = [];

        do {
            this.pathToShow.push(id);
            id = this.prev[id];
        } while (id !== this.start)
        this.pathToShow.reverse();

        const animatePath = ((i) => {
            if (i >= this.pathToShow.length) {
                cancelAnimationFrame(this.animator.request);
                return;
            }
            this.animator.request = requestAnimationFrame(() => animatePath(i + 1));
            this.animator.setPath(document.getElementById(this.pathToShow[i]));
        }).bind(this)

        animatePath(0)
    }

}
