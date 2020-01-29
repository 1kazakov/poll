import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import './Page1.css'
import Header from './Header/Header';
import PollList from './PollList/PollList';
import PollResult from './PollResult/PollResult';
import Entry from './Entry/Entry';
import PullConstructor from './PullConstructor/PullConstructor';
import Preview from './Preview/Preview';


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
                    <Route path="/constructor" component={PullConstructor} />
                    <Route path="/preview" component={Preview} />

                </Switch>
            </div>
        )
    }
}

export default Page1;
