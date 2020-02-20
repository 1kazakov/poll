import React, { Component } from 'react';
import { connect } from 'react-redux';

import './PreCheckbox.css';

import * as resultSelectors from '../../../store/results/reducer';
import * as resultActions from '../../../store/results/actions';

class PreCheckbox extends Component {

    setAnswer = (evt) => {
        const { id, position, element } = this.props;
        let { answer } = element;
        this.props.dispatch(resultActions.setAnswer({ elementIndex: id, position, answer: !answer[evt.target.name].checked, answerIndex: evt.target.name }));
    }
    setAnswerOther = (evt) => {
        const { id, position, value } = this.props;
        const result = {};
        for (let i = 0; i < value.length; i++) {
            result[value[i]] = false
        }
        let answer = evt.target.value;
        this.props.dispatch(resultActions.setAnswer({ elementIndex: id, position, answer, answerIndex: evt.target.name }));
    }
    render() {
        const { value, element } = this.props;
        let { answer } = element;
        let out = [];
        for (let i = 0; i < value.length; i++) {
            if (value[i] !== null && value[i] !== undefined) {
                if (i === 99) {
                    const { description = '' } = answer[i];
                    out = out.concat(<div className="pre-checkbox__wrapper">
                        <label className="pre-checkbox__label">
                            <input onChange={this.setAnswer} name={i} type="checkbox" value="other" className="pre-checkbox__input" />
                            <span className="pre-checkbox__checkbox"></span>
                            Свой вариант ответа
                        </label>
                        {answer[i].checked ? <input name={i} onChange={this.setAnswerOther} value={description} type="text" placeholder="Введите свой вариант ответа" className="input" /> : null}
                    </div>)
                } else {
                    out = out.concat(<label className="pre-checkbox__label">
                        <input
                            onChange={this.setAnswer}
                            checked={answer[i].checked}
                            name={i}
                            type="checkbox"
                            value={value[i]}
                            className="pre-checkbox__input" />
                        <span className="pre-checkbox__checkbox"></span>{value[i]}
                    </label>)
                }

            }
        }
        return (
            <div className="pre-checkbox">
                {out}
            </div>
        )
    }
}

const mapStateToProps = (state, props) => {
    return {
        element: resultSelectors.getElement(state, props.id, props.position)
    }
}

export default connect(mapStateToProps, null, null, { pure: false })(PreCheckbox);
