const Location = require('./location')
const View = require('./view')

exports.Map = class
{
    constructor(name, aspectRatio = "4:3")
    {
        this.name = name;
        this.locations = [];
        this.stateMachines = [];
        this.aspectRatio = aspectRatio;
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

    GetPageHeight()
    {
        // 16:9 means the inverse of (16 divided by 9) times 100 == 56.25
        let widthHeight = this.aspectRatio.split(':');
        return Math.pow(widthHeight[0] / widthHeight[1], -1) * 100 + "vh";
    }

    GetPageWidth()
    {
        let widthHeight = this.aspectRatio.split(':');
        return (widthHeight[1] / widthHeight[0]) * 100 + "vh";
    }
}