

exports.Link = class
{
    constructor(name, parentView, transition)
    {
        this.name = name;
        this.parentView = parentView;
        this.transition = transition;
        this.media = null;
    }
}