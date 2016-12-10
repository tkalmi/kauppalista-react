import React from 'react'
import CopyToClipboard from 'react-copy-to-clipboard'

class CopyLinkButton extends React.Component {
    constructor() {
        super()
        this.state = {
            copied: false,
            value: window.location.href
        }
    }

    render() {
        return (
            <div className="copy-to-clipboard">
                <div>
                    <input defaultValue={this.state.value} className="copy-link-input" readOnly="readonly"/>

                    <CopyToClipboard text={this.state.value} onCopy={() => {
                        this.setState({copied: false});
                        setTimeout(() => {
                            this.setState({copied: true})
                        }, 100);
                    }}>
                        <button className="btn btn-info copy-link-button">Kopioi linkki</button>
                    </CopyToClipboard>&nbsp;
                    <span className={this.state.copied ? 'copy-link-response copy-link-animation-triggered' : 'copy-link-response'}>Kopioitu</span>
                </div>
            </div>
        )
    }
}

export default CopyLinkButton
