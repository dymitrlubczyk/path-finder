import Dijkstra from './algorithms/dijkstra';
import "./style.scss"

const size = 25;

const dijkstra = new Dijkstra(size);

const modeButton = document.getElementById("mode_button");
const cleanUpButton = document.getElementById("cleanup_button");
const table = document.getElementById("table");

let mouseDown = false;
let wallMode = true;

modeButton.addEventListener("click", () => {
  wallMode = !wallMode;
  modeButton.innerHTML = wallMode ? "Wall mode" : "Select target";
})

cleanUpButton.addEventListener("click", () => {
  cleanUp();
})

//build grid
for (let j = 0; j < size; ++j) {
  const row = document.createElement("tr");
  table.appendChild(row);

  for (let i = 0; i < size; ++i) {
    const btn = document.createElement("button");
    btn.id = i + j * size;
    btn.innerHTML = `?`;

    btn.addEventListener("mouseup", () => mouseDown = false);

    btn.addEventListener("mousedown", () => mouseDown = true);

    btn.addEventListener("click", () => {

      if (!wallMode) {
        if (dijkstra.start)
          dijkstra.run(parseInt(btn.id));

        else
          dijkstra.setStart(parseInt(btn.id));
      }

    });

    btn.addEventListener("mousemove", () => {

      if (mouseDown && wallMode) {
        document.getElementById(btn.id).style.background = '#000000';
        document.getElementById(btn.id).innerHTML = 'w';
        dijkstra.wall[btn.id] = true;

      }
    })

    row.appendChild(btn);
  }

}


function cleanUp() {

  for (let i = 0; i < size ** 2; ++i) {
    document.getElementById(i).innerHTML = '?';
    document.getElementById(i).style.background = '#0B3C49';
  }

  dijkstra.cleanUp();

}