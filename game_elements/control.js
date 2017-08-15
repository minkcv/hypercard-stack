

exports.Control = class
{
    constructor(name, parentView, position, stateMachine, images)
    {
        this.name = name;
        this.parentView = parentView;
        this.position = position;
        this.stateMachine = stateMachine;
        this.images = images;
    }
}