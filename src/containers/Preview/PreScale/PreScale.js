import React, { Component } from 'react';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';

import './PreScale.css';

import * as resultSelectors from '../../../store/results/reducer';
import * as resultActions from '../../../store/results/actions';

class Scale extends Component {
    state = {
        value: 5
    }

    setMarks = () => {
        const { value } = this.props;
        const marks = []
        for (let i = +value[0].value; i <= +value[1].value; i++) {
            marks.push({ value: i, label: `${i}` });
        }
        return marks
    }
    setAnswer = (evt, value) => {
        const { id, position } = this.props;
        this.props.dispatch(resultActions.setAnswer({ elementIndex: id, position, answer: value }));
    }

    render() {
        const { element, value } = this.props;
        let { answer } = element;
        if (answer === '') {
            answer = 5
        }
        const SimaLandSlider = withStyles({
            root: {
                color: '#1F84DB;',
                height: 2,
                padding: '15px 0',
                margin: '0 20px 0 10px',
                width: 'calc(100% - 30px)',
            },
            thumb: {
                height: 18,
                width: 18,
                backgroundColor: '##1F84DB;',
                marginTop: -9,
                marginLeft: -5,
                '&:focus,&:hover,&$active': {
                    boxShadow: '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.3),0 0 0 1px rgba(0,0,0,0.02)',

                },
            },
            active: {},
            valueLabel: {
                left: 'calc(-50% + 11px)',
                top: -22,
                '& *': {
                    background: 'transparent',
                    color: '#000',
                },
            },
            track: {
                height: 2,
            },
            rail: {
                height: 2,
                opacity: 0.5,
                backgroundColor: '#AFB8BB',
            },
            mark: {
                backgroundColor: '#AFB8BB',
                height: 8,
                width: 8,
                marginTop: -3,
                borderRadius: '50%',
            },
            markActive: {
                opacity: 1,
                backgroundColor: 'currentColor',
            },
            markLabel: {
                marginLeft: '3px',
                color: '#AFB8BB',
            },
        })(Slider);

        return (
            <div className="pre-scale">
                <div className="pre-scale__wrapper-description">
                    <p className="pre-scale__description description--min">{value[0].description}</p>
                    <p className="pre-scale__description description--max" >{value[1].description}</p>
                </div>
                <SimaLandSlider
                    value={answer}
                    marks={this.setMarks()}
                    step={1}
                    min={+value[0].value}
                    max={+value[1].value}
                    onChange={this.setAnswer}
                />
            </div>
        )
    }
}

const mapStateToProps = (state, props) => {
    return {
        element: resultSelectors.getElement(state, props.id, props.position)
    }
}

export default connect(mapStateToProps, null, null, { pure: false })(Scale);
