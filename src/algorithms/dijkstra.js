export default class Dijkstra {
    constructor(size) {

        this.size=size;
        this.wall=[];
        this.dist=[];
        this.visited=[];

        for(let i=0; i<this.size**2; ++i)
        {
            this.visited.push(false);
            this.wall.push(false);
            this.dist.push(size*size);
        }

    }

    setStart(start){

        document.getElementById(start).innerHTML=0;
        document.getElementById(start).style.background='#15748E';
        this.start=start;
    }

    run(target){

        document.getElementById(target).style.background='red';

        let current=this.start;
        this.dist[current]=0;


        this.itervalId=setInterval(function (){

            current=this.findNext();

            if(current===target || current===-1)
            {
                clearInterval(this.itervalId);
                return;
            }



            let i=current%this.size;
            let j=Math.floor(current/this.size);

            //update distances to unvisited neigh
            this.updateDist(i-1,j,current);
            this.updateDist(i+1,j,current);
            this.updateDist(i,j-1,current);
            this.updateDist(i,j+1,current);

            this.visited[current]=true;
            document.getElementById(i+j*this.size).style.background='#15748E';

            }.bind(this)
        ,40);


    }

    updateDist(i,j,current)
    {
        if(i<0 || j<0 || j>=this.size || i>=this.size || this.visited[i+j*this.size] || this.wall[i+j*this.size])
            return;

        if(this.dist[current]+1<this.dist[i+j*this.size])
        {
            this.dist[i+j*this.size]=this.dist[current]+1;
            document.getElementById(i+j*this.size).innerHTML=this.dist[i+j*this.size];
        }

    }

    findNext(){
        let minDist=this.size**2;
        let current=-1;

        for(let v=0; v<this.size**2; ++v)
        {
            if(this.visited[v] || this.wall[v])
                continue;

            if(this.dist[v]<minDist)
            {
                current=v;
                minDist=this.dist[v];
            }

        }

        return current;
    }

    cleanUp(){

        for(let i=0; i<this.size**2; ++i)
        {
            this.visited[i]=false;
            this.wall[i]=false;
            this.dist[i]=this.size**2;
        }

        this.start=null;

    }

}
