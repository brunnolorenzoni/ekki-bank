export default (state = {}, action) => {
    const { payload, type } = action;
    switch(type) {
        case 'SET_USER': 
            return payload
        default: return state;
    }
}