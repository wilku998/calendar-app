export const toggleModal = (modalIsOpen, selectedDay) => ({
    type: 'TOGGLE_MODAL',
    modalIsOpen,
    selectedDay: selectedDay ? selectedDay : {}
})