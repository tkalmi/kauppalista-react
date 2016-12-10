export default socket => store => next => action => {
    // Send action to server only if it's labeled with meta.socket: true
    if (action.meta && action.meta.socket) {
        socket.emit('action', action);
    }
    return next(action);
}
