import React from 'react';
import {connect} from 'react-redux'
import {editItem, goBackToList, deleteItem} from '../actions/index'

let EditItemForm = ({dispatch, unitList, item}) => {

    let name,
        quantity,
        unit,
        additionalInfo,
        nameNotValid = false,
        quantityNotValid = false;

    function clickSubmit() {

        // Validate name
        if (!name.value.trim()) {
            nameNotValid = true;
            return;
        } else {
            nameNotValid = false;
        }

        // Validate quantity
        if (!quantity.value.trim() || !/^[0-9]+$/.test(quantity.value.trim())) {
            quantityNotValid = true;
            return;
        } else {
            quantityNotValid = false;
        }

        // Send new item to server
        dispatch(editItem(Object.assign({}, item, {
            _id: item._id,
            name: name.value.trim(),
            quantity: parseInt(quantity.value.trim()),
            unit: unit.value,
            additionalInfo: additionalInfo.value
        })));

        dispatch(goBackToList());
    }

    function clickDeleteItem() {
        dispatch(deleteItem(item))
        dispatch(goBackToList())
    }

    return (
        <section>

            <h2 className="col-xs-12">Muokkaa tavaraa</h2>

            <form>

                <div className="form-group col-md-4">
                    <label>Nimi:</label>
                    <input className="form-control" type="text" name="name" placeholder="Tavaran nimi" autoComplete="off" required="required" defaultValue={item.name} ref={node => {
                        name = node
                    }}/> {nameNotValid
                        ? <span className="form-error">Kirjoita tavaran nimi!</span>
                        : null}
                </div>

                <div className="form-div col-md-4 padding0 clearfix">
                    <div className="form-group col-xs-6">
                        <label>Määrä:</label>
                        <input className="form-control" type="number" name="quantity" required="required" defaultValue={item.quantity} autoComplete="off" ref={node => {
                            quantity = node
                        }}/> {quantityNotValid
                            ? <span className="form-error">Kirjoita tavaran määrä!</span>
                            : null}
                    </div>

                    <div className="form-group col-xs-6">
                        <label>Yksikkö:</label>
                        <select className="form-control" name="unit" required="required" defaultValue={item.unit} ref={node => {
                            unit = node
                        }}>
                            {unitList.map((unitItem) => {
                                return <option value={unitItem} key={unitItem}>{unitItem}</option>
                            })}
                        </select>
                    </div>
                </div>

                <div className="form-group col-md-4">
                    <label>Lisätiedot:</label>
                    <input className="form-control" type="text" name="additionalInfo" placeholder="Lisätietoja" autoComplete="off" defaultValue={item.additionalInfo} ref={node => {
                        additionalInfo = node
                    }}/>
                </div>

                <div className="form-group col-xs-12">
                    <div className="btn btn-success" onClick={clickSubmit}>OK</div>
                    <div className="btn btn-warning" style={{'marginLeft': '3px'}} onClick={() => {
                        dispatch(goBackToList())
                    }}>Peruuta</div>
                  <div className="btn btn-danger pull-right" onClick={clickDeleteItem}>Poista</div>
                </div>

            </form>
        </section>
    )
}

EditItemForm = connect()(EditItemForm)

export default EditItemForm
