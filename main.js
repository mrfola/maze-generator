import Maze from './Maze.js';
import {LEVELS} from './setup.js';

let mazeDOM = document.querySelector('#canvas');
let gameLevelForm = document.querySelector('.game-level-form');
let gameLevelDOM = document.querySelector('.game-levels');

//set game options
LEVELS.forEach(function(level)
{
    let levelOption = document.createElement('option');
    levelOption.innerHTML =   `${level.name}`;
    gameLevelDOM.appendChild(levelOption);
});

//create maze based on game options
gameLevelForm.addEventListener('submit', e => {

    e.preventDefault();
    let gameLevel = document.querySelector('.game-levels').value;
    
    //create maze based on level chosen 
    let levelObject = LEVELS.filter(function(level){
        return level.name === gameLevel;
    });

    let newMaze = new Maze(levelObject[0]["width"], levelObject[0]["numOfRows"], levelObject[0]["numOfColumns"], mazeDOM);
    newMaze.setupMaze();
    newMaze.drawMaze(); 
    newMaze.activatePlayer();

}); 




