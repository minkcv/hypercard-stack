fs = require('fs')

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
    console.log(json);
}