class Cell
{
    constructor(rowNum, colNum, parentGrid, mazeWidth, ctx)
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
        this.ctx = ctx;
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
        this.ctx.beginPath();
        this.ctx.moveTo(x,y);
        this.ctx.lineTo(x + cellWidth, y);
        this.ctx.stroke();
    }

    //the "x" and "y", parameters represent the coordinate of the cell i.e the top left corner of each cell.
    //The x and y values at that point, is what is passed into the functions
    drawRightWall(x, y, cellWidth, cellHeight)
    {
        this.ctx.beginPath();
        this.ctx.moveTo(x + cellWidth,y);
        this.ctx.lineTo(x + cellWidth, y + cellHeight);
        this.ctx.stroke();
    }

    //the "x" and "y", parameters represent the coordinate of the cell i.e the top left corner of each cell.
    //The x and y values at that point, is what is passed into the functions
    drawBottomWall(x, y, cellWidth, cellHeight)
    {
        this.ctx.beginPath();
        this.ctx.moveTo(x, y + cellHeight);
        this.ctx.lineTo(x + cellWidth, y + cellHeight);
        this.ctx.stroke();
    }

    //the "x" and "y", parameters represent the coordinate of the cell i.e the top left corner of each cell.
    //The x and y values at that point, is what is passed into the functions
    drawLeftWall(x, y, cellHeight)
    {
        this.ctx.beginPath();
        this.ctx.moveTo(x,y);
        this.ctx.lineTo(x, y + cellHeight);
        this.ctx.stroke();
    }

    highlightCell(numOfRows, numOfColumns, cellWidth, cellHeight)
    {
        let xCoord = (this.colNum / numOfColumns) * this.mazeWidth;
        let yCoord = (this.rowNum / numOfRows) * this.mazeHeight;

        this.ctx.fillStyle = 'purple';
        this.ctx.fillRect(xCoord, yCoord, cellWidth - 3 , cellHeight - 3);
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

    showCell(numOfRows, numOfColumns, cellWidth, cellHeight)
    {
        let xCoord = (this.colNum / numOfColumns) * this.mazeWidth;
        let yCoord = (this.rowNum / numOfRows) * this.mazeHeight;

        this.ctx.strokeStyle = "white";
        this.ctx.fillStyle = "black";
        this.ctx.lineWidth = 2;

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
            this.ctx.fillRect(xCoord + 1, yCoord + 1, cellWidth - 2, cellHeight - 2);
        }
    }
}

export default Cell;