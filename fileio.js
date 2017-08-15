fs = require('fs')
gameElements = require('./game_elements')

exports.openFile = function (filepath)
{
    let json = loadJSONFile(filepath);
    return loadNewGame(json);
}

exports.loadGame = function (game, filepath)
{
    let json = loadJSONFile(filepath);
    loadSaveFile(game, json);
}

exports.saveGame = function (game, filepath)
{
    saveState = {}
    saveState['__gamename'] = game.map.name

    game.map.stateMachines.forEach(s => saveState[s.name] = s.currentState)
    let data = JSON.stringify(saveState)
    fs.writeFileSync(filepath, data)
}

function loadJSONFile(filepath)
{
    if (filepath && filepath.length > 0)
    {
        let data = fs.readFileSync(filepath, null)
        return JSON.parse(data)
    }
}

function loadSaveFile(game, json)
{
    if (json['__gamename'] != game.map.name)
        throw new Error('save file does not match loaded stack!')

    game.map.stateMachines.forEach(s => {
        let state = json[s.name];
        if (!state)
            throw new Error('save file does not match loaded stack!')

        s.currentState = state;
    })
}

function loadNewGame(json)
{
    let map = new gameElements.Map(json['mapName'], json['folderName']);
    for (let i = 0; i < json['locations'].length; i++)
    {
        let loc = new gameElements.Location(json['locations'][i]['name']);
        map.AddLocation(loc);
    }
    for (let i = 0; i < json['stateMachines'].length; i++)
    {
        let smData = json['stateMachines'][i];
        let sm = new gameElements.StateMachine(smData['name'], smData['states'], smData['currentState'], smData['stateTransitions']);
        map.AddStateMachine(sm);
    }
    for (let i = 0; i < json['views'].length; i++)
    {
        let viewData = json['views'][i];
        let parentLoc = map.GetLocation(viewData['parentLocation']);
        let view = new gameElements.View(viewData['name'], parentLoc, map.folderName + viewData['background']);
        parentLoc.AddView(view);
    }
    for (let i = 0; i < json['links'].length; i++)
    {
        let linkData = json['links'][i];
        let parentView = map.GetView(linkData['parentView']);
        let link = new gameElements.Link(linkData['name'], parentView, linkData['transition'], linkData['position']);
        parentView.AddLink(link);
    }
    console.log('=== MAP ===');
    console.log(map);
    console.log('=== VIEWS ===')
    map.locations.forEach(l => console.log(l.views));
    console.log('=== STATE MACHINES ===')
    console.log(map.stateMachines);
    return map;
}