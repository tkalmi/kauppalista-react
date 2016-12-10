const item = (state = {}, action) => {
  switch (action.type) {
    // Show spinner when item addition is pending
    case 'ADD_ITEM_REQUEST':
      return Object.assign({}, state, {
        showSpinner: true
      })
    // Show error message is adding item failed
    case 'ADD_ITEM_FAILURE':
      return Object.assign({}, state, {
        showSpinner: false,
        showError: true,
        errorMsg: action.errorMsg
      })
    // Hide spinner and add item to item list if adding it to the DB was successful
    case 'ADD_ITEM_SUCCESS':
      return Object.assign({}, state, {
        showSpinner: false,
        items: action.items
      })
    // Set items to state
    case 'SET_ITEMS':
      return Object.assign({}, state, {
        items: action.items
      })
    // User clicked X on error message
    case 'DISMISS_ERROR':
      return Object.assign({}, state, {
        showError: false
      })
    default:
      return state;
  }
}

// TODO: THIS CAN BE IMPROVED BY DIVIDING FUNCTIONALITY FOR ONE ITEM AND ALL ITEMS... CHECKOUT redux.js.org/docs/basics/ExampleTodoList.html

export default item;
