const initialState={
    modalIsOpen: false,
    selectedDay: {}
}

export default (state={...initialState}, action) => {
    const { type } = action;
    
    switch(type){
        case 'TOGGLE_MODAL':
            const { modalIsOpen, selectedDay } = action;
            return {
                modalIsOpen,
                selectedDay
            }
        default:
            return state
    }
}