export default class Animator {
  constructor() {

  }
  setStart(elem) {
    elem.classList.add("start")
  }
  setTarget(elem) {
    elem.classList.add("target")
  }
  setVisited(elem) {
    elem.classList.add("visited")
  }
  setWall(elem) {
    elem.classList.add("wall")
  }
}