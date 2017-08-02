gameElements = require('./game_elements')

exports.Game = class
{
    constructor(map)
    {
        this.map = map;
    }

    testMethod()
    {
        console.log('game test method');
    }
}