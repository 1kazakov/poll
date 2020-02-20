import React, { Component } from 'react';
import { connect } from 'react-redux';
import './PollList.css';

import Card from '../Card/Card';
import NewPoll from '../NewPoll/NewPoll';
// import PopupNewPoll from '../PopupNewPoll/PopupNewPoll';
import * as elementActions from '../../store/elements/actions';

class PollList extends Component {
    onShowPopupNewPoll = () => {
        this.props.history.push('/entry');
        this.props.dispatch(elementActions.addPoll({ title: null, subtitle: null }));

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
                {/* {this.state.popup ? <PopupNewPoll onClosePopupNewPoll={this.onClosePopupNewPoll} /> : null} */}
            </main>
        )
    }
}
const mapStateToProps = (state) => {
    return {

    }
}

export default connect(mapStateToProps)(PollList);
