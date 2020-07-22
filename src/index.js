import Dijkstra from './algorithms/dijkstra';
import Animator from "./animator"
import createInstruction from "./instruction";
import "./style.scss"

createInstruction()

window.addEventListener("resize", () => changeBoardSize())
window.addEventListener("load", () => changeBoardSize())

const changeBoardSize = () => {
  size = Math.floor(document.body.clientWidth / cellSize) - 1
  dijkstra.setSize(size)
  buildGrid()
}

let size = 25;
const cellSize = 14

const dijkstra = new Dijkstra(size);
const animator = new Animator()

const modeButton = document.getElementById("mode_button");
const cleanUpButton = document.getElementById("cleanup_button");
const table = document.getElementById("table");

let mouseDown = false;
let wallMode = true;

document.body.addEventListener("mouseup", () => mouseDown = false)

modeButton.addEventListener("click", () => {
  wallMode = !wallMode;
  modeButton.textContent = wallMode ? "Wall mode" : "Select target";
})

cleanUpButton.addEventListener("click", () => {
  cleanUp();
})

//build grid
function buildGrid() {
  for (let j = 0; j < size; ++j) {
    const row = document.createElement("tr");
    table.appendChild(row);

    for (let i = 0; i < size; ++i) {

      const td = document.createElement("td");
      const btn = document.createElement("button");
      btn.classList.add("boardButton", "default");
      btn.id = i + j * size;

      td.addEventListener("mousedown", () => mouseDown = true);

      td.addEventListener("click", () => {

        if (!wallMode) {
          if (dijkstra.start) {
            animator.setTarget(btn)
            dijkstra.run(parseInt(btn.id));
          }
          else {
            animator.setStart(btn)
            dijkstra.setStart(parseInt(btn.id));
          }
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

  // for (let i = 0; i < size ** 2; ++i) {
  //   // document.getElementById(i).textContent = '?';
  //   // document.getElementById(i).style.background = '#0B3C49';

  // }

  document.getElementsByClassName("boardButton").forEach(btn => {
    btn.classList = ["boardButton", "default"]
  })

  dijkstra.cleanUp();

}