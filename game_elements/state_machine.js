
exports.stateMachine = class
{
    constructor(name, states, currentState)
    {
        this.name = name;
        this.states = states;
        this.currentState = currentState;
        this.transitions = [];
    }
    
    doTransition(transition)
    {
        
    }
}