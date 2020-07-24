export default class Animator {
  constructor() {
    this.request = null
    this.path = [];
  }
  hidePath() {
    this.path.forEach(id => {
      this.setVisited(document.getElementById(id));
    })
    this.path = [];
  }
  showPath(path) {

    this.path = path;

    function animatePath(i) {
      if (i >= this.path.length) {
        cancelAnimationFrame(this.request);
        return;
      }
      this.request = requestAnimationFrame(() => animatePath(i + 1));
      this.setPath(document.getElementById(this.path[i]));
    }
    animatePath = animatePath.bind(this)

    animatePath(0)

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