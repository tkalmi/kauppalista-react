import { connect } from 'react-redux';
import { showSpinner, showInstructions } from '../actions/index';
import AppComponent from '../components/App.jsx';

const mapStateToProps = (state) => {
  return {
    showSpinner: state.showSpinner,
    showError: state.showError,
    connectionProblems: state.connectionProblems,
    errorMsg: state.errorMsg,
    isList: state.isList,
    isEditing: state.isEditing,
    editableItem: state.editableItem,
    showInstructionsFlag: state.showInstructions,
    unitList: ['kpl', 'pkt', 'prk', 'plo', 'pss', 'kg', 'g', 'l', 'dl']
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    showInstructions: () => {
      dispatch(showInstructions())
    }
    // createNewList: () => {
    //   dispatch(showSpinner())
    // }
  }
}

const App = connect(
  mapStateToProps,
  mapDispatchToProps
)(AppComponent)

export default App
