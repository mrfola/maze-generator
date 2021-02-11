import Cell from './Cell.js';
import Object from './Object.js';

class Maze
{
    constructor(width, numOfRows, numOfColumns, mazeDom)
    {
        this.mazeWidth = width;
        this.mazeHeight = width; //since we want a square maze, width = height
        this.numOfRows = numOfRows;
        this.numOfColumns = numOfColumns;
        this.grid = [];
        this.stack = [];
        this.cellWidth = this.mazeWidth/numOfColumns;
        this.cellHeight = this.mazeHeight/numOfRows;
        this.mazeDOM = mazeDom;
        this.ctx = this.mazeDOM.getContext('2d');
        this.playerPositionX =  this.cellWidth/2;
        this.playerPositionY =  this.cellHeight/2;
        this.targetPositionX = (this.mazeWidth - (this.cellWidth/2));
        this.targetPositionY = (this.mazeHeight - (this.cellHeight/2));
        this.moveX = 0;
        this.moveY = 0;

    }

    setupMaze()
    {       
        //we want to create a 2 dimensional maze array
        //I want to start counting my rows from 0 i.e row 0 to row 4 and not row 1 to row 5 
        for(let r = 0; r < this.numOfRows; r++)
        {
            let row = [];

            for (let c = 0; c < this.numOfColumns; c++)
            {
                let cell = new Cell(r, c, this.grid, this.mazeWidth, this.ctx);
                row.push(cell);
            }

            this.grid.push(row);
        }
        
        this.currentCell = this.grid[0][0];

        //call player
        this.player = new Object("Player", this.cellWidth, this.cellHeight, this.ctx, "green", 
        this.playerPositionX, this.playerPositionY, this.grid,
         this.numOfRows, this.numOfColumns, this.mazeWidth, this.mazeHeight); 

        //call target
        this.target = new Object("Target", this.cellWidth, this.cellHeight, this.ctx, "red", 
        this.targetPositionX, this.targetPositionY, this.grid, 
        this.numOfRows, this.numOfColumns, this.mazeWidth, this.mazeHeight); 

        document.addEventListener('keydown', (e) => this.player.keyDown(e));
        document.addEventListener('keyup', (e) => this.player.keyUp(e));
    }

    drawMaze()
    {       
        this.mazeDOM.width = this.mazeWidth;
        this.mazeDOM.height = this.mazeHeight;
        this.mazeDOM.style.background = "black";
        this.currentCell.visited = true;
    
        for(let r = 0; r < this.numOfRows; r++)
        {
            for (let c = 0; c < this.numOfColumns; c++)
            {
               this.grid[r][c].showCell(this.numOfRows, this.numOfColumns, this.cellWidth, this.cellHeight);
            }
            
        }
    
        let nextCell = this.currentCell.getRandomUnvisitedNeighbour();
        //if there is an unvisited neighbour
        if(nextCell)
        {
            nextCell.visited = true;
            this.stack.push(this.currentCell);
            this.currentCell.highlightCell(this.numOfRows, this.numOfColumns, this.cellWidth, this.cellHeight);
            this.currentCell.removeWalls(this.currentCell, nextCell);
            this.currentCell = nextCell
       
        //recursive backtracker
        }else if(this.stack.length > 0)
        {
            
            let lastCell = this.stack.pop();
            this.currentCell = lastCell;
            this.currentCell.highlightCell(this.numOfRows, this.numOfColumns);
        }
    
        if(this.stack.length == 0)
        {
            return;
        }

    }

    detectWin(player, target)
    {
        if ((player.positionX === target.positionX) && (player.positionY === target.positionY))
        {
            alert("You have won!");
        }
    }

    activatePlayer()
    {
        this.drawMaze();
        
        this.player.clear();
        this.target.clear();

        this.player.makeObject();
        this.target.makeObject();

        this.player.moveObject();

        this.player.detectWalls();

        this.detectWin(this.player, this.target);

        window.requestAnimationFrame(() => 
        {
            this.activatePlayer();//recursion
        });
    
    }
    

}

export default Maze;