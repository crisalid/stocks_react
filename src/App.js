import React, { Component } from 'react';
import './App.css';

import LiveStock from './LiveStock';
import { Provider } from 'react-redux';

// Store for LiveStock app
import store from './LiveStock/store';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Live Stocks</h1>
        </header>
        <Provider store={store}>
          <LiveStock />
        </Provider>
      </div>
    );
  }
}

export default App;
