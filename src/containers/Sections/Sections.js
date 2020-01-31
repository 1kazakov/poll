import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Sections.css';

import Element from '../Element/Element';
import * as elementActions from '../../store/elements/actions';

class Sections extends Component {
    constructor(props) {
        super(props);
        this.state = {
            elements: {},
            title: '',
            subtitle: '',
        }
    }
    onChange = (evt) => {
        const { index } = this.props;
        this.setState({ [evt.target.name]: evt.target.value });
        this.props.dispatch(elementActions.setSectionTitle({index: index, title: this.state.title, subtitle: this.state.subtitle}));
    }
    addElement = (evt) => {
        evt.preventDefault();
        let { elements } = this.state;
        const { index } = this.props;
        const key = Object.keys(elements).length + 2;
        elements[key] = { element: <Element key={key} index={String(index) + key} /> };
        this.setState({ elements: elements });
        this.props.dispatch(elementActions.addElement({ elementIndex: String(index) + key, name: 'fullName' }))
    }
    render() {
        const { elements } = this.state;
        const { index } = this.props;
        // const keys = Object.keys(elements).length + 1;
        let out = [];
        for (let key in elements) {
            out.push(elements[key].element)
        }
        return (
            <section className="entry">
                <form className="entry__form" onSubmit={this.setBlock}>
                    <label className="entry__label">
                        <span className="entry__text">Заголовок блока</span>
                        <input name="title" type="text" className="input" value={this.state.title} onChange={this.onChange} />
                    </label>
                    <label className="entry__label m20">
                        <span className="entry__text">Подзаголовок блока</span>
                        <input name="subtitle" type="text" className="input" value={this.state.subtitle} onChange={this.onChange} />
                    </label>
                    <p className="section__text--gray">Элементы</p>
                    <Element index={String(index) + 1} />

                    {out}
                    <button className="button" onClick={this.addElement}>Добавить еще элемент в блок</button>
                </form>
            </section>
        )
    }
}

const mapStateToProps = () => {
    return {

    }
}

export default connect(mapStateToProps)(Sections);
