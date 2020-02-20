import React, { Component } from 'react';
import { connect } from 'react-redux';

import './PreFotoCheckbox.css';

import * as resultActions from '../../../store/results/actions';
import * as resultSelectors from '../../../store/results/reducer';

class PreFotoCheckbox extends Component {
    setAnswer = (evt) => {
        const { id, position, element } = this.props;
        let { answer } = element;
        this.props.dispatch(resultActions.setAnswer({ elementIndex: id, position, answer: !answer[evt.target.name].checked, answerIndex: evt.target.name }));
    }
    render() {
        const { value, name, id, element } = this.props;// eslint-disable-line
        let { answer } = element;
        let out = [];
        for (let i = 0; i < value.length; i++) {
            if (value[i] !== null && value[i] !== undefined) {
                let { checked = false } = answer[i];
                let style;
                if ((i + 1) % 3 === 0) { style = { marginRight: 0 } };
                out = out.concat(
                    <div className="pre-foto-radio__card" style={style}>
                        <label className="pre-foro-radio__label" key={value[i].description}>
                            <div className="pre-foto-radio__wrapper-img">
                                <img className="pre-foto-radio__img" src={value[i].url} alt={value[i].description} />
                            </div>
                            <input checked={checked} onChange={this.setAnswer} name={i} type="checkbox" value={value[i].description} className="pre-foro-radio__input" />
                            <span className="pre-foro-checkbox__checkbox"></span>
                            {value[i].description}
                        </label>
                    </div >
                )
            }

        }

        return (
            <div className="pre-foro-radio">
                {out}
            </div >
        )

    }
}

const mapStateToProps = (state, props) => {
    return {
        element: resultSelectors.getElement(state, props.id, props.position)
    }
}

export default connect(mapStateToProps, null, null, { pure: false })(PreFotoCheckbox);
