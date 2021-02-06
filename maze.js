let maze = document.querySelector('#canvas');
let ctx = maze.getContext('2d');
let currentCell;

class Maze
{
    constructor(width, numOfRows, numOfColumns)
    {
        this.width = width;
        this.height = width; //since we want a square maze, width = height
        this.numOfRows = numOfRows;
        this.numOfColumns = numOfColumns;
        this.grid = [];
        this.stack = [];
        this.cellWidth = this.width/numOfColumns;
        this.cellHeight = this.height/numOfRows;
    }

    setupMaze()
    {
        //we want to create a 2 dimensional maze array
        //I want to start counting my rows from 1 i.e row 1 to row 5 and not row 0 to row 4
        for(let r = 0; r < this.numOfRows; r++)
        {
            let row = [];

            for (let c = 0; c < this.numOfColumns; c++)
            {
                let cell = new Cell(r, c, this.grid, this.width);
                row.push(cell);
            }

            this.grid.push(row);
        }
        currentCell = this.grid[0][0];
    }

    drawMaze()
    {
        maze.width = this.width;
        maze.height = this.height;
        maze.style.background = "black";
        currentCell.visited = true;
    
        for(let r = 0; r < this.numOfRows; r++)
        {
            for (let c = 0; c < this.numOfColumns; c++)
            {
               this.grid[r][c].showCell(this.numOfRows, this.numOfColumns, this.cellWidth, this.cellHeight);
            }
            
        }
    
        let nextCell = currentCell.getRandomUnvisitedNeighbour();
        //if there is an unvisited neighbour
        if(nextCell)
        {
            nextCell.visited = true;
            this.stack.push(currentCell);
            currentCell.highlightCell(this.numOfRows, this.numOfColumns, this.cellWidth, this.cellHeight);
            currentCell.removeWalls(currentCell, nextCell);
            currentCell = nextCell
       
        //recursive backtracker
        }else if(this.stack.length > 0)
        {
            
            let lastCell = this.stack.pop();
            currentCell = lastCell;
            currentCell.highlightCell(this.numOfRows, this.numOfColumns);
        }
    
        if(this.stack.length == 0)
        {
            return;
        }
    
        window.requestAnimationFrame(() => 
        {
            this.drawMaze();//recursion
        });
    }
}

class Cell
{
    constructor(rowNum, colNum, parentGrid, mazeWidth)
    {
        this.rowNum = rowNum;
        this.colNum = colNum;
        this.parentGrid = parentGrid;
        this.mazeWidth = mazeWidth;
        this.mazeHeight = mazeWidth;
        this.visited = false;
        this.walls = {
            topWall : true,
            rightWall : true,
            bottomWall : true,
            leftWall : true
        }
    }

    getRandomUnvisitedNeighbour()
    {
        
        let grid = this.parentGrid;
        let rowNum = this.rowNum;
        let colNum = this.colNum;
        let neighbours = [];

        let topNeighbour = rowNum !== 0 ? grid[rowNum -1][colNum] : undefined;
        let rightNeighbour = colNum !== (grid.length - 1) ? grid[rowNum][colNum + 1] : undefined;
        let bottomNeighbour = rowNum !== (grid.length - 1) ? grid[rowNum + 1][colNum] : undefined;
        let leftNeighbour = colNum !== 0 ? grid[rowNum][colNum -1] : undefined;

        if(topNeighbour && !topNeighbour.visited) neighbours.push(topNeighbour);
        if(rightNeighbour && !rightNeighbour.visited) neighbours.push(rightNeighbour);
        if(bottomNeighbour && !bottomNeighbour.visited) neighbours.push(bottomNeighbour);
        if(leftNeighbour && !leftNeighbour.visited) neighbours.push(leftNeighbour);

        //if there are unvisted neighbours
        if(neighbours.length !== 0)
        { 
            let random = Math.floor(Math.random() * neighbours.length);
            console.log(neighbours[random]);
            return neighbours[random];
            
        }else
        {
            return;
        }

    }

    //the "x" and "y", parameters represent the coordinate of the cell i.e the top left corner of each cell.
    //The x and y values at that point, is what is passed into the functions
    drawTopWall(x, y, cellWidth)
    {
        ctx.beginPath();
        ctx.moveTo(x,y);
        ctx.lineTo(x + cellWidth, y);
        ctx.stroke();
    }

    //the "x" and "y", parameters represent the coordinate of the cell i.e the top left corner of each cell.
    //The x and y values at that point, is what is passed into the functions
    drawRightWall(x, y, cellWidth, cellHeight)
    {
        ctx.beginPath();
        ctx.moveTo(x + cellWidth,y);
        ctx.lineTo(x + cellWidth, y + cellHeight);
        ctx.stroke();
    }

    //the "x" and "y", parameters represent the coordinate of the cell i.e the top left corner of each cell.
    //The x and y values at that point, is what is passed into the functions
    drawBottomWall(x, y, cellWidth, cellHeight)
    {
        ctx.beginPath();
        ctx.moveTo(x, y + cellHeight);
        ctx.lineTo(x + cellWidth, y + cellHeight);
        ctx.stroke();
    }

    //the "x" and "y", parameters represent the coordinate of the cell i.e the top left corner of each cell.
    //The x and y values at that point, is what is passed into the functions
    drawLeftWall(x, y, cellHeight)
    {
        ctx.beginPath();
        ctx.moveTo(x,y);
        ctx.lineTo(x, y + cellHeight);
        ctx.stroke();
    }

    highlightCell(numOfRows, numOfColumns, cellWidth, cellHeight)
    {
        let xCoord = (this.colNum / numOfColumns) * this.mazeWidth;
        let yCoord = (this.rowNum / numOfRows) * this.mazeHeight;

        ctx.fillStyle = 'purple';
        ctx.fillRect(xCoord, yCoord, cellWidth - 3 , cellHeight - 3);
    }

    removeWalls(cell1, cell2)
    {
        let x = cell1.colNum - cell2.colNum;

        if(x == -1)
        {
            cell1.walls.rightWall = false;
            cell2.walls.leftWall = false;
        }else if (x == 1)
        {
            cell1.walls.leftWall = false;
            cell2.walls.rightWall = false;
        }

        let y = cell1.rowNum - cell2.rowNum;

        if(y == 1)
        {
            cell1.walls.topWall = false;
            cell2.walls.bottomWall = false;
        }else if (y == -1)
        {
            cell1.walls.bottomWall = false;
            cell2.walls.topWall = false;
        }
    } 

    /*removeWalls(cell1, cell2)
    {
        let x = cell1.colNum - cell2.colNum;

        if(x == 1)
        {
            cell1.walls.leftWall = false;
            cell2.walls.rightWall = false;
        }else if (x == -1)
        {
            cell1.walls.rightWall = false;
            cell2.walls.leftWall = false;
        }

        let y = cell1.rowNum - cell2.rowNum;

        if(y == 1)
        {
            cell1.walls.topWall = false;
            cell2.walls.bottomWall = false;
        }else if (y == -1)
        {
            cell1.walls.bottomWall = false;
            cell2.walls.topWall = false;
        }
    } */

    showCell(numOfRows, numOfColumns, cellWidth, cellHeight)
    {
        let xCoord = (this.colNum / numOfColumns) * this.mazeWidth;
        let yCoord = (this.rowNum / numOfRows) * this.mazeHeight;

        ctx.strokeStyle = "white";
        ctx.fillStyle = "black";
        ctx.lineWidth = 2;

        if(this.walls.topWall)
        {
            this.drawTopWall(xCoord, yCoord, cellWidth);
        }

        if(this.walls.rightWall)
        {
            this.drawRightWall(xCoord, yCoord, cellWidth, cellHeight);
        }

        if(this.walls.bottomWall)
        {
            this.drawBottomWall(xCoord, yCoord, cellWidth, cellHeight);
        }

        if(this.walls.leftWall)
        {
            this.drawLeftWall(xCoord, yCoord, cellHeight);
        }

        if(this.visited)
        {
            ctx.fillRect(xCoord + 1, yCoord + 1, cellWidth - 2, cellHeight - 2);
        }
    }
}


let newMaze = new Maze(500, 10, 10);
newMaze.setupMaze();
newMaze.drawMaze();
