gameElements = require('./game_elements')
const path = require('path')
const url = require('url')

exports.Game = class
{
    constructor(map, window)
    {
        this.map = map;
        this.window = window;
    }

    reRender()
    {
        this.window.loadURL(url.format({
            pathname: path.join(__dirname, 'index.html'),
            protocol: 'file:',
            slashes: true
	    }));
    }
}