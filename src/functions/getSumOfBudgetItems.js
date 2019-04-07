export default (items) => {
    return items.reduce((prev, cur) => {
        return prev + cur.value
    }, 0)
}