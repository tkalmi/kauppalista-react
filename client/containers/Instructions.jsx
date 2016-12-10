import { connect } from 'react-redux'
import { dismissInstructions } from '../actions/index'
import InstructionsComponent from '../components/Instructions.jsx'

const mapDispatchToProps = (dispatch) => {
  return {
    dismissInstructions: () => {
      dispatch(dismissInstructions())
    },
  }
}

const Instructions = connect(
  null, // Here would normally be mapStateToProps method
  mapDispatchToProps
)(InstructionsComponent)

export default Instructions
