import { connect } from 'react-redux'
import { dismissError, dismissConnectionProblems } from '../actions/index'
import ErrorMessageComponent from '../components/ErrorMessage.jsx'


const mapDispatchToProps = (dispatch) => {
  return {
    clickX: (type) => {
      if (type === 'connection') {
        dispatch(dismissConnectionProblems())
      } else {
        dispatch(dismissError())
      }
    }
  }
}

const ErrorMessage = connect(
  null,
  mapDispatchToProps
)(ErrorMessageComponent)

export default ErrorMessage
