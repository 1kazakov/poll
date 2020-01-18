import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import './Page1.css'
import Header from './Header/Header';
import PollList from './PollList/PollList';
import PollResult from './PollResult/PollResult';
import Entry from './Entry/Entry';
import Sections from './Sections/Sections';


class Page1 extends Component {

    render() {
        // console.log(this.props)
        return (
            <div className="Page1">
                <Header onShowPopupNewPoll={this.onShowPopupNewPoll} />
                <Switch>
                    <Route path="/polls" component={PollList} />
                    <Route path="/results" component={PollResult} />
                    <Route path="/entry" component={Entry} />
                    <Route parh="/sections" component={Sections} />

                </Switch>
            </div>
        )
    }
}

export default Page1;
