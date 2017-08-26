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
    for (let i = 0; i < json['stateMachines'].length; i++)
    {
        let smData = json['stateMachines'][i];
        let sm = new gameElements.StateMachine(smData['name'], smData['states'], smData['currentState'], smData['stateTransitions']);
        map.AddStateMachine(sm);
    }
    for (let i = 0; i < json['views'].length; i++)
    {
        let viewData = json['views'][i];
        let view = new gameElements.View(viewData['name'], map.folderName + viewData['background']);
        map.AddView(view);
    }
    for (let i = 0; i < json['links'].length; i++)
    {
        let linkData = json['links'][i];
        let parentView = map.GetView(linkData['parentView']);
        let sm = map.GetStateMachine(linkData['stateMachine']);
        let link = new gameElements.Link(linkData['name'], parentView, sm, linkData['actions'], linkData['position']);
        parentView.AddLink(link);
    }
    for (let i = 0; i < json['indicators'].length; i++)
    {
        let iData = json['indicators'][i];
        let parentView = map.GetView(iData['parentView']);
        let sm = map.GetStateMachine(iData['stateMachine']);
        let indicator = new gameElements.Indicator(iData['name'], parentView, sm, iData['images']);
        parentView.AddIndicator(indicator);
    }
    console.log('=== MAP ===');
    console.log(map);
    console.log('=== VIEWS ===')
    map.views.forEach(v => console.log(v));
    console.log('=== STATE MACHINES ===')
    console.log(map.stateMachines);
    return map;
}
