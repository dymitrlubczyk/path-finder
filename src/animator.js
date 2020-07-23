export default class Animator {
  constructor() {
    this.request = null
  }
  setStart(elem) {
    elem.classList.remove("start", "visited")
    elem.classList.add("start")
  }
  setTarget(elem) {
    elem.classList.add("target")
  }
  setPath(elem) {
    elem.classList.add("start")
  }
  setVisited(elem) {
    elem.classList.add("visited")
  }
  setWall(elem) {
    elem.classList.add("wall")
  }
}