import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Scale.css';

import * as elementActions from '../../../store/elements/actions';
import * as elementSelectors from '../../../store/elements/reducer';

class Scale extends Component {
    setOption = (evt) => {
        evt.preventDefault();
        const { index, position } = this.props;
        this.props.dispatch(elementActions.addOptionRadio({ elementIndex: index, position, optionIndex: evt.target.name, value: { value: evt.target.value } }));
    }
    setDescription = (evt) => {
        const { index, position } = this.props;
        this.props.dispatch(elementActions.addOptionRadio({ elementIndex: index, position, optionIndex: evt.target.name, value: { description: evt.target.value } }));
    }
    render() {
        const { options } = this.props;
        return (
            <div className="scale">
                <div className="scale__wrapper">
                    <input onChange={this.setOption} value={options[0].value} className="input scale__input" placeholder="Введите минимальное значение" name="0" min="0" max="9" type="number" />
                    <input onChange={this.setOption} value={options[1].value} className="input scale__input" placeholder="Введите максимальное значение" name="1" min="1" max="10" type="number" />
                </div>
                <div className="scale__description">
                    <p> {options[0].value}</p>
                    <input onChange={this.setDescription} name="0" type="text" className="input scale__input--description" />
                </div>
                <div className="scale__description">
                    <p>{options[1].value}</p>
                    <input onChange={this.setDescription} name="1" type="text" className="input scale__input--description" />
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, props) => {
    return {
        options: elementSelectors.getOptions(state, props.index),
    }
}
export default connect(mapStateToProps, null, null, { pure: false })(Scale);
