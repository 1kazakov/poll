import React, { Component } from 'react';
import './PopupNewPoll.css';
import OutsideAlerter from '../OutsideAlerter/OutsideAlerter';

export default class PopupNewPoll extends Component {
    onAddNewPoll = (evt) => {
        evt.preventDefault();
    }
    render() {
        return (<div className="b-popup">
            <OutsideAlerter onOutside={() => { this.props.onClosePopupNewPoll(false) }}>
                <div className="popup-new-poll">
                    <form className="popup-new-poll__form" onSubmit={this.onAddNewPoll}>
                        <label className="popup-new-poll__wrapper"><h3 className="popup-new-poll__title">Введите название опроса</h3>
                            <input type="text" className="popup-new-poll__input" />
                        </label>
                        <button type="submit" className="popup-new-poll__button button">Создать опрос</button>
                    </form>
                </div>
            </OutsideAlerter>
            <div className="overlay"></div>
        </div>
        )
    }
}
