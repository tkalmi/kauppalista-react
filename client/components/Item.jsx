import React, {PropTypes} from 'react';

const Item = ({item, clickBuy, clickDelete, clickEdit}) => {
    return (
        <tr key={item._id}>
            <td onClick={() => (clickBuy(item))} className={item.bought
                ? 'item--bought check-container'
                : 'check-container'}>
                <i className="fa fa-check" aria-hidden="true"></i>
            </td>
            <td>{item.name}</td>
            <td>{item.quantity}</td>
            <td>{item.unit}</td>
            <td>{item.additionalInfo}</td>
            <td style={{
                padding: '5px'
            }}>
                <button className="btn btn-info" onClick={() => {
                    clickEdit(item)
                }}>
                    <i className="fa fa-pencil" aria-hidden="true"></i>
                </button>
                <button className="btn btn-danger" style={{marginLeft: '2px'}} onClick={() => {
                    clickDelete(item)
                }}>
                    <i className="fa fa-trash" aria-hidden="true"></i>
                </button>
            </td>
        </tr>
    )
}

Item.propTypes = {
    clickDelete: PropTypes.func.isRequired,
    clickEdit: PropTypes.func.isRequired,
    clickBuy: PropTypes.func.isRequired,
    item: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        quantity: PropTypes.number.isRequired,
        unit: PropTypes.string.isRequired,
        additionalInfo: PropTypes.string.isRequired,
        bought: PropTypes.bool.isRequired
    }).isRequired
}

export default Item
