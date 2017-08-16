

exports.Control = class
{
    constructor(name, parentView, position, stateMachine, actions, images)
    {
        this.name = name;
        this.parentView = parentView;
        this.position = position;
        this.stateMachine = stateMachine;
        this.actions = actions;
        this.images = images;
    }
}