import React, { Component } from 'react';
import './Sections.css';

import Element from '../Element/Element';

class Sections extends Component {
    constructor(props) {
        super(props);
        this.state = {
            elements: {},
        }
    }
    addElement = (evt) => {
        evt.preventDefault();
        let elements = this.state.elements
        elements[Object.keys(elements).length] = { element: <Element key={Object.keys(elements).length} /> };
        this.setState({ elements: elements });
    }
    render() {
        const { elements } = this.state;
        let out = [];
        for (let key in elements) {
            out.push(elements[key].element)
        }

        return (
            <section className="entry">
                <form className="entry__form" onSubmit={this.setBlock}>
                    <label className="entry__label">
                        <span className="entry__text">Заголовок блока</span>
                        <input type="text" className="input" />
                    </label>
                    <label className="entry__label m20">
                        <span className="entry__text">Подзаголовок блока</span>
                        <input type="text" className="input" />
                    </label>
                    <p className="section__text--gray">Элементы</p>
                    <Element />

                    {out}
                    <button className="button" onClick={this.addElement}>Добавить еще элемент в блок</button>
                </form>
            </section>
        )
    }
}

export default Sections;
