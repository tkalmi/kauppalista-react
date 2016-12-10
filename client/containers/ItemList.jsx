import {connect} from 'react-redux'
import {archiveItems} from '../actions/index'
import ItemListComponent from '../components/ItemList.jsx'

const mapStateToProps = (state) => {
    return {
        items: state.items
            ? state.items.filter(item => !item.deleted && !item.archived)
            : []
    }
}

const mapDispatchToProps = (dispatch) => ({
  dispatch
})

const mergeProps = (stateProps, dispatchProps, ownProps) => {
    return {
        items: stateProps.items,
        clickArchive: () => {
            let boughtItems = stateProps.items.filter(item => item.bought);
            dispatchProps.dispatch(archiveItems(boughtItems))
        }
    }
}

const ItemList = connect(mapStateToProps, mapDispatchToProps, mergeProps)(ItemListComponent)

export default ItemList
