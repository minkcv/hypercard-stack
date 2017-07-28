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
        let view = new gameElements.View(json['views'][i]['name']);
        let locname = "";
        for (let j = 0; j < json['locations'].length; j++)
        {
            let views = json['locations'][j].views;
            if (views.find(v => v === view.name))
                locname = json['locations'][j].name;
        }
        map.GetLocation(locname).AddView(view);
    }
    console.log('=== MAP ===');
    console.log(map);
}