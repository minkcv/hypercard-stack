const sizeOf = require('image-size');

exports.View = class
{
    constructor(name, background)
    {
        this.name = name;
        this.links = [];
        this.indicators = [];
        this.background = background;
        this.imageSize = sizeOf(background);
    }
    
    AddLink(link)
    {
        this.links.push(link);
    }

    AddIndicator(indicator)
    {
        this.indicators.push(indicator);
    }
}