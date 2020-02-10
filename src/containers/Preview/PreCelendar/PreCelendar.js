import React, { Component } from 'react';
import DataPicker from 'react-datepicker';
import ru from 'date-fns/locale/ru';

import 'react-datepicker/dist/react-datepicker.css';
import './PreCelendar.css';

class PreCelendar extends Component {
    state = {
        startDate: new Date(),
    }
    render() {
        return (
            <div className="celendar">
                <DataPicker
                    className="input celendar__input"
                    selected={this.state.startDate}
                    locale={ru}
                    showYearDropdown
                    dateFormatCalendar="MMMM"
                    yearDropdownItemNumber={100}
                    scrollableYearDropdown
                // onChange={this.hendler}
                />
            </div>
        )
    }
}

export default PreCelendar;
