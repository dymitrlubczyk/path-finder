import Dijkstra from './algorithms/dijkstra';
import Animator from "./animator"
import createInstruction from "./instruction";
import "./style.scss"
import Timeline from './timeline';

createInstruction()

window.addEventListener("resize", () => changeBoardSize())
window.addEventListener("load", () => changeBoardSize())

const changeBoardSize = () => {
  width = Math.floor(0.9 * document.body.clientWidth / cellSize) - 1
  height = Math.floor(0.7 * document.body.clientHeight / cellSize) - 1
  dijkstra.setSize(height, width)
  buildGrid()
}

let height = 10;
let width = 10;
const cellSize = 14;

const animator = new Animator();
const timeline = new Timeline(animator);
const dijkstra = new Dijkstra(height, width, animator, timeline);

const modeButton = document.getElementById("mode_button");
const cleanUpButton = document.getElementById("cleanup_button");
const table = document.getElementById("table");

let mouseDown = false;
let wallMode = true;

document.body.addEventListener("mouseup", () => mouseDown = false);
document.body.addEventListener("mousedown", () => mouseDown = true);

modeButton.addEventListener("click", () => {
  wallMode = !wallMode;
  modeButton.textContent = wallMode ? "Wall mode" : "Select target";
})

cleanUpButton.addEventListener("click", () => {
  cleanUp();
})

//build grid
function buildGrid() {
  for (let j = 0; j < height; ++j) {
    const row = document.createElement("tr");
    table.appendChild(row);

    for (let i = 0; i < width; ++i) {

      const td = document.createElement("td");
      const btn = document.createElement("button");
      btn.classList.add("boardButton", "default");
      btn.id = i + j * width;



      td.addEventListener("click", () => {

        if (!wallMode && !dijkstra.finished) {
          if (dijkstra.start !== -1) {
            animator.setTarget(btn)
            dijkstra.run(parseInt(btn.id));
          }
          else {
            animator.setStart(btn)
            dijkstra.setStart(parseInt(btn.id));
          }
        }

        if (dijkstra.finished) {
          dijkstra.displayPath(parseInt(btn.id));
        }

      });

      td.addEventListener("mousemove", () => {
        if (mouseDown && wallMode) {
          animator.setWall(btn)
          dijkstra.wall[btn.id] = true;
        }
      })

      td.appendChild(btn)
      row.appendChild(td);
    }

  }
}


function cleanUp() {

  Array.from(document.getElementsByClassName("boardButton")).forEach(btn => {
    btn.classList.remove("start", "target", "visited", "wall", "path")
    btn.classList.add("boardButton", "default")
  })

  timeline.disable();
  dijkstra.cleanUp();

}