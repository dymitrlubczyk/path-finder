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
    elem.classList.remove("visited")
    const newElem = elem.cloneNode(true)
    elem.parentNode.replaceChild(newElem, elem)
    newElem.classList.add("path")
  }
  setVisited(elem) {
    elem.classList.remove("path")
    elem.classList.add("visited")
  }
  setWall(elem) {
    elem.classList.add("wall")
  }
}