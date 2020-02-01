import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Radio.css';

import * as elementActions from '../../../store/elements/actions';

class Radio extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputs: [],
            radio: [{ index: 0, value: '' }],
            counter: 0,
        }
        this.lastCall = undefined;
        this.lastCallTimer = null;
    }
    setOptionRadio = (evt) => {
        evt.preventDefault();
        let radio = this.state.radio.slice();
        radio = radio.filter(element => element.index != evt.target.name);// eslint-disable-line
        radio = radio.concat({
            value: evt.target.value,
            index: Number(evt.target.name)
        });
        radio.sort((a, b) => {
            return a.index - b.index
        });
        this.setState({ radio: radio });
        this.props.dispatch(elementActions.addOptionRadio({ elementIndex: this.props.index, indexOption: evt.target.name, value: evt.target.value }))
    }
    deleteInput = (evt) => {
        evt.preventDefault();
        const index = evt.target.name;
        let inputs = this.state.inputs.slice();
        const delIndex = inputs.findIndex(input => input.index == index);// eslint-disable-line
        inputs.splice(delIndex, 1);
        let radio = this.state.radio.slice();
        if (radio[delIndex].value !== '') {
            this.props.dispatch(elementActions.addOptionRadio({ elementIndex: this.props.index, indexOption: evt.target.name, value: null }))
        }
        radio.splice(delIndex + 1, 1);
        this.setState({ inputs: inputs, radio: radio });

    }
    addInput = (evt) => {
        evt.preventDefault();
        let inputs = this.state.inputs.slice();
        let radio = this.state.radio.slice();
        let index = this.state.counter + 1;
        if (inputs.length !== 0 && inputs[inputs.length] === 99) {
            index = index - 1;
        }
        radio = radio.concat({ value: '', index: index })
        inputs = inputs.concat({
            input: <div className="radio__input-wrapper" key={index}><input type="text" name={index} className="input radio__input" placeholder="Введите вариант ответа" onChange={this.setOptionRadio} value={this.state.radio[index]} /> <button name={index} className="button--del" onClick={this.deleteInput}></button></div>,
            index: index,
        });
        inputs.sort((a, b) => {
            return Number(a.index) - Number(b.index)
        });
        this.setState({ inputs: inputs, counter: index, radio: radio });
    }
    addOther = (evt) => {
        evt.preventDefault();
        let inputs = this.state.inputs.slice();
        const index = 99;
        if (inputs.filter(input => input.index == index).length === 0) {// eslint-disable-line
            inputs = inputs.concat({
                input: <input type="text" key={inputs.size} className="input radio__input" placeholder="Введите ваш вариант ответа" />,
                index: index,
            });
            this.setState({ inputs: inputs });
            this.props.dispatch(elementActions.addOptionRadio({ elementIndex: this.props.index, indexOption: '99', value: 'other' }))
        }
    }
    render() {
        const { inputs } = this.state;
        let out = [];

        for (let element of inputs) {
            let { input } = element;
            out.push(input);
        }
        return (
            <div className="radio">
                <div className="radio__input-wrapper">
                    <input className="input radio__input" placeholder="Введите вариант ответа" name='0' onChange={this.setOptionRadio} value={this.state.radio[0].value} />
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

const mapStateToProps = () => {
    return {

    }
}

export default connect(mapStateToProps)(Radio);
