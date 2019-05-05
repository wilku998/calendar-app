export const toggleCalendarModal = (modalIsOpen, selectedDay) => ({
    type: 'TOGGLE_CALENDAR_MODAL',
    modalIsOpen,
    selectedDay: selectedDay ? selectedDay : {}
})