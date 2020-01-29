import React, { Component } from 'react';
import './FullName.css';

class FullName extends Component {
    render() {
        console.log('FullName', this.props.index)
        return (
            <div className="full-name">
                <label className="full-name__input__label input__label" >
                    <span className="input__text">Фамилия</span>
                    <input className="input full-name__input" placeholder="Петров" />
                </label>
                <label className="full-name__input__label input__label" >
                    <span className="input__text">Имя</span>
                    <input className="input full-name__input" placeholder="Иван" />
                </label>
                <label className="full-name__input__label input__label last" >
                    <span className="input__text">Отчество</span>
                    <input className="input full-name__input" placeholder="Васильевич" />
                </label>
            </div>
        )
    }
}

export default FullName;
