import React, { Component } from 'react';
import { Link } from "react-router-dom";
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
                <div className="header__bottom">
                    <nav className="header__nav nav">
                        <Link to="/poll" className="nav__link nav__link--active">Опросы</Link>
                        <Link to="/result" className="nav__link">Результаты</Link>
                    </nav>
                </div>
            </header>
        )
    }
}

export default Header;
