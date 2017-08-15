

exports.Link = class
{
    constructor(name, parentView, transition, position)
    {
        this.name = name;
        this.parentView = parentView;
        this.transition = transition;
        this.media = null;
        this.position = position;
    }
}