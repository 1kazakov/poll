import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Scale.css';

import * as elementActions from '../../../store/elements/actions';
import * as elementSelectors from '../../../store/elements/reducer';

class Scale extends Component {
    setOptionRadio = (evt) => {
        evt.preventDefault();
        this.props.dispatch(elementActions.addOptionRadio({ elementIndex: this.props.index, indexOption: evt.target.name, value: evt.target.value }))
    }
    render() {
        const { options } = this.props;
        return (
            <div className="scale">
                <div className="scale__wrapper">
                    <input onChange={this.setOptionRadio} value={options[0]} className="input scale__input" placeholder="Введите минимальное значение" name="0" min="0" type="number" />
                    <input onChange={this.setOptionRadio} value={options[1]} className="input scale__input" placeholder="Введите максимальное значение" name="1" type="number" />
                </div>
                <div className="scale__description">
                    <p> {options[0]}</p>
                    <input type="text" className="input scale__input--description" />
                </div>
                <div className="scale__description">
                    <p>{options[1]}</p>
                    <input type="text" className="input scale__input--description" />
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, props) => {
    return {
        //Если убрать следующую строку то элемент не обновляется, не знаю почему!!! возможно потому что нет глубокой проверки пропсов
        state: state,
        options: elementSelectors.getOptions(state, props.index),
    }
}
export default connect(mapStateToProps)(Scale);
