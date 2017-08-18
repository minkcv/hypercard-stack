
exports.Map = class
{
    constructor(name, folderName)
    {
        this.name = name;
        this.views = [];
        this.stateMachines = [];
        this.folderName = folderName;
    }

    AddView(view)
    {
        this.views.push(view);
    }
    
    GetView(name)
    {
        return this.views.find(v => v.name === name);
    }

    AddStateMachine(stateMachine)
    {
        this.stateMachines.push(stateMachine);
    }

    GetStateMachine(name)
    {
        return this.stateMachines.find(s => s.name === name);
    }
}