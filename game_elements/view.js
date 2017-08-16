const sizeOf = require('image-size');

exports.View = class
{
    constructor(name, parentLocation, background)
    {
        this.name = name;
        this.parentLocation = parentLocation;
        this.links = [];
        this.controls = [];
        this.background = background;
        this.imageSize = sizeOf(background);
    }
    
    AddLink(link)
    {
        this.links.push(link);
    }

    AddControl(control)
    {
        this.controls.push(control);
    }
}