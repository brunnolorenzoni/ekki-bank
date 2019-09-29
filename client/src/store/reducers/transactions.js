export default (state = [], action) => {
    const { payload, type } = action;
    switch(type) {
        case 'SET_TRANSACTIONS': 
            return payload
        default: return state;
    }
}