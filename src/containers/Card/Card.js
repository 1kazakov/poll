import React, { Component } from 'react';
import './Card.css';
import CardMenu from '../CardMenu/CardMenu';

class Card extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menu: false,
        }
    }
    onShowMenu = (evt) => {
        evt.preventDefault();
        this.setState({ menu: true });
    }
    onCloseMenu = (value) => {
        console.log('state', this.state)
        this.setState({ menu: value });
    }

    render() {
        const { title, date, url } = this.props;
        return (
            <div className="card-list__item card">
                <h3 className="card__title">{title}</h3>
                <p className="card__date">{date}</p>
                <div className="card__avatars"><img src={url} alt="аватар" className="card__avatars" /></div>
                <div className="card__button" onClick={this.onShowMenu}></div>
                {this.state.menu ? <CardMenu visibility={this.state.menu} onCloseMenu={this.onCloseMenu} /> : null}
            </div>
        )
    }
}

export default Card;
