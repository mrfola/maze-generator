
class Object{
    constructor(name, cellWidth, cellHeight, ctx, color, positionX, positionY, grid, numOfRows, numOfColumns, mazeWidth, mazeHeight)
    {
        this.cellWidth = cellWidth;
        this.cellHeight = cellHeight;
        this.playerRadius = (cellWidth / 2)-4;
        this.ctx = ctx;
        this.moveX = 0;
        this.moveY = 0;
        this.name = name;
        this.color = color;
        this.positionX = positionX;
        this.positionY = positionY;
        this.grid = grid;
        this.objectSpeed = this.playerRadius;
        this.numOfRows = numOfRows;
        this.numOfColumns = numOfColumns;
        this.mazeWidth = mazeWidth;
        this.mazeHeight = mazeHeight;
    }
    
    setObjectPosition(positionX, positionY)
    {
        this.positionX = positionX;
        this.positionY = positionY;
    }

    makeObject()
    {
        this.ctx.beginPath();
        this.ctx.arc(this.positionX, this.positionY, this.playerRadius, 0, Math.PI*2);//circle player
        this.ctx.fillStyle = this.color;
        this.ctx.fill();

    }

    clear()
    {
        this.ctx.clearRect(this.positionX, this.positionY, this.playerRadius +1, this.playerRadius +1);
        //this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

    }

    moveObject()
    {
        this.positionX += this.moveX;
        this.positionY += this.moveY;
    }
    

    moveRight()
    {
        this.moveX = this.objectSpeed;
    }

    moveLeft()
    {
        this.moveX = -this.objectSpeed;
    }

    moveUp()
    {
        this.moveY = -this.objectSpeed;
    }

    moveDown()
    {
        this.moveY = this.objectSpeed;
    }

    keyDown(e)
    {
        if(e.key === 'ArrowRight' || e.key === 'Right')
        {
            this.moveRight();
        }else if(e.key === 'ArrowLeft' || e.key === 'Left')
        {
            this.moveLeft();
            
        }else if(e.key === 'ArrowUp' || e.key === 'Up')
        {
            this.moveUp();
            
        }else if(e.key === 'ArrowDown' || e.key === 'Down')
        {
            this.moveDown();     

        }
    }

    keyUp(e)
    {
        if(e.key === 'ArrowRight' ||
         e.key === 'Right' ||
         e.key === 'ArrowLeft' ||
         e.key === 'Left' ||
         e.key === 'ArrowUp' || 
         e.key === 'Up' ||
         e.key === 'ArrowDown' ||
         e.key === 'Down')
        {
            this.moveX = 0;  
            this.moveY = 0;  
        }
    }

    detectWalls()
    {
        //detect right wall
        if(this.positionX + this.playerRadius + 4 > this.ctx.canvas.width)
        {
            this.positionX = this.ctx.canvas.width - this.playerRadius - 4;
        }

        //Detect left wall
        if(this.positionX < (this.playerRadius + 4))
        {
            this.positionX = this.playerRadius + 4;
        }

        //detect top walls
        if(this.positionY < (this.playerRadius + 4))
        {
            this.positionY = this.playerRadius + 4;
        }

        //detect bottom walls
        if(this.positionY + this.playerRadius + 4 > this.ctx.canvas.height)
        {
            this.positionY = this.ctx.canvas.height - this.playerRadius - 4;
        }

        //detect inner maze walls 
        //get object position 
        this.positionX
        this.positionY 

        //get cell number 
        let cellColNum = Math.floor((this.positionX * this.numOfColumns)/this.mazeWidth);
        let cellRowNum = Math.floor((this.positionY * this.numOfRows)/this.mazeHeight);

        let cellRightXCoord = ((cellColNum/this.numOfColumns)*this.mazeWidth) + this.cellWidth;
        let cellLeftXCoord = (cellColNum/this.numOfColumns)*this.mazeWidth;
        let cellTopYCoord = ((cellRowNum/this.numOfRows)*this.mazeHeight);
        let cellBottomYCoord = ((cellRowNum/this.numOfRows)*this.mazeHeight) + this.cellHeight;

        //check right cell wall 
        if((this.grid[cellRowNum][cellColNum].walls.rightWall === true) && 
            (this.positionX + this.playerRadius + 4 > cellRightXCoord))
        {
            this.positionX = cellRightXCoord - this.playerRadius - 4;
        }

        //check left cell wall 
        if((this.grid[cellRowNum][cellColNum].walls.leftWall === true) && 
        (this.positionX - this.playerRadius - 4 < cellLeftXCoord))
        {
            this.positionX = cellLeftXCoord + this.playerRadius + 4;
        }

        //check top cell wall 
        if((this.grid[cellRowNum][cellColNum].walls.topWall === true) &&
        (this.positionY - this.playerRadius - 4 < cellTopYCoord))
        {
            this.positionY = cellTopYCoord + this.playerRadius + 4;
        }

        //check bottom cell wall
        if((this.grid[cellRowNum][cellColNum].walls.bottomWall === true) &&
        (this.positionY + this.playerRadius + 4 > cellBottomYCoord))
        {
            this.positionY = cellBottomYCoord - this.playerRadius - 4;
        }

    }
}

export default Object;