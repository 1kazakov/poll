import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Sections.css';

import Element from '../Element/Element';
import * as elementActions from '../../store/elements/actions';
import * as elementSelectors from '../../store/elements/reducer';

class Sections extends Component {
    // constructor(props) {
    //     super(props);
    // }
    onChange = (evt) => {
        const { index } = this.props;
        this.props.dispatch(elementActions.setSectionTitle({ index: index, [evt.target.name]: evt.target.value }));
    }
    addElement = (evt) => {
        evt.preventDefault();
        let { elements, index } = this.props;
        [elements] = elements;
        const subindex = elements.length;
        this.props.dispatch(elementActions.addElement({ elementIndex: String(index) + subindex, name: 'fullName', question: 'Введите вопрос', required: false }))
    }
    render() {
        let { elements, index } = this.props;
        [elements] = elements;
        const title = elements[0].title;
        const subtitle = elements[0].subtitle;
        const out = [];
        for (let i = 1; i < elements.length; i++) {
            out.push(<Element index={String(index) + i} />)
        }


        return (
            <section className="entry">
                <form className="entry__form" onSubmit={this.setBlock}>
                    <label className="entry__label">
                        <span className="entry__text">Заголовок раздела</span>
                        <input name="title" type="text" className="input" value={title} onChange={this.onChange} />
                    </label>
                    <label className="entry__label m20">
                        <span className="entry__text">Подзаголовок раздела</span>
                        <input name="subtitle" type="text" className="input" value={subtitle} onChange={this.onChange} />
                    </label>
                    <p className="section__text--gray">Элементы</p>
                    {out}
                    <button className="button" onClick={this.addElement}>Добавить еще элемент в блок</button>
                </form>
            </section>
        )
    }
}

const mapStateToProps = (state, props) => {
    return {
        elements: elementSelectors.getElements(state, props.index)
    }
}

export default connect(mapStateToProps)(Sections);
