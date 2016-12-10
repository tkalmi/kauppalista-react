import React, {PropTypes} from 'react'

const ErrorMessage = ({message, clickX, errorType}) => {
    return (
        <div className="error-message">
            <article className="alert alert-danger">
                    <h1>Virhe!</h1>
                    <i className="fa fa-times" aria-hidden="true" onClick={() => {clickX(errorType)}}></i>
                    <p>{message}</p>
            </article>
        </div>
    )
}

ErrorMessage.propTypes = {
    message: PropTypes.string.isRequired
}

export default ErrorMessage
