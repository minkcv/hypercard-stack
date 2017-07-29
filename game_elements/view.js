
exports.View = class
{
    constructor(name, parentLocation)
    {
        this.name = name;
        this.parentLocation = null;
        this.links = [];
    }
    
    AddLink(link)
    {
        this.links.push(link);
    }
}