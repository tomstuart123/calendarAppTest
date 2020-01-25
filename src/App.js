import React, { Component } from 'react';
import Calendar from './Calendar'
import './App.css';

class App extends Component {
  constructor() {
    super()
    this.state = {}
  }
  render() {
    return (
      <div className="App wrapper">
        <Calendar />
        </div>
    );
  }
}

export default App;
