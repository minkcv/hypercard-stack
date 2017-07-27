const Location = require('./location.js')

exports.Map = class
{
    constructor(name)
    {
        this.name = name;
        this.locations = [];
        this.statemachines =[];
    }

    AddLocation(location)
    {
        this.locations.push(location);
    }
}