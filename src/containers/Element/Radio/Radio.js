import React, { Component } from 'react';
import './Radio.css';

class Radio extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputs: new Map,
        }
    }
    addInput = (evt) => {
        evt.preventDefault();
        let inputs = new Map(this.state.inputs);
        inputs.set(inputs.size, { input: <div className="radio__input-wrapper"><input type="text" key={inputs.size} className="input radio__input" placeholder="Введите вариант ответа" /></div> });
        this.setState({ inputs: inputs });

    }
    addOther = (evt) => {
        evt.preventDefault();
        let inputs = new Map(this.state.inputs);
        if (!inputs.has(99)) {
            inputs.set(99, { input: <input type="text" key={inputs.size} className="input radio__input" placeholder="Введите ваш вариант ответа" /> })
        }
        this.setState({ inputs: inputs });
    }
    render() {
        const { inputs } = this.state;
        let out = [];
        console.log(inputs)

        for (let element of inputs) {
            let [index, input] = element;
            out.push(input.input);
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
