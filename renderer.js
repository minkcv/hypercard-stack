// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const electron = require('electron');
let game = electron.remote.getGlobal('game');
if (game)
{
    let currentViewName = game.map.GetStateMachine('player view').currentState;
    let view = game.map.GetView(currentViewName);
    document.body.style.margin = 0;
    let container = document.getElementById('crop-container');
    container.style.height = '100vh';
    container.style.width = '100vw';
    let bg = document.createElement('img');
    bg.src = view.background;
    bg.style.backgroundSize = 'contain';
    container.appendChild(bg);
}