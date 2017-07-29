fs = require('fs')
gameElements = require('./game_elements')

exports.openFile = function (filepaths)
{
    if (filepaths && filepaths[0].length > 0)
    {
        fs.readFile(filepaths[0], null, (err, data) =>
        {
            if (err) { return console.log(err) };
            loadNewGame(JSON.parse(data));
        });
    }
}

function loadNewGame(json)
{
    let map = new gameElements.Map(json['map name']);
    for (let i = 0; i < json['locations'].length; i++)
    {
        let loc = new gameElements.Location(json['locations'][i]['name']);
        map.AddLocation(loc);
    }
    for (let i = 0; i < json['views'].length; i++)
    {
        let viewData = json['views'][i];
        let parentLoc = map.GetLocation(viewData['parentLocation']);
        let view = new gameElements.View(viewData['name'], parentLoc);
        parentLoc.AddView(view);
    }
    for (let i = 0; i < json['links'].length; i++)
    {
        let linkData = json['links'][i];
        let parentView = map.GetView(linkData['parentView']);
        let link = new gameElements.Link(linkData['name'], parentView);
        parentView.AddLink(link);
    }
    console.log('=== MAP ===');
    console.log(map);
}