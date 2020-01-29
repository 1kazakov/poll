import React, { Component } from 'react';
import './Radio.css';

class Radio extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputs: [],
            radio: [],
            counter: 0,
        }
    }
    setTitleRadio = (evt) => {
        evt.preventDefault();
        let radio = this.state.radio.slice();
        radio = radio.concat({
            value: evt.target.value,
            index: evt.target.name
        });
        this.setState({ radio: radio });
    }
    deleteInput = (evt) => {
        console.log(123123123123)
        evt.preventDefault();
        const index = evt.target.name;
        let inputs = this.state.inputs.slice();
        const delIndex = inputs.findIndex(input => input.index === index);
        inputs.splice(delIndex, 1);
        this.setState({ inputs: inputs });
    }
    addInput = (evt) => {
        evt.preventDefault();
        let inputs = this.state.inputs.slice();
        let index = inputs.length;
        if (inputs.length !== 0 && inputs[inputs.length] === 99) {
            index = index - 1;
        }
        inputs = inputs.concat({
            input: <div className="radio__input-wrapper" key={index}><input type="text" name={index} className="input radio__input" placeholder="Введите вариант ответа" onChange={this.setTitleRadio} value={this.state.radio[index]} /> <button name={index} className="radio__button--del" onClick={this.deleteInput}></button></div>,
            index: index,
        });
        inputs.sort((a, b) => a.index - b.index);
        this.setState({ inputs: inputs });

    }
    addOther = (evt) => {
        evt.preventDefault();
        let inputs = this.state.inputs.slice();
        const index = 99;
        inputs = inputs.concat({
            input: <input type="text" key={inputs.size} className="input radio__input" placeholder="Введите ваш вариант ответа" />,
            index: index,
        });
        this.setState({ inputs: inputs });
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
                    <input className="input radio__input" placeholder="Введите вариант ответа"></input>
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
export default Radio;
