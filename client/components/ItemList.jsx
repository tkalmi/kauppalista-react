import React, {PropTypes} from 'react';
import Item from '../containers/Item.jsx';

const ItemList = ({items, clickArchive}) => (
    <section className="col-xs-12">
        <table className="table">
            <thead>
                <tr>
                    <th></th>
                    <th>Tavara</th>
                    <th>Määrä</th>
                    <th>Yksikkö</th>
                    <th>Lisätietoja</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {items.map(item => {
                    return <Item key={item._id} item={item}/>
                })}
            </tbody>
        </table>

        {items.length > 0
            ? <button className="btn btn-primary" onClick={clickArchive}>Kauppareissu päättynyt</button>
            : null}
    </section>
)

ItemList.propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        quantity: PropTypes.number.isRequired,
        unit: PropTypes.string.isRequired,
        additionalInfo: PropTypes.string.isRequired,
        bought: PropTypes.bool.isRequired
    }).isRequired).isRequired,
    clickArchive: PropTypes.func.isRequired
}

export default ItemList
