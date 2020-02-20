import React, { Component } from 'react';
import { connect } from 'react-redux';
import DataPicker from 'react-datepicker';
import ru from 'date-fns/locale/ru';

import 'react-datepicker/dist/react-datepicker.css';
import './PreCelendar.css';

import * as resultAction from '../../../store/results/actions';
import * as resultSelectors from '../../../store/results/reducer';

class PreCelendar extends Component {
    setAnswer = (answer) => {
        const { id, position } = this.props;
        this.props.dispatch(resultAction.setAnswer({ elementIndex: id, position, answer }));
    }
    render() {
        const { element } = this.props;
        const { answer = new Date() } = element;
        return (
            <div className="celendar">
                <DataPicker
                    className="input celendar__input"
                    selected={answer}//посмотреть, нужно ли менять формат даты?
                    locale={ru}
                    showYearDropdown
                    dateFormatCalendar="MMMM"
                    yearDropdownItemNumber={100}
                    scrollableYearDropdown
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

export default connect(mapStateToProps, null, null, { pure: false })(PreCelendar);
