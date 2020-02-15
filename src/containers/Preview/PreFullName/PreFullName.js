import React, { Component } from 'react';
import './PreFullName.css';
import { connect } from 'react-redux';

import * as resultAction from '../../../store/results/actions';
import * as resultSelectors from '../../../store/results/reducer';

class PreFullName extends Component {

    setAnswer = (evt) => {
        const { id, position, element } = this.props;
        const { answer } = element;
        const arr = answer.split(' ');
        let data = { firstName: arr[0], surname: arr[1], patronymic: arr[2] };
        data = { ...data, [evt.target.name]: evt.target.value };
        const { firstName = '', surname = '', patronymic = '' } = data;
        this.props.dispatch(resultAction.setAnswer({ elementIndex: id, position, answer: `${firstName} ${surname} ${patronymic}` }));
    }

    render() {
        const { element } = this.props;
        const { answer } = element;
        const arr = answer.split(' ');
        const firstName = arr[0];
        const surname = arr[1];
        const patronymic = arr[2];

        return (
            <div className="full-name">
                <label className="full-name__input__label input__label" >
                    <span className="input__text">Фамилия</span>
                    <input name="firstName" value={firstName} onChange={this.setAnswer} className="input full-name__input" placeholder="Петров" />
                </label>
                <label className="full-name__input__label input__label" >
                    <span className="input__text">Имя</span>
                    <input name="surname" value={surname} onChange={this.setAnswer} className="input full-name__input" placeholder="Иван" />
                </label>
                <label className="full-name__input__label input__label last" >
                    <span className="input__text">Отчество</span>
                    <input name="patronymic" value={patronymic} onChange={this.setAnswer} className="input full-name__input" placeholder="Васильевич" />
                </label>
            </div>
        )
    }
}

const mapStateToProps = (state, props) => {
    return {
        element: resultSelectors.getElement(state, props.id, props.position)
    }
}

export default connect(mapStateToProps, null, null, { pure: false })(PreFullName);
