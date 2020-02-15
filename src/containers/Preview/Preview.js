import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Preview.css';

import PreFullName from './PreFullName/PreFullName';
import PreRadio from './PreRadio/PreRadio';
import PreTextArea from './PreTextArea/PreTextArea';
import PreAddres from './PreAddres/PreAddres';
import PreTelephone from './PreTelephone/PreTelephone';
import PreCelendar from './PreCelendar/PreCelendar';
import PreCheckbox from './PreCheckbox/PreCheckbox';
import PreScale from './PreScale/PreScale';
import PreFotoRadio from './PreFotoRadio/PreFotoRadio';
import PreFotoCheckbox from './PreFotoCheckbox/PreFotoCheckbox';

import * as elementSelectors from '../../store/elements/reducer';
import * as resultActions from '../../store/results/actions';


class Preview extends Component {
    constructor(props) {
        super(props);
        this.props.dispatch(resultActions.setResult(this.props.poll))

    }
    componentDidMount() {
        // this.props.dispatch(resultActions.setResult(this.props.poll))
    }
    render() {
        // console.log('props', this.props.getState())

        let option = new Map();

        const { poll } = this.props;
        const {
            section } = poll;
        let out = [];
        for (let elements of section) {
            let elementOut = [];
            for (let element of elements) {
                if (element.index !== undefined) {
                    let option = null;// eslint-disable-line
                    elementOut = elementOut.concat(<section className="preview__block preview__block--title">
                        <div className="preview__label">Раздел {element.index + 1}  из {section.length}</div>
                        <h3 className="preview__title">{element.title}</h3>
                        <p className="preview__subtitle">{element.subtitle}</p>
                    </section>)
                } else {
                    if (element.name === 'fullName') {
                        option = <PreFullName name={element.name} id={element.elementIndex} position={element.position} />
                    } else if (element.name === 'radio') {
                        option = <PreRadio value={element.value} name={element.name} id={element.elementIndex} position={element.position} />
                    } else if (element.name === 'textArea') {
                        option = <PreTextArea name={element.name} id={element.elementIndex} position={element.position} />
                    } else if (element.name === 'address') {
                        option = <PreAddres name={element.name} id={element.elementIndex} position={element.position} />
                    } else if (element.name === 'telephone') {
                        option = <PreTelephone name={element.name} id={element.elementIndex} position={element.position} />
                    } else if (element.name === 'celendar') {
                        option = <PreCelendar name={element.name} id={element.elementIndex} position={element.position} />
                    } else if (element.name === 'checkbox') {
                        option = <PreCheckbox value={element.value} name={element.name} id={element.elementIndex} position={element.position} />
                    } else if (element.name === 'scale') {
                        option = <PreScale name={element.name} id={element.elementIndex} position={element.position} />
                    } else if (element.name === 'fotoRadio') {
                        option = <PreFotoRadio value={element.value} name={element.name} id={element.elementIndex} position={element.position} />
                    } else if (element.name === 'fotoCheckbox') {
                        option = <PreFotoCheckbox value={element.value} name={element.name} id={element.elementIndex} position={element.position} />
                    } else {
                        console.log('таких элементов нет')
                        // option = <PreFullName name={element.name} id={element.elementIndex} />
                    }
                    elementOut = elementOut.concat(<section className="preview__block">
                        <h3 className="preview__title">{element.question}</h3>
                        {option}
                    </section>
                    )
                }
            }
            out = out.concat(...elementOut);
        }


        // out = out.concat(<section className="entry"></section>)

        console.log(poll)
        console.log('out', out)

        return (
            <form>
                {out}
            </form>
        )
    }
}

const mapStateToProps = (state) => {
    console.log('state', state)
    // console.log('store', store)

    return {
        poll: elementSelectors.getPoll(state),
    }
}

export default connect(mapStateToProps)(Preview);
