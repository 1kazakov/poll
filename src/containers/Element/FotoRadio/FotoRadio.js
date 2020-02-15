import React, { Component } from 'react';
import { connect } from 'react-redux';
import './FotoRadio.css';

import * as elementActions from '../../../store/elements/actions';
import * as elementSelectors from '../../../store/elements/reducer';

class FotoRadio extends Component {
    //Сделать обработку ошибок при загрузке файла
    constructor(props) {
        super(props);
        this.state = {
            warning: null
        }
    }

    deleteOption = (evt) => {
        evt.preventDefault();
        const { index, position } = this.props;
        this.props.dispatch(elementActions.addOptionRadio({ elementIndex: index, position, optionIndex: evt.target.name, value: null }))
    }
    addOption = (evt) => {
        evt.preventDefault();
        const { counter, index, position } = this.props;
        this.props.dispatch(elementActions.addOptionRadio({ elementIndex: index, position, optionIndex: counter, value: { description: '', url: null } }))
    }
    setOptionFoto = (evt) => {
        evt.preventDefault();
        const { index, position } = this.props;
        this.props.dispatch(elementActions.addOptionRadio({ elementIndex: index, position, optionIndex: evt.target.name, value: { description: evt.target.value } }))
    }
    setUrlImg = (evt) => {
        evt.preventDefault();
        try {
            const { index, position } = this.props;
            const { name } = evt.target;
            const optionIndex = Number(name.substr(3, 2));
            const file = this[name].current.files[0];
            // if (file.type === 'image/jpeg' || file.type === 'image/png')
            console.log('file.type', file.type)
            let reader = new FileReader();
            reader.onload = (event) => {
                this.props.dispatch(elementActions.addOptionRadio({ elementIndex: index, position, optionIndex, value: { url: event.target.result } }))
            }

            reader.onerror = (event) => {
                console.log("ошибка", event)
                this.setState({ warning: <div><p>Что-то пошло не так!</p><p>Попрбуйте еще раз загрузить картинку!</p></div> })
                setTimeout(this.setState({ warning: null }), 2000)
            }

            reader.readAsDataURL(file);
        } catch (error) {
            console.log("ошибка", error)
            this.setState({ warning: <div><p>Что-то пошло не так!</p><p>Попрбуйте еще раз загрузить картинку!</p></div> })
            setTimeout(this.setState({ warning: null }), 2000)
        }

    }
    deleteImg = (evt) => {
        evt.preventDefault();
        const { index, position } = this.props;
        this.props.dispatch(elementActions.addOptionRadio({ elementIndex: index, position, optionIndex: evt.target.name, value: { url: null } }))
    }
    render() {

        const { options } = this.props;
        //Создаю рефы для отслеживания инпутов (возможно костыль)
        for (let i = 0; i < options.length; i++) {
            this['ref' + i] = React.createRef();
        }
        const out = [];
        for (let i = 0; i < options.length; i++) {
            if (options[i] !== null && options[i] !== undefined) {
                if (options[i].url === null) {
                    out.push(<div className={`foto-radio__wrapper ${this.props.class}`} key={i}>
                        <input type="text" name={i} onChange={this.setOptionFoto} value={options[i].description} className="foto-radio__input input" />
                        <label className="foto-radio__label-file button--add-img">
                            <input type="file" ref={this['ref' + i]} name={'ref' + i} onChange={this.setUrlImg} className="foto-radio__file" />
                        </label>
                        <button name={i} className="foto-radio__button--del button--del" onClick={this.deleteOption}></button>
                    </div>)
                } else {
                    out.push(<div className="foto-radio__wrapper foto-radio__wrapper--img" key={i}>
                        <input type="text" name={i} onChange={this.setOptionFoto} value={options[i].description} className="foto-radio__input foto-radio__input--img input" />
                        <div className="foto-radio__img-wrapper">
                            <img className="foto-radio__img" src={options[i].url} alt={options[i].description} />
                        </div>
                        <button name={i} className="foto-radio__button--del button--del foto-radio__button__img" onClick={this.deleteImg}></button>

                        <button name={i} className="foto-radio__button--del button--del" onClick={this.deleteOption}></button>
                    </div >)
                }
            }
        }
        return (
            <div className="foto-radio">
                {out}
                {this.state.warning}
                <button onClick={this.addOption} className="buttom--text foto-radio__buttom--text">Добавить ещё вариант</button>
            </div>
        )
    }
}

const mapStateToProps = (state, props) => {
    return {
        options: elementSelectors.getOptions(state, props.index),
        counter: elementSelectors.getCounter(state, props.position, props.index),
    }
}

export default connect(mapStateToProps, null, null, { pure: false })(FotoRadio);
