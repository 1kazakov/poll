import React, { Component } from 'react';
import './PollList.css';

import Card from '../Card/Card';
import NewPoll from '../NewPoll/NewPoll';
import PopupNewPoll from '../PopupNewPoll/PopupNewPoll';

class PollList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            popup: false,
        }
    }
    onShowPopupNewPoll = () => {
        this.setState({ popup: true });
    }
    onClosePopupNewPoll = (value) => {
        this.setState({ popup: value });
    }
    render() {
        return (
            <main className="main">
                <div className="main__card-list card-list" >
                    <NewPoll onShowPopupNewPoll={this.onShowPopupNewPoll} />
                    <Card title="Опрос сотрудников по мероприятию" date="28 сентября 2019" />
                    <Card title="На лабутенах и в штанах" date="10 декабря 2019" />
                    <Card title="Заказ одежды для наших сотрудников и прочей тусовки" date="10 декабря 2019" />
                    <Card title="Заказ одежды для наших сотрудников и прочей тусовки" date="10 декабря 2019" />
                </div>
                {this.state.popup ? <PopupNewPoll onClosePopupNewPoll={this.onClosePopupNewPoll} /> : null}
            </main>
        )
    }
}

export default PollList;
