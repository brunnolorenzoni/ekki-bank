export default (state = {}, action) => {
    const { payload, type } = action;
    switch(type) {
        case 'SET_ACCOUNT': 
            return payload
        default: return state;
    }
}