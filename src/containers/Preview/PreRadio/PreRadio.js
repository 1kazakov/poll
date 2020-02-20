import React, { Component } from 'react';
import { connect } from 'react-redux';

import './PreRadio.css';

import * as resultAction from '../../../store/results/actions';
import * as resultSelectors from '../../../store/results/reducer';

class PreRadio extends Component {
    constructor(props) {
        super(props);
        this.state = {
            input: false,
        }
    }
    setAnswer = (evt) => {
        const { id, position } = this.props;
        this.setState({ input: false });
        this.props.dispatch(resultAction.setAnswer({ elementIndex: id, position, answer: evt.target.value }));
    }
    setOther = (evt) => {
        const { id, position } = this.props;
        this.setState({ input: true });
        this.props.dispatch(resultAction.setAnswer({ elementIndex: id, position, answer: evt.target.value }));
    }
    setAnswerOther = (evt) => {
        const { id, position, value } = this.props;
        const result = {};
        for (let i = 0; i < value.length; i++) {
            result[value[i]] = false
        }
        let answer = `other ${evt.target.value}`
        this.props.dispatch(resultAction.setAnswer({ elementIndex: id, position, answer }));
    }
    render() {
        const { value, name, id, element } = this.props;
        let { answer = '' } = element;

        let out = [];
        for (let i = 0; i < value.length; i++) {
            if (value[i] !== null && value[i] !== undefined) {
                if (i === 99) {
                    out = out.concat(<div className="pre-radio__wrapper">
                        {/* Элемент "Свой вариант" неуправляемый */}
                        <label className="pre-radio__label">
                            <input onChange={this.setOther} name={name + id} type="radio" value={value[i]} className="pre-radio__input" />
                            <span className="pre-radio__radio"></span>
                            Свой вариант ответа
                        </label>
                        {this.state.input ? <input onChange={this.setAnswerOther} name={`other ${value[i]}`} type="text" placeholder="Введите свой вариант ответа" className="input" /> : null}
                    </div>)
                } else {
                    out = out.concat(<label className="pre-radio__label">
                        <input
                            onChange={this.setAnswer}
                            checked={answer === value[i]}
                            name={name + id} type="radio"
                            value={value[i]}
                            className="pre-radio__input" />
                        <span className="pre-radio__radio"></span>{value[i]}
                    </label>)
                }

            }
        }

        return (
            <div className="pre-radio">
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

export default connect(mapStateToProps, null, null, { pure: false })(PreRadio);
