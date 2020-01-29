import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Element.css';

import FullName from './FullName/FullName';
import Address from './Address/Address';
import Radio from './Radio/Radio';

import * as elementActions from '../../store/elements/actions';

class Element extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 'fullName',
            out: [],
        }
        this.option = new Map();
        this.option.set('fullName', <FullName />);
        this.option.set('address', <Address />);
        // option.set(telephone, )
        // option.set(celendar, )
        // option.set(textArea, )
        this.option.set('radio', <Radio index={this.props.index} />)
        // option.set(checkbox, )
        // option.set(fotoRadio, )
        // option.set(fotoCheckbox, )
        // option.set(scale, )
    }
    selectElement = (evt) => {
        const { index } = this.props;
        this.setState({ value: evt.target.value });
        this.props.dispatch(elementActions.changeElement({ name: evt.target.value, elementIndex: index }))
    }
    render() {
        const { value } = this.state;
        const option = this.option;
        const out = option.get(value);
        const { index } = this.props;
        return (
            <fieldset className="element">
                <div className="element__wrapper">
                    <label className="input__label">
                        <span className="input__text">Тип элемента</span>
                        <select onChange={this.selectElement} value={this.state.value} className="element__select">
                            <option value="fullName">ФИО</option>
                            <option value="address">Адрес</option>
                            <option value="telephone">Поле для телефона</option>
                            <option value="celendar">Календарь</option>
                            <option value="textArea">Текстовое поле (большое)</option>
                            <option value="radio">Один ответ из списка</option>
                            <option value="checkbox">Несколько ответов из списка</option>
                            <option value="fotoRadio">Одно фото из списка</option>
                            <option value="fotoCheckbox">Несколько фото из списка</option>
                            <option value="scale">Шкала</option>
                        </select>
                    </label>
                    <label className="toggle element__toggle">
                        <input type="checkbox" className="toggle__checkbox" />
                        <span className="toggle__text">Обязательный вопрос</span>
                    </label>
                </div>
                {out}
            </fieldset>
        )
    }
}

const mapStateToProps = () => {
    return {

    }
}

export default connect(mapStateToProps)(Element);
