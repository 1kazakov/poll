import React, { Component } from 'react';
import './PollResult.css';

import Card from '../Card/Card';

class PollResult extends Component {

    render() {
        return (
            <main className="main">
                <div className="main__card-list card-list" >
                    <Card title="Опрос сотрудников по мероприятию" date="28 сентября 2019" />
                    <Card title="На лабутенах и в штанах" date="10 декабря 2019" />
                    <Card title="Заказ одежды для наших сотрудников и прочей тусовки" date="10 декабря 2019" />
                    <Card title="Заказ одежды для наших сотрудников и прочей тусовки" date="10 декабря 2019" />
                </div>
            </main>
        )
    }
}

export default PollResult;
