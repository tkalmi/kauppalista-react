export const addItem = (item) => {
    return {
        type: 'ADD_ITEM',
        item,
    }
}

export const updateItem = (item) => {
    return {
        type: 'UPDATE_ITEM',
        item,
    }
}

export const buyItem = (item) => {
    return {
        type: 'UPDATE_ITEM',
        item: Object.assign({}, item, {
            bought: !item.bought
        }),
        meta: {
            socket: true
        }
    }
}

export const deleteItem = (item) => {
    return {
        type: 'UPDATE_ITEM',
        item: Object.assign({}, item, {
            deleted: true
        }),
        meta: {
            socket: true
        }
    }
}

export const editItem = (item) => {
    return {
        type: 'UPDATE_ITEM',
        item,
        meta: {
            socket: true
        }
    }
}

export const sendItemToServer = (name, quantity, unit, additionalInfo) => {
    return {
        type: 'SEND_ITEM_TO_SERVER',
        name,
        quantity,
        unit,
        additionalInfo,
        meta: {
            socket: true
        }
    }
}

export const hideSpinner = () => {
    return {
        type: 'HIDE_SPINNER'
    }
}

export const setList = (list) => {
    return {
        type: 'SET_LIST',
        items: list.items,
        listID: list._id,
        showSpinner: false,
        isList: true
    }
}

export const requestServerToCreateList = () => {
    return {
        type: 'REQUEST_SERVER_TO_CREATE_LIST',
        showSpinner: true,
        meta: {
            socket: true
        }
    }
}

export const getListFromServer = (listID) => {
    return {
        type: 'GET_LIST_FROM_SERVER',
        listID,
        showSpinner: true,
        meta: {
            socket: true
        }
    }
}

export const showError = (errorMsg) => {
    return {
        type: 'SHOW_ERROR',
        errorMsg
    }
}

export const dismissError = () => {
    return {
        type: 'DISMISS_ERROR'
    }
}

export const dontShowFrontPage = () => {
    return {
        type: 'DONT_SHOW_FRONT_PAGE'
    }
}

export const goToEdit = (item) => {
    return {
        type: 'GO_TO_EDIT',
        item
    }
}

export const goBackToList = () => {
    return {
        type: 'GO_BACK_TO_LIST'
    }
}

export const dismissInstructions = () => {
    return {
        type: 'DISMISS_INSTRUCTIONS'
    }
}

export const showInstructions = () => {
    return {
        type: 'SHOW_INSTRUCTIONS'
    }
}

export const showConnectionProblems = () => {
  return {
    type: 'SHOW_CONNECTION_PROBLEMS'
  }
}

export const dismissConnectionProblems = () => {
  return {
    type: 'DISMISS_CONNECTION_PROBLEMS'
  }
}

export const archiveItems = (items) => {
    return {
        type: 'ARCHIVE_ITEMS',
        items,
        meta: {
            socket: true
        }
    }
}
