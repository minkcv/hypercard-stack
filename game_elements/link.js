

exports.Link = class
{
    constructor(name, parentView)
    {
        this.name = name;
        this.parentView = parentView;
        this.destView = null;
        this.media = null;
    }
}