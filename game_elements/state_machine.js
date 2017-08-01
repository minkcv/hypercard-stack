
exports.StateMachine = class
{
    constructor(name, states, currentState, stateTransitions)
    {
        this.name = name;
        this.states = states;
        this.currentState = currentState;
        this.stateTransitions = stateTransitions;
    }
    
    doTransition(transition)
    {
        let transitionSet = this.stateTransitions.find(st => st.stateName === this.currentState);
        this.currentState = transitionSet.transitions.find(s => s[0] === transition)[1];
    }
}