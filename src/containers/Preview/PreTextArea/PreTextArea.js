import React, { Component } from 'react';

import './PreTextArea.css';

class PreTextArea extends Component {
    render() {
        return (
            <div className="pre-textarea">
                <textarea className="pre-textarea__input"></textarea>
            </div>
        )
    }
}

export default PreTextArea;
