import React, { Component } from 'react';

import Nav from '../Nav/Nav';
import './Header.css';

class Header extends Component {
    render() {
        return (
            <header className="header">
                <div className="header__top">
                    <div className="header__logo"></div>
                    <h1 className="header__title">Опросы Сима-ленд</h1>
                    <button className="header__button button" onClick={this.props.onShowPopupNewPoll}>Создать опрос</button>
                    <div className="header__avatar"></div>
                </div>
                <Nav />
            </header>
        )
    }
}

export default Header;
