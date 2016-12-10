import React from 'react';
import AddItemForm from '../containers/AddItemForm.jsx';
import ItemList from '../containers/ItemList.jsx';
import ErrorMessage from '../containers/ErrorMessage.jsx';
import Spinner from './Spinner.jsx';
import Instructions from '../containers/Instructions.jsx';
import CopyLinkButton from './CopyLinkButton.jsx';
import EditItemForm from '../containers/EditItemForm.jsx';

const App = (state) => {
    return (
        <div>
            {state.showSpinner
                ? <Spinner/>
                : null}

            {state.showError
                ? <ErrorMessage message={state.errorMsg} errorType="normal"/>
                : null}

            {state.connectionProblems
                ? <ErrorMessage message={'Internet-yhteytesi reistailee'} errorType="connection"/>
                : null}

            {state.showInstructionsFlag
                ? <Instructions/>
                : null}

            <main className={state.showSpinner || state.showError || state.showInstructionsFlag
                ? 'blurred col-md-10 col-md-offset-1'
                : 'col-md-10 col-md-offset-1'}>
                <h1>Kauppalista&nbsp;
                    <i className="fa fa-question-circle-o" aria-hidden="true" onClick={state.showInstructions}></i>
                </h1>

                {state.isList
                    ? <div className="" style={{
                            padding: '0 15px'
                        }}>
                            <CopyLinkButton/>
                            <form className="create-list pull-right" method="POST" action="/createList">
                                <button type="submit" className="btn btn-warning">Luo uusi lista!</button>
                            </form>
                        </div>
                    : null}

                {state.isList && state.isEditing
                    ? <div>
                            <EditItemForm unitList={state.unitList} item={state.editableItem}/>
                        </div>
                    : null}
                {state.isList && !state.isEditing
                    ? <div>
                            <AddItemForm unitList={state.unitList}/>
                            <ItemList/>
                        </div>
                    : null}

                {!state.isList
                    ? <form method="POST" action="/createList">
                            <div className="row" style={{textAlign: 'center', marginTop: '40px'}}>
                                <button type="submit" className="btn btn-lg btn-success">Luo uusi lista!</button>
                            </div>
                        </form>
                    : null
}
            </main>
        </div>
    )
}
export default App;
