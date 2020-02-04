import React, { Component } from 'react';
import './FotoRadio.css';

class FotoRadio extends Component {
    constructor(props) {
        super(props);
        this.state = {
            foto: [],
            value: [{ index: 0, value: '' }],
            counter: 0,
        }
    }
    setOptionFoto = (evt) => {
        evt.preventDefault();
        let values = this.state.value.slice();
        values = values.filter(element => element.index != evt.target.name);// eslint-disable-line
        values = values.concat({
            value: evt.target.value,
            index: Number(evt.target.name)
        });
        values.sort((a, b) => {
            return a.index - b.index
        });
        this.setState({ value: values });
        // this.props.dispatch(elementActions.addOptionRadio({ elementIndex: this.props.index, indexOption: evt.target.name, value: evt.target.value }))
    }
    addImg = (evt) => {
        evt.preventDefault();
        let out = this.state.foto.slice();
        let values = this.state.value.slice();
        let index = this.state.counter + 1;
        values = values.concat({ value: '', index: index })
        out = out.concat({
            input: <div className="foto-radio__wrapper">
                <input type="text" value={this.state.title} onChange={this.onChange} className="foto-radio__input input" />
                <label className="foto-radio__label-file button--add-img">
                    <input type="file" className="foto-radio__file" />
                </label>
                <button className="foto-radio__button--del button--del"></button>
            </div>,
            index: index,
        });
        out.sort((a, b) => {
            return Number(a.index) - Number(b.index)
        });
        this.setState({ foto: out, counter: index, value: values });
    }
    setUrlImg = (file) => {
        let reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = () => {
            let url = reader.result;
            console.log('url', url)
            // document.getElementById('gallery').appendChild(img)
        }
    }
    render() {
        const { foto } = this.state;
        let out = [];

        for (let element of foto) {
            let { input } = element;
            out.push(input);
        }
        return (
            <div className="foto-radio">
                <div className="foto-radio__wrapper">
                    <input type="text" name='0' onChange={this.setOptionFoto} value={this.state.value[0].value} className="foto-radio__input input" />
                    <label className="foto-radio__label-file button--add-img">
                        <input type="file" onChange={this.setUrlImg} className="foto-radio__file" />
                    </label>
                    <button className="foto-radio__button--del button--del"></button>
                </div>
                {out}
                <button onClick={this.addImg} className="buttom--text foto-radio__buttom--text">Добавить ещё вариант</button>
            </div>
        )
    }
}
export default FotoRadio;
