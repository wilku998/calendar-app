export default (state={}, action) => {
    const { type } = action;

    switch(type){
        case 'LOGIN':
            return {
                uid: action.uid
            }
        case 'LOGOUT':
            return {}
        default:
            return state
    }
}