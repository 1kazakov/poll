import React, { Component } from 'react';

import './PreFotoRadio.css';


class PreFotoRadio extends Component {

    render() {
        const { value, name, id } = this.props;
        let out = [];
        for (let i = 0; i < value.length; i++) {
            //Необходимо посмотреть атрибуты name и value у радио инпутов
            if (value[i] !== null && value[i] !== undefined) {
                let style;
                if ((i + 1) % 3 === 0) { style = { marginRight: 0 } };
                out = out.concat(
                    <div className="pre-foto-radio__card" style={style}>
                        <label className="pre-foro-radio__label" key={value[i].description}>
                            <div className="pre-foto-radio__wrapper-img">
                                <img className="pre-foto-radio__img" src={value[i].url} alt={value[i].description} />
                            </div>
                            <input name={name + id} type="radio" value={value[i].description} className="pre-foro-radio__input" />
                            <span className="pre-foro-radio__radio"></span>
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



export default PreFotoRadio;
