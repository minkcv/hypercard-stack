fs = require('fs')
gameElements = require('./game_elements')

module.exports.openFile = function (filepaths)
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
    let loc = new gameElements.Location(json['locations'][0]['name'])
    map.AddLocation(loc)
    console.log('=== MAP ===');
    console.log(map);
}