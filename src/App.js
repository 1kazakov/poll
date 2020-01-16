import React, {Component} from 'react';
import { Route, Switch } from 'react-router-dom';
import Page1 from './containers/Page1';






class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route peth="/" component={Page1} />
        {/* <Page1 /> */}
      </Switch>
    )
  }
}

export default App;
