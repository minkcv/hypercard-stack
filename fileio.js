fs = require('fs')
gameElements = require('./game_elements')

exports.openFile = function (filepath)
{
    if (filepath && filepath.length > 0)
    {
        let data = fs.readFileSync(filepath, null)
        return loadNewGame(JSON.parse(data));
    }
}

function loadNewGame(json)
{
    let map = new gameElements.Map(json['mapName']);
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
        let view = new gameElements.View(viewData['name'], parentLoc);
        parentLoc.AddView(view);
    }
    for (let i = 0; i < json['links'].length; i++)
    {
        let linkData = json['links'][i];
        let parentView = map.GetView(linkData['parentView']);
        let link = new gameElements.Link(linkData['name'], parentView, linkData['transition']);
        parentView.AddLink(link);
    }
    console.log('=== MAP ===');
    console.log(map);
    console.log('=== STATE MACHINES ===')
    console.log(map.stateMachines);
    let playerView = map.stateMachines.find(s => s.name === "player view");
    console.log("current view: " + playerView.currentState);
    playerView.doTransition("change view 1");
    console.log("current view: " + playerView.currentState);
    return map;
}