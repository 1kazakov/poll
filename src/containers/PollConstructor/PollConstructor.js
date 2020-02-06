import React, { Component } from 'react';
import { connect } from 'react-redux';
import './PollConstructor.css';

import Sections from '../Sections/Sections';
import * as elementActions from '../../store/elements/actions';
import * as elementSelectors from '../../store/elements/reducer';

class PollConstructor extends Component {
    // constructor(props) {
    //     super(props);
    // }
    shouldComponentUpdate() {
        return true;
    }
    addSection = (evt) => {
        evt.preventDefault()
        const { sections } = this.props;
        const index = sections.length;
        this.props.dispatch(elementActions.addSection([{ index: index, title: 'Загловок раздела', subtitle: '', counter: 1 }, { elementIndex: String(index) + 1, name: 'fullName', question: 'Введите вопрос', required: false, position:  1}]))
    }
    render() {
        let out = [];
        const { sections } = this.props;
        for (let section of sections) {
            out.push(<Sections key={section[0].index} index={section[0].index} />)
        }
        return (
            <div>
                <div className="poll-constructor__controls">
                    <button className="poll-constructor__button-add" onClick={this.addSection}></button>
                </div>
                {out}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        //Если убрать следующую строку то элемент не обновляется, не знаю почему!!! возможно потому что нет глубокой проверки пропсов
        state: state,
        sections: elementSelectors.getSection(state),
    }
}

export default connect(mapStateToProps)(PollConstructor);
