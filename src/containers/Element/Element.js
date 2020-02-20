import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Element.css';

import Radio from './Radio/Radio';
import FotoRadio from './FotoRadio/FotoRadio';
import Scale from './Scale/Scale';

import * as elementActions from '../../store/elements/actions';
import * as elementSelectors from '../../store/elements/reducer';

class Element extends Component {

    setQuestion = (evt) => {
        const { index, position } = this.props;
        this.props.dispatch(elementActions.changeElement({ question: evt.target.value, elementIndex: index, position }))
    }
    selectElement = (evt) => {
        const { index, position } = this.props;
        const elementName = evt.target.value;
        if (elementName === 'radio' || elementName === 'checkbox') {
            this.props.dispatch(elementActions.changeElement({ name: elementName, elementIndex: index, value: [''], counter: 1, position }))
        } else if (elementName === 'fotoRadio' || elementName === 'fotoCheckbox') {
            this.props.dispatch(elementActions.changeElement({ name: elementName, elementIndex: index, value: [{ description: '', url: null }], counter: 1, position }))
        } else if (elementName === 'scale') {
            this.props.dispatch(elementActions.changeElement({ name: elementName, elementIndex: index, value: [{ description: '', value: '0' }, { description: '', value: '10' }], position }))
        } else {
            this.props.dispatch(elementActions.changeElement({ name: evt.target.value, elementIndex: index, position }))
        }
    }
    setRequired = (evt) => {
        const { index, position } = this.props;
        this.props.dispatch(elementActions.changeElement({ required: evt.target.checked, elementIndex: index, position }))
    }
    elementUp = (evt) => {
        evt.preventDefault();
        const { element, index } = this.props;
        const { position } = element;
        this.props.dispatch(elementActions.transferElement({ position, transfer: 'up', elementIndex: index }))
    }
    elementDown = (evt) => {
        evt.preventDefault();
        const { element, index } = this.props;
        const { position } = element;
        this.props.dispatch(elementActions.transferElement({ position, transfer: 'down', elementIndex: index }))
    }
    elementDelete = (evt) => {
        evt.preventDefault()
        const { element, index } = this.props;
        const { position } = element;
        this.props.dispatch(elementActions.deleteElement({ position, elementIndex: index }))
    }
    render() {
        let option = new Map();
        option.set('fullName', null);
        option.set('address', null);
        option.set('telephone', null);
        option.set('celendar', null);
        option.set('textArea', null);
        option.set('radio', <Radio index={this.props.index} position={this.props.position} class='circle' />);
        option.set('checkbox', <Radio index={this.props.index} position={this.props.position} class='square' />);
        option.set('fotoRadio', <FotoRadio index={this.props.index} position={this.props.position} class='circle' />);
        option.set('fotoCheckbox', <FotoRadio index={this.props.index} position={this.props.position} class='square' />)
        option.set('scale', <Scale index={this.props.index} position={this.props.position} />)
        const { element } = this.props;
        const { question, required } = element;
        const value = element.name;
        let out = option.get(value);

        return (
            <fieldset className="element">
                <p className="element__title-question input__text">Введите вопрос</p>
                <input type="text" className="input element__input-question" value={question} onChange={this.setQuestion} placeholder="Введите вопрос, на который должен ответить опрашиваемый" />
                <div className="element__wrapper">
                    <label className="input__label">
                        <span className="input__text">Тип элемента</span>
                        <select onChange={this.selectElement} value={value} className="element__select">
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
                    <button onClick={this.elementUp} className="element__button element__button--up"></button>
                    <button onClick={this.elementDown} className="element__button element__button--down"></button>
                    <button onClick={this.elementDelete} className="element__button element__button--del"></button>
                    <label className="toggle element__toggle">
                        <input type="checkbox" className="toggle__checkbox" checked={required} onChange={this.setRequired} />
                        <span className="toggle__text">Обязательный вопрос</span>
                    </label>
                </div>
                {out}
            </fieldset>
        )
    }
}

const mapStateToProps = (state, props) => {
    return {
        element: elementSelectors.getElement(state, props.index)
    }
}

export default connect(mapStateToProps, null, null, { pure: false })(Element);
