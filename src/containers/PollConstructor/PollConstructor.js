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
        const sectionIndex = sections.length;
        let elementIndex = sectionIndex
        if (elementIndex < 10) {
            elementIndex = '0' + sectionIndex;
        }
        this.props.dispatch(elementActions.addSection([{ index: sectionIndex, title: 'Загловок раздела', subtitle: '', counter: 1, position: sectionIndex }, { elementIndex: elementIndex + '01', name: 'fullName', question: 'Введите вопрос', required: false, position: 1 }]))
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
        // state: state,
        sections: elementSelectors.getSection(state),
    }
}

export default connect(mapStateToProps, null, null, { pure: false })(PollConstructor);
