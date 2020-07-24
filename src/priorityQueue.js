export default class PriorityQueue {
  constructor() {
    //array of objects {id,dist} sorted decreasingly by dist
    this.queue = []
  }

  insert(id, dist) {
    let left = 0,
      right = this.queue.length,
      middle;
    while (left < right) {
      middle = Math.floor((left + right) / 2);
      if (dist < this.queue[middle].dist) {
        left = middle + 1;
      } else {
        right = middle;
      }
    }
    this.queue.splice(left, 0, { id, dist })
  }

  pop() {
    return this.queue.pop().id
  }

  clear() {
    this.queue = []
  }
}