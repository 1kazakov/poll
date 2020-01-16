import React, { Component } from 'react';

import './CardMenu.css';
import OutsideAlerter from '../OutsideAlerter/OutsideAlerter'

export default class CardMenu extends Component {
    // constructor(props) {
    //     super(props);
    // }

    onClickMenu = () => {
        console.log(1)
    }

    render() {
        return (<div className="b-popup">
            <OutsideAlerter onOutside={() => { this.props.onCloseMenu(false) }}>
                <ul className="card__actions-list" style={{ display: this.props.visibility }}>
                    <li className="card__action rename" onClick={this.onClickMenu} key="rename">Переименовать</li>
                    <li className="card__action delete" onClick={this.onClickMenu} key="delete">Удалить опрос</li>
                    <li className="card__action open" onClick={this.onClickMenu} key="open">Открыть в новой вкладке</li>
                </ul>
            </OutsideAlerter>
        </div>)
    }
}
