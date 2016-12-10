const item = (state = {}, action) => {
    switch (action.type) {
        case 'ADD_ITEM':
            // Hide spinner and add item to item list if adding it to the DB was successful
            return Object.assign({}, state, {
                showSpinner: false,
                items: [...state.items, action.item]
            })
        case 'SEND_ITEM_TO_SERVER':
            // Show spinner while item is being added to the server
            return Object.assign({}, state, {
                showSpinner: true
            })
        case 'UPDATE_ITEM':
            return Object.assign({}, state, {
                items: state.items.map(item => (item._id === action.item._id ? action.item : item))
            })
        case 'SET_LIST':
            // Set items to state
            return Object.assign({}, state, {
                items: action.items,
                listID: action.listID
            })
        case 'SHOW_SPINNER':
            // Show spinner animation
            return Object.assign({}, state, {
                showSpinner: true
            })
        case 'HIDE_SPINNER':
            // Hide spinner animation
            return Object.assign({}, state, {
                showSpinner: false
            })
        case 'SHOW_ERROR':
            // Show error message to the user
            return Object.assign({}, state, {
                showError: true,
                errorMsg: action.errorMsg
            })
        case 'DISMISS_ERROR':
            // User clicked X on error message
            return Object.assign({}, state, {
                showError: false
            })
        case 'DISMISS_INSTRUCTIONS':
            // User clicked X on instructions panel
            return Object.assign({}, state, {
                showInstructions: false
            })
        case 'SHOW_INSTRUCTIONS':
            // Show Instructions panel
            return Object.assign({}, state, {
                showInstructions: true
            })
        case 'DONT_SHOW_FRONT_PAGE':
            // Client URL is already set on some list, so don't show front page -- server redirects user to front page if necessary
            return Object.assign({}, state, {
                isList: true
            })
        case 'SHOW_CONNECTION_PROBLEMS':
            // Show error message for connection problems
            return Object.assign({}, state, {
                connectionProblems: true
            })
        case 'DISMISS_CONNECTION_PROBLEMS':
            // Dismiss error message for connection problems
            return Object.assign({}, state, {
                connectionProblems: false
            })
        case 'GO_TO_EDIT':
            // Edit an item
            return Object.assign({}, state, {
                isEditing: true,
                editableItem: action.item
            })
        case 'ARCHIVE_ITEMS':
          // Archive all bought items
          return Object.assign({}, state, {
            showSpinner: true
          })
        case 'GO_BACK_TO_LIST':
            // Hide edit form
            return Object.assign({}, state, {
                isEditing: false
            })
        default:
            return state;
    }
}

export default item;
