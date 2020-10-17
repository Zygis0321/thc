import React, { Component } from 'react';
import { BrowserRouter as Router, HashRouter } from 'react-router-dom';
import { Route } from 'react-router';
import logo from './logo.svg';
import './App.css';
import { Home } from './components/home';
import playersService, { Player } from './services/player-service';
import { AnyAction, Dispatch } from 'redux';
import { updatePlayers } from './store/players/player-actions';
import { connect } from 'react-redux';
import $ from "jquery";
import { Progress } from './components/progress';

type Props = ReturnType<typeof mapDispatchToProps> 

class AppComponent extends Component<Props, {}> {
  
  componentDidMount(): void{
    $.ajax('https://serene-crag-74633.herokuapp.com/all')
      .then(res => {
          const players:Player[] =  playersService.parseContent(res)
          this.props.updatePlayers(players)
      })
      .catch(() => {
          console.log("error")
      })
  }
  
  static displayName = AppComponent.name;
  
  render () {
    return (
      <HashRouter>
        <Route exact path='/' component={Home} />
        <Route exact path='/progress' component={Progress} />
      </HashRouter>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) =>({
  updatePlayers: (players: Player[]) => dispatch(updatePlayers(players))
});

const App = connect(null, mapDispatchToProps)(AppComponent)
export default App