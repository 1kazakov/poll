import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';

import Nav from '../Nav/Nav';
import './Header.css';

class Header extends Component {
    render() {
        const { path } = this.props
        return (
            <header className="header">
                <div className="header__top">
                    <div className="header__logo"></div>
                    <h1 className="header__title">Опросы Сима-ленд</h1>
                    {path === '/constructor' ? <Link to="/preview" className="header__preview">Предпросмотр</Link> : null}
                    <button className="header__button button" onClick={this.props.onShowPopupNewPoll}>Создать опрос</button>
                    <div className="header__avatar"></div>
                </div>
                <Nav />
            </header>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        path: state.router.location.pathname,
    }
}

export default connect(mapStateToProps)(Header);
