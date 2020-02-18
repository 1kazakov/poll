import React, { Component } from 'react';
import { connect } from 'react-redux';

import './PreFotoRadio.css';

import * as resultAction from '../../../store/results/actions';
import * as resultSelectors from '../../../store/results/reducer';

class PreFotoRadio extends Component {
    setAnswer = (evt) => {
        const { id, position } = this.props;
        this.props.dispatch(resultAction.setAnswer({ elementIndex: id, position, answer: evt.target.value }))
    }
    render() {
        const { value, name, id } = this.props;
        let out = [];
        for (let i = 0; i < value.length; i++) {
            if (value[i] !== null && value[i] !== undefined) {
                let style;
                if ((i + 1) % 3 === 0) { style = { marginRight: 0 } };
                out = out.concat(
                    <div className="pre-foto-radio__card" style={style}>
                        <label className="pre-foro-radio__label" key={value[i].description}>
                            <div className="pre-foto-radio__wrapper-img">
                                <img className="pre-foto-radio__img" src={value[i].url} alt={value[i].description} />
                            </div>
                            <input onChange={this.setAnswer} name={name + id} type="radio" value={value[i].description} className="pre-foro-radio__input" />
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

const mapStateToProps = (state, props) => {
    return {
        element: resultSelectors.getElement(state, props.id, props.position)
    }
}

export default connect(mapStateToProps, null, null, { pure: false })(PreFotoRadio);
