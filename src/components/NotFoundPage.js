import React, { Component } from 'react'
import { Result } from 'antd'


export default class NotFoundPage extends Component {
    render () {
        const resultProps = {
            title: '404',
            subTitle: 'Извините, страницы по такому URL не существует.',
            extra: '',
        };

        return (
            <div>
                <Result status="404" {...resultProps} />
            </div>
        )
    }
}
