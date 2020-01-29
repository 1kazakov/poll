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
        }
    }
    addElement = (evt) => {
        evt.preventDefault();
        let { elements } = this.state;
        const { index } = this.props;
        const key = Object.keys(elements).length + 1;
        elements[key] = { element: <Element key={key} index={index} /> };
        this.setState({ elements: elements });
        this.props.dispatch(elementActions.addElement({ elementIndex: String(index) + key, name: 'fullName' }))
    }
    render() {
        const { elements } = this.state;
        let { index } = this.props;
        let key = Object.keys(elements).length + 1
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
                    <Element index={String(index) + key} />

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
