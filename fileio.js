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
        let link = new gameElements.Link(linkData['name'], parentView, linkData['transition'], linkData['position'], linkData['size']);
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