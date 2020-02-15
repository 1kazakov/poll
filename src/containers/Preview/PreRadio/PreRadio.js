import React, { Component } from 'react';

import './PreRadio.css';

class PreRadio extends Component {
    render() {
        const { value, name, id } = this.props;
        let out = [];
        for (let i = 0; i < value.length; i++) {
            //Необходимо посмотреть атрибуты name и value у радио инпутов
            if (value[i] !== null && value[i] !== undefined) {
                if (i === 99) {
                    out = out.concat(<div className="pre-radio__wrapper">
                        <label className="pre-radio__label">
                            <input name={name + id} type="radio" value={name + id + i} className="pre-radio__input" />
                            <span className="pre-radio__radio"></span>
                            Свой вариант ответа
                        </label>
                        <input type="text" placeholder="Введите свой вариант ответа" className="input" />
                    </div>)
                } else {
                    out = out.concat(<label className="pre-radio__label">
                        <input name={name + id} type="radio" value={name + id + i} className="pre-radio__input" />
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

export default PreRadio;
