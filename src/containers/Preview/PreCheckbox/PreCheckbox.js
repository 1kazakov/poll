import React, { Component } from 'react';

import './PreCheckbox.css';

class PreCheckbox extends Component {
    render() {
        const { value, name, id } = this.props;
        let out = [];
        for (let i = 0; i < value.length; i++) {
            //Необходимо посмотреть атрибуты name и value у радио инпутов
            if (value[i] !== null && value[i] !== undefined) {
                if (i === 99) {
                    out = out.concat(<div className="pre-checkbox__wrapper">
                        <label className="pre-checkbox__label">
                            <input name={i} type="checkbox" value="other" className="pre-checkbox__input" />
                            <span className="pre-checkbox__checkbox"></span>
                            Свой вариант ответа
                        </label>
                        <input type="text" placeholder="Введите свой вариант ответа" className="input" />
                    </div>)
                } else {
                    out = out.concat(<label className="pre-checkbox__label">
                        <input name={i} type="checkbox" value={value[i]} className="pre-checkbox__input" />
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

export default PreCheckbox;
