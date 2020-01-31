import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Entry.css';

import * as elementActions from '../../store/elements/actions';

class Entry extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            subtitle: '',
        }
    }
    onChange = (evt) => {
        evt.preventDefault();
        this.setState({ [evt.target.name]: evt.target.value });
    }
    addPoll = () => {
        this.props.history.push('/constructor');
        this.props.dispatch(elementActions.addPoll({ title: this.state.title, subtitle: this.state.subtitle }));
        this.props.dispatch(elementActions.addSection([{ index: 0, title: '', subtitle: '' }, { elementIndex: String(0) + 1, name: 'fullName' }]))
    }

    render() {
        console.log(this.props.history)
        return (
            <section className="entry">
                <form className="entry__form" onSubmit={this.addPoll}>
                    <label className="entry__label">
                        <span className="entry__text">Заголовок блока</span>
                        <input name="title" type="text" className="input" value={this.state.title} onChange={this.onChange} />
                    </label>
                    <label className="entry__label m20">
                        <span className="entry__text">Подзаголовок блока</span>
                        <textarea name="subtitle" className="textarea" rows="2" value={this.state.subtitle} onChange={this.onChange}></textarea>
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

const mapStateToProps = (state) => {
    return {
        // history: state.router,
    }
}

export default connect(mapStateToProps)(Entry);
