
exports.Indicator = class
{
    constructor(name, parentView, stateMachine, images, position)
    {
        this.name = name;
        this.parentView = parentView;
        this.stateMachine = stateMachine;
        this.images = images;
        this.position = position;
    }
}