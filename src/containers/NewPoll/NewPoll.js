import React, { Component } from 'react';
import './NewPoll.css';

class NewPoll extends Component {

    render() {
        return (
            // <div className="card-list__item card new-poll" onClick={this.props.onShowPopupNewPoll('block')}>
            // <div className="card-list__item card new-poll" onClick={this.props.onShowPopupNewPoll(true)}>
            <div className="card-list__item card new-poll" onClick={this.props.onShowPopupNewPoll}>
                <div className="new-poll__icon"></div>
                <p className="new-poll__title">Создать новый опрос</p>
            </div>
        )
    }
}
export default NewPoll;
