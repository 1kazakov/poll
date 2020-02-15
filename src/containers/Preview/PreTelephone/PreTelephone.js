import React, { Component } from 'react';
import { connect } from 'react-redux';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

import * as resultAction from '../../../store/results/actions';
import * as resultSelectors from '../../../store/results/reducer';

import './PreTelephone.css';

class PreTelephone extends Component {
    setAnswer = (phone) => {
        const { id, position } = this.props;
        this.props.dispatch(resultAction.setAnswer({ elementIndex: id, position, answer: phone }))
    }
    render() {
        const { element } = this.props;
        const { answer } = element;
        return (
            <div className="pre-telephone">
                <PhoneInput
                    country='ru'
                    onlyCountries={['ru', 'kz', 'ua', 'by']}
                    value={answer}
                    onChange={this.setAnswer}
                // inputProps={{
                //     disableCountryCode: true,
                //     countryCodeEditable: false,
                // disableAreaCodes: true,
                // }}
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

export default connect(mapStateToProps, null, null, { pure: false })(PreTelephone);
