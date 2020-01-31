import React, { Component } from 'react';
import { connect } from 'react-redux';
import './PullConstructor.css';

import Sections from '../Sections/Sections';
import * as elementActions from '../../store/elements/actions';

class PullConstructor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            section: {}
        }
    }
    addSection = (evt) => {
        evt.preventDefault()
        let section = this.state.section
        const index = Object.keys(section).length + 1;
        console.log('index', index)
        // let index = Object.keys(section).length + 1;
        // index = String(index) + 1;
        section[index] = { section: <Sections key={index} index={index} /> };
        this.setState({ section: section });
        this.props.dispatch(elementActions.addSection([{ index: index, title: '', subtitle: '' }, { elementIndex: String(index) + 1, name: 'fullName' }]))
    }
    render() {
        const { section } = this.state;
        let out = [];
        for (let key in section) {
            out.push(section[key].section)
        }
        return (
            <div>
                <div className="pull-constructor__controls">
                    <button className="pull-constructor__button-add" onClick={this.addSection}></button>
                </div>
                <Sections key={0} index={0} />
                {out}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {

    }
}

export default connect(mapStateToProps)(PullConstructor);
