import React, { Component } from 'react';
import { connect } from 'react-redux';

import './PreCheckbox.css';

import * as resultSelectors from '../../../store/results/reducer';
import * as resultActions from '../../../store/results/actions';

class PreCheckbox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            input: false,
        }
    }
    setAnswer = (evt) => {
        // const { id, position, element, value } = this.props;
        // let { answer } = element;
        // answer[evt.target.name].checked = true;
        // this.setState({ input: false });
        // this.props.dispatch(resultActions.setAnswer({ elementIndex: id, position, answer: evt.target.value }));
    }
    setOther = (evt) => {
        // const { id, position } = this.props;
        // this.setState({ input: true });
        // this.props.dispatch(resultActions.setAnswer({ elementIndex: id, position, answer: evt.target.value }));
    }
    setAnswerOther = (evt) => {
        // const { id, position, value } = this.props;
        // const result = {};
        // for (let i = 0; i < value.length; i++) {
        //     result[value[i]] = false
        // }
        // let answer = `other ${evt.target.value}`
        // this.props.dispatch(resultActions.setAnswer({ elementIndex: id, position, answer }));
    }
    render() {
        const { value, element } = this.props;
        console.log('element', element)
        let { answer } = element;
        let out = [];
        for (let i = 0; i < value.length; i++) {
            //Необходимо посмотреть атрибуты name и value у радио инпутов
            if (value[i] !== null && value[i] !== undefined) {
                if (i === 99) {
                    out = out.concat(<div className="pre-checkbox__wrapper">
                        <label className="pre-checkbox__label">
                            <input onChange={this.setOther} name={i} type="checkbox" value="other" className="pre-checkbox__input" />
                            <span className="pre-checkbox__checkbox"></span>
                            Свой вариант ответа
                        </label>
                        {this.state.input ? <input onChange={this.setAnswerOther} type="text" placeholder="Введите свой вариант ответа" className="input" /> : null}
                    </div>)
                } else {
                    out = out.concat(<label className="pre-checkbox__label">
                        <input
                            onChange={this.setAnswer}
                            checked={answer === value[i]}
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

export default connect(mapStateToProps)(PreCheckbox);
