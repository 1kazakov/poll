import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { trimStart } from 'lodash';

import './Nav.css';
import * as elementSelectors from '../../store/elements/reducer';

class Nav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stylePolls: {},
            styleResult: {}
        }
    }
    render() {
        const { path, section } = this.props;
        const pathname = trimStart(this.props.path, '/');
        const links = {
            polls: { name: 'Опросы', style: {} },
            results: { name: 'Результаты', style: {} },
            entry: { name: 'Точка входа', style: {} },
            constructor: { name: 'Разделы', style: {} },
            end: { name: 'Завершение', style: {} },
        }
        let linksArr = [];
        for (let key in links) {
            if (key === pathname) {
                links[key].style = { color: '#212121', borderBottom: '2px solid  #1F84DB' }
            }
        }
        for (let link in links) {
            const to = "/" + link;
            linksArr.push(<Link key={link} to={to} disabled className="nav__link" style={links[link].style}>{links[link].name}</Link>)
        }
        const out = [];
        if (path === '/polls' || path === '/results') {
            for (let i = 0; i < 2; i++) {
                out.push(linksArr[i]);
            }
        } else if (path === '/entry' && section === undefined) {
            for (let i = 2; i < 3; i++) {
                out.push(linksArr[i]);
            }
        } else {
            for (let i = 2; i < linksArr.length; i++) {
                out.push(linksArr[i]);
            }
        }

        return (
            <div className="header__bottom">
                <nav className="header__nav nav">
                    {out}
                </nav>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        path: state.router.location.pathname,
        section: elementSelectors.getSection(state),
    }
}
export default connect(mapStateToProps)(Nav);
