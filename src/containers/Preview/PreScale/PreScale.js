import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';

import './PreScale.css';

//Сделать другой слайдер из материал дизайна

class Scale extends Component {
    state = {
        value: 5
    }

    setMarks = () => {
        const marks = []
        for (let i = 0; i <= 10; i++) {
            marks.push({ value: i, label: `${i}` });
        }
        return marks
    }

    render() {
        const SimaLandSlider = withStyles({
            root: {
                color: '#1F84DB;',
                height: 2,
                padding: '15px 0',
            },
            thumb: {
                height: 18,
                width: 18,
                backgroundColor: '##1F84DB;',
                // boxShadow: iOSBoxShadow,
                marginTop: -9,
                marginLeft: -5,
                '&:focus,&:hover,&$active': {
                    boxShadow: '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.3),0 0 0 1px rgba(0,0,0,0.02)',
                    // Reset on touch devices, it doesn't add specificity
                    '@media (hover: none)': {
                        // boxShadow: iOSBoxShadow,
                    },
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
            <div>
                <SimaLandSlider
                    defaultValue={5}
                    marks={this.setMarks()}
                    step={1}
                    min={0}
                    max={10}
                />
                {/* <Slider
                    defaultValue={30}
                    // getAriaValueText={valuetext}
                    aria-labelledby="discrete-slider"
                    valueLabelDisplay="auto"
                    step={1}
                    marks={this.setMarks()}
                    min={0}
                    max={10}
                /> */}
            </div>
        )
    }
}

export default Scale;
