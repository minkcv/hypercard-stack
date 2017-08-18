

exports.Link = class
{
    constructor(name, parentView, stateMachine, actions, position)
    {
        this.name = name;
        this.parentView = parentView;
        this.stateMachine = stateMachine
        this.actions = actions;
        this.position = position;
    }
}