import React, { Component } from 'react';
import { connect } from 'react-redux';

import './PreTextArea.css';

import * as resultAction from '../../../store/results/actions';
import * as resultSelectors from '../../../store/results/reducer';

class PreTextArea extends Component {
    setAnswer = (evt) => {
        const { id, position } = this.props;
        this.props.dispatch(resultAction.setAnswer({ elementIndex: id, position, answer: evt.target.value }))
    }
    render() {
        const { element } = this.props;
        const { answer } = element;
        return (
            <div className="pre-textarea">
                <textarea value={answer} onChange={this.setAnswer} className="pre-textarea__input textarea"></textarea>
            </div>
        )
    }
}

const mapStateToProps = (state, props) => {
    return {
        element: resultSelectors.getElement(state, props.id, props.position)
    }
}

export default connect(mapStateToProps, null, null, { pure: false })(PreTextArea);
