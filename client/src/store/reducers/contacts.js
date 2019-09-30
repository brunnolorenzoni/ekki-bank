export default (state = [], action) => {
    const { payload, type } = action;
    switch(type) {
        case 'SET_CONTACTS': 
            return payload
        default: return state;
    }
}