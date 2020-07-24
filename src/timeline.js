export default class Timeline {

  constructor(animator) {
    this.animator = animator;
    this.updates = []
  }

  add(elemId) {
    this.updates.push(elemId);
  }

  disable() {
    this.updates = [];
    const timeline = document.getElementById("timeline");
    timeline.disabled = true;
  }

  enable() {

    const timeline = document.getElementById("timeline");
    timeline.disabled = false;
    timeline.min = "0";
    timeline.max = this.updates.length - 1;
    timeline.value = timeline.max;

    function handleTimeChange(e) {
      this.animator.hidePath();
      this.getStateAt(parseInt(e.currentTarget.value));
    }

    handleTimeChange = handleTimeChange.bind(this)

    timeline.addEventListener("change", handleTimeChange);
    timeline.addEventListener("input", handleTimeChange);

  }

  getStateAt(time) {

    const bound = time + 1;

    this.updates.slice(0, bound).forEach(id => {
      const elem = document.getElementById(parseInt(id))
      elem.classList.add("visited")
    })

    this.updates.slice(bound).forEach(id => {
      const elem = document.getElementById(parseInt(id))
      elem.classList.remove("visited")
    })

  }
}