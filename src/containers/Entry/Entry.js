import React, { Component } from 'react';
import './Entry.css';

class Entry extends Component {
    setBlock = () => {

    }
    render() {
        return (
            <section className="entry">
                <form className="entry__form" onSubmit={this.setBlock}>
                    <label className="entry__label">
                        <span className="entry__text">Заголовок блока</span>
                        <input type="text" className="input" />
                    </label>
                    <label className="entry__label m20">
                        <span className="entry__text">Подзаголовок блока</span>
                        <textarea className="textarea" rows="2"></textarea>
                    </label>
                    <label className="toggle">
                        <input type="checkbox" className="toggle__checkbox" />
                        <span className="toggle__text">Включить обязательную авторизацию для сотрудников</span>
                    </label>
                    <button type="submit" className="entry__button button">Далее</button>
                </form>
            </section>
        )
    }
}

export default Entry;
