const Location = require('./location')
const View = require('./view')

exports.Map = class
{
    constructor(name, folderName)
    {
        this.name = name;
        this.locations = [];
        this.stateMachines = [];
        this.controls = [];
        this.folderName = folderName;
    }

    AddLocation(location)
    {
        this.locations.push(location);
    }

    GetLocation(name)
    {
        return this.locations.find(l => l.name === name);
    }
    
    GetView(name)
    {
        for (let i = 0; i < this.locations.length; i++)
        {
            let view = this.locations[i].GetView(name);
            if (view)
                return view;
        }
    }

    AddStateMachine(stateMachine)
    {
        this.stateMachines.push(stateMachine);
    }

    GetStateMachine(name)
    {
        return this.stateMachines.find(s => s.name === name);
    }

    AddControl(control)
    {
        this.controls.push(control);
    }
}