const Location = require('./location')
const View = require('./view')

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

    GetLocation(name)
    {
        return this.locations.find(l => l.name === name);
    }
}