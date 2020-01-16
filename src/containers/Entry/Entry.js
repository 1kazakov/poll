import React, { Component } from 'react';
import './Entry.css';

class Entry extends Component {
    setBlock = ()=> {
        
    }
    render() {
        return (
            <div className="entry">
                <form className="entry__form" onSubmit={this.setBlock}>
                    <label className="entry__label">
                        <span className="entry__text">Заголовок блока</span>
                        <input type="text" className="input" />
                    </label>
                    <label className="entry__label m20">
                        <span className="entry__text">Подзаголовок блока</span>
                        <textarea className="textarea" rows="2"></textarea>
                    </label>
                    <label className="entry__label entry__label--center">
                        <input type="checkbox" className="entry__authorization" />
                        <span className="entry__text entry__text--center">Включить обязательную авторизацию для сотрудников</span>
                    </label>
                    <button type="submit" className="entry__button button">Далее</button>
                </form>
            </div>
        )
    }
}

export default Entry;
