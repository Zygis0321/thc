import React, { Component } from 'react';
import { BrowserRouter as Router, HashRouter } from 'react-router-dom';
import { Route } from 'react-router';
import logo from './logo.svg';
import './App.css';
import { Home } from './components/home';





export default class App extends Component {
  static displayName = App.name;
  
  render () {
    return (
      <HashRouter>
        <Route exact path='/' component={Home} />
      </HashRouter>
    );
  }
}
