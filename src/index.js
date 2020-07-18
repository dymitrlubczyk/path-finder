const size=25;
let mouseDown=false;
let wallMode=true;
let start;
let target;
let wall = [];

let table = document.getElementById("table");

document.getElementById("mode_button").addEventListener("click",()=>{
  wallMode=!wallMode;
  document.getElementById("mode_button").innerHTML=wallMode?"Wall mode":"Select target"
})
for(let j=0; j<size; ++j)
{
  let row = document.createElement("tr");
  table.appendChild(row);

  for(let i=0; i<size; ++i)
  {
    let btn = document.createElement("button");
    btn.innerHTML = `?`;
    btn.id=i+j*size;
    btn.addEventListener("click",()=>!wallMode && djAlgorithm(btn.id))
    btn.addEventListener("mousedown",()=>mouseDown=true);
    btn.addEventListener("mouseup",()=>mouseDown=false);
    btn.addEventListener("mousemove",()=>{
      if(mouseDown && wallMode)
      {
        document.getElementById(btn.id).style.background='#000000';
        document.getElementById(btn.id).innerHTML='w';
        wall[btn.id]=true;
      }
    })
    row.appendChild(btn);

  }

}

for(let i =0 ; i<size*size; ++i)
    wall.push(false)



//shortest paths finding


function djAlgorithm(startingPoint){

    console.log('dj is back');
  if(!start)
  {
    start=startingPoint
    document.getElementById(startingPoint).innerHTML=0;
    document.getElementById(startingPoint).style.background='#15748E';
    return;
  }
  target=startingPoint
  document.getElementById(startingPoint).style.background='red';
  startingPoint=start
  let dist=[]; //distance from starting point
  let visited=[];
  let unvisited=size*size;
  let current=startingPoint

  for(let i=0; i<size*size; ++i)
  {
    visited.push(false);
    dist.push(size*size);
  }
  dist[startingPoint]=0;

  var fin=false
  while(unvisited)
  {




    setTimeout(function(){

    if(fin)
      return
    let current=findCurrent(dist,visited)
    if(current==target)
    {
      fin=true;
      return
    }
    let i=current%size;
    let j=Math.floor(current/size);
    //update distances to unvisited neigh
    updateDist(i-1,j,dist,visited,current);
    updateDist(i+1,j,dist,visited,current);
    updateDist(i,j-1,dist,visited,current);
    updateDist(i,j+1,dist,visited,current);
    visited[current]=true;

    },40*(size*size-unvisited))

    --unvisited;

  }

  setTimeout(()=>clearTable(),5000+20*size*size)
}

function updateDist(i,j,dist,visited,current)
{
  if(i<0 || j<0 || j>=size || i>=size || visited[i+j*size] || wall[i+j*size])
    return;

  if(dist[current]+1<dist[i+j*size])
  {
    dist[i+j*size]=dist[current]+1;
    document.getElementById(i+j*size).innerHTML=dist[i+j*size];
    document.getElementById(i+j*size).style.background='#15748E';
  }

}

function findCurrent(dist,visited){

 let minDist=size*size;
 let current
 for(let v=0; v<size*size; ++v)
  {
    if(visited[v] || wall[v])
      continue;

    if(dist[v]<minDist)
     {
        current=v;
        minDist=dist[v];
     }


  }

    return current
}
function clearTable()
{

  for(let i=0; i<size*size; ++i)
  {
    document.getElementById(i).innerHTML='?';
    document.getElementById(i).style.background='#0B3C49';
    wall[i]=false;
  }

  start=null
}