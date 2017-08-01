
exports.View = class
{
    constructor(name, parentLocation, background)
    {
        this.name = name;
        this.parentLocation = parentLocation;
        this.links = [];
        this.background = background;
    }
    
    AddLink(link)
    {
        this.links.push(link);
    }
}