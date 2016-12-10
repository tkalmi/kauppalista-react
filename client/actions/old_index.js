// this won't be called directly
// by the React components anymore, but from our async thunk function
export const addItemRequest = () => {
    return {
        type: 'ADD_ITEM_REQUEST',
        // name,
        // quantity
    }
}

export const addItemFailure = (errorMsg) => {
    return {
        errorMsg
    }
}

export const addItemSuccess = (items) => {
    return {
        type: 'ADD_ITEM_SUCCESS',
        items
    }
}

export const setItems = (items) => {
    return {
        type: 'SET_ITEMS',
        items
    }
}

export function addItem(name, quantity) {
    // we return a thunk function, not an action object!
    // the thunk function needs to dispatch some actions to change
    // the Store status, so it receives the "dispatch" function as its
    // first parameter

    return function(dispatch) {
        // here starts the code that actually gets executed when the
        //  addItem action creator is dispatched

        // first of all, let's do the optimistic UI update - we need to
        // dispatch the old synchronous action object, using the renamed
        // action creator
        dispatch(addItemRequest());

        // now that the Store has been notified of the new todo item, we
        // should also notify our server - we'll use here ES6 fetch
        // function to post the data
        fetch('/items', {
                method: 'post',
                body: JSON.stringify({
                    name,
                    quantity
                }),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then((response) => {
              if (response.status !== 200) {
                let error = new Error(response.statusText)
                error.response = response
                throw error
              }
              return response.json();
            })
            .then((response) => {
                // you should probably get a real id for your new item here,
                // and update your store, but we'll leave that to you
                console.log(response.message);
                if (response.error) {
                    return dispatch(addItemFailure(response.message));
                }
                dispatch(addItemSuccess(response.items));
            })
            .catch((err) => {
                // Error: handle it the way you like, undoing the optimistic update,
                //  showing a "out of sync" message, etc.
                console.log(err);
                dispatch(addItemFailure(`Something went wrong while trying to add item: ${name}`));
            });
        // what you return here gets returned by the dispatch function that
        // used this action creator
        return null;
    }
}
