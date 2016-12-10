import React from 'react';
import {connect} from 'react-redux'
import {sendItemToServer} from '../actions/index'

let AddItemForm = ({dispatch, unitList}) => {

    let name,
        quantity,
        unit,
        additionalInfo,
        nameNotValid = false,
        quantityNotValid = false;

    function clickSubmit(event) {
        event.preventDefault();

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
        dispatch(sendItemToServer(name.value.trim(), parseInt(quantity.value.trim()), unit.value, additionalInfo.value));

        // Reset form fields (except unit)
        name.value = '';
        quantity.value = 1;
        additionalInfo.value = '';
    }

    return (
        <section>

            <h2 className="col-xs-12">Lisää tavara</h2>

            <form onSubmit={(e) => {
                clickSubmit(e)
            }}>

                <div className="form-group col-md-4">
                    <label>Nimi:</label>
                    <input className="form-control" type="text" name="name" placeholder="Tavaran nimi" autoComplete="off" required="required" ref={node => {
                        name = node
                    }}/> {nameNotValid
                        ? <span className="form-error">Kirjoita tavaran nimi!</span>
                        : null}
                </div>

                <div className="form-div col-md-4 padding0 clearfix">
                    <div className="form-group col-xs-6">
                        <label>Määrä:</label>
                        <input className="form-control" type="number" name="quantity" required="required" autoComplete="off" defaultValue="1" ref={node => {
                            quantity = node
                        }}/> {quantityNotValid
                            ? <span className="form-error">Kirjoita tavaran määrä!</span>
                            : null}
                    </div>

                    <div className="form-group col-xs-6">
                        <label>Yksikkö:</label>
                        <select className="form-control" name="unit" required="required" ref={node => {
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
                    <input className="form-control" type="text" name="additionalInfo" placeholder="Lisätietoja" autoComplete="off" defaultValue="" ref={node => {
                        additionalInfo = node
                    }}/>
                </div>

                <div className="form-group col-xs-12">
                    <button className="btn btn-primary" type="submit">Lisää</button>
                </div>

            </form>
        </section>
    )
}

AddItemForm = connect()(AddItemForm)

export default AddItemForm
