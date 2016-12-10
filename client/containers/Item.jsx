import { connect } from 'react-redux'
import { buyItem, goToEdit, deleteItem } from '../actions/index'
import ItemComponent from '../components/Item.jsx'

const mapDispatchToProps = (dispatch) => {
  return {
    clickDelete: (item) => {
      dispatch(deleteItem(item));
    },
    clickBuy: (item) => {
      dispatch(buyItem(item));
    },
    clickEdit: (item) => {
      dispatch(goToEdit(item))
    }
  }
}

const Item = connect(
  null,
  mapDispatchToProps
)(ItemComponent)

export default Item
