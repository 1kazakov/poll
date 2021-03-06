import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Radio.css';

import * as elementActions from '../../../store/elements/actions';
import * as elementSelectors from '../../../store/elements/reducer';

class Radio extends Component {
    setOptionRadio = (evt) => {
        evt.preventDefault();
        const { index, position } = this.props;
        this.props.dispatch(elementActions.addOptionRadio({ elementIndex: index, position, optionIndex: evt.target.name, value: evt.target.value }))
    }
    deleteInput = (evt) => {
        evt.preventDefault();
        const { index, position } = this.props;
        this.props.dispatch(elementActions.addOptionRadio({ elementIndex: index, position, optionIndex: evt.target.name, value: null }))
    }
    addInput = (evt) => {
        evt.preventDefault();
        const { counter, index, position } = this.props;
        this.props.dispatch(elementActions.addOptionRadio({ elementIndex: index, position, value: '', optionIndex: counter }))
    }
    addOther = (evt) => {
        evt.preventDefault();
        const { index, position } = this.props;
        this.props.dispatch(elementActions.addOptionRadio({ elementIndex: index, position, optionIndex: 99, value: 'other' }))
    }
    render() {
        const { options } = this.props;
        const out = [];
        for (let i = 1; i < options.length; i++) {
            if (i === 99 && options[i] !== null) {
                out.push(<div className={`radio__input-wrapper radio__input-wrapper--other ${this.props.class}`} key={i} > Другое <button name={i} className="button--del" onClick={this.deleteInput}></button></div>);
                break;
            }
            if (options[i] !== null && options[i] !== undefined) {
                out.push(<div className={`radio__input-wrapper ${this.props.class}`} key={i}>
                    <input type="text" name={i} className="input radio__input" placeholder="Введите вариант ответа" onChange={this.setOptionRadio} value={options[i]} />
                    <button name={i} className="button--del" onClick={this.deleteInput}></button>
                </div>)
            }
        }

        return (
            <div className="radio">
                <div className={`radio__input-wrapper ${this.props.class}`}>
                    <input className="input radio__input" placeholder="Введите вариант ответа" name='0' onChange={this.setOptionRadio} value={options[0]} />
                </div>
                {out}
                <p className="radio__text">
                    <button onClick={this.addInput} className="buttom--text">Добавить еще вариант</button>
                    или вариант
                     <button className="buttom--text" onClick={this.addOther}>«Другое»</button>
                </p>
            </div>
        )
    }
}

const mapStateToProps = (state, props) => {
    return {
        options: elementSelectors.getOptions(state, props.index),
        counter: elementSelectors.getCounter(state, props.position, props.index),
    }
}

export default connect(mapStateToProps, null, null, { pure: false })(Radio);
