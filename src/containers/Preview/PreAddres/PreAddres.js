import React, { Component } from 'react';
import { connect } from 'react-redux';
import './PreAddres.css';

import * as resultSelectors from '../../../store/results/reducer';
import * as resultAction from '../../../store/results/actions';

class PreAddres extends Component {
    // constructor(props) {
    //     super(props)
    // }

    setAnswer = (evt) => {
        const { id, position } = this.props;
        this.props.dispatch(resultAction.setAnswer({ elementIndex: id, position, answer: evt.target.value }))
    }

    render() {
        const { element } = this.props;
        const { answer } = element;
        return (
            <div>
                <input type="text" className="input" onChange={this.setAnswer} value={answer} />
            </div>
        )
    }
}

const mapStateToProps = (state, props) => {
    return {
        element: resultSelectors.getElement(state, props.id, props.position)
    }
}

export default connect(mapStateToProps, null, null, { pure: false })(PreAddres);
