import React, { Component } from 'react';
import './Address.css';

class Address extends Component {
    render() {
        return (
            <div className="address">
                <label>
                    <span className="input__text">Адрес проживания</span>
                    <input className="input address__input" placeholder="Город, улица, номер дома" />
                </label>
            </div>
        )
    }
}

export default Address;
