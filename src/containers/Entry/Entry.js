import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Entry.css';

import * as elementActions from '../../store/elements/actions';
import * as elementSelectors from '../../store/elements/reducer';

class Entry extends Component {
    constructor(props) {
        super(props);
        this.state = {
            warning: null,
        }
    }
    onChange = (evt) => {
        evt.preventDefault();
        this.props.dispatch(elementActions.addPoll({ [evt.target.name]: evt.target.value }));
    }
    addPoll = (evt) => {
        evt.preventDefault();
        const { title } = this.props;
        if (title === null || title.trim() === '') {
            this.setState({ warning: <div className="warning">Введите название опроса</div> })
        } else {
            this.setState({ warning: null })
            this.props.history.push('/constructor');
            this.props.dispatch(elementActions.addSection([{ index: 0, title: 'Заголовок раздела', subtitle: '', counter: 1, position: 0 }, { elementIndex: '0001', name: 'fullName', question: 'Введите вопрос', required: false, position: 1 }]))
        }
    }

    render() {
        const { title, subtitle } = this.props;
        const { warning } = this.state;
        return (
            <section className="entry">
                <form className="entry__form" onSubmit={this.addPoll}>
                    <label className="entry__label">
                        <span className="entry__text">Название опроса</span>
                        <input name="title" type="text" className="input" value={title} onChange={this.onChange} />
                    </label>
                    <label className="entry__label m20">
                        <span className="entry__text">Подзаголовок опроса</span>
                        <textarea name="subtitle" className="textarea" rows="2" value={subtitle} onChange={this.onChange}></textarea>
                    </label>
                    <label className="toggle">
                        <input type="checkbox" className="toggle__checkbox" />
                        <span className="toggle__text">Включить обязательную авторизацию для сотрудников</span>
                    </label>
                    <button type="submit" className="entry__button button">Далее</button>
                    {warning}
                </form>
            </section>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        title: elementSelectors.getPollTitle(state),
        subtitle: elementSelectors.getPollSubtitle(state),
    }
}

export default connect(mapStateToProps)(Entry);
