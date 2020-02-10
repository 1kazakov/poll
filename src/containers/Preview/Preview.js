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

import * as elementSelectors from '../../store/elements/reducer';




class Preview extends Component {
    render() {
        let option = new Map();
        option.set('fotoRadio', null);
        // option.set(fotoCheckbox, )
        option.set('scale', null)

        const { poll } = this.props;
        const {
            // title,
            // subtitle,
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
                        option = <PreFullName />
                    } else if (element.name === 'radio') {
                        option = <PreRadio value={element.value} name={element.name} id={element.elementIndex} />
                    } else if (element.name === 'textArea') {
                        option = <PreTextArea name={element.name} id={element.elementIndex} />
                    } else if (element.name === 'address') {
                        option = <PreAddres name={element.name} id={element.elementIndex} />
                    } else if (element.name === 'telephone') {
                        option = <PreTelephone name={element.name} id={element.elementIndex} />
                    } else if (element.name === 'celendar') {
                        option = <PreCelendar name={element.name} id={element.elementIndex} />
                    } else if (element.name === 'checkbox') {
                        option = <PreCheckbox value={element.value} name={element.name} id={element.elementIndex} />
                    } else if (element.name === 'scale') {
                        option = <PreScale name={element.name} id={element.elementIndex} />
                    } else {
                        option = <PreFullName name={element.name} id={element.elementIndex} />
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
    return {
        poll: elementSelectors.getPoll(state),
    }
}

export default connect(mapStateToProps)(Preview);
