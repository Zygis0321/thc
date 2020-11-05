import React, { Component } from 'react';
import { BrowserRouter as Router, HashRouter } from 'react-router-dom';
import { Route } from 'react-router';
import logo from './logo.svg';
import './App.css';
import { Ranker } from './components/ranker';
import playersService, { Player } from './services/player-service';
import { AnyAction, Dispatch } from 'redux';
import { updatePlayers, updatePlayersState } from './store/players/player-actions';
import { connect } from 'react-redux';
import $ from "jquery";
import { Progress } from './components/progress';
import { NavBar } from './components/navbar';
import tournamentsService from './services/tournament-service';
import { PlayersState } from './store/players/player-types';
import { Home } from './components/home';

type Props = ReturnType<typeof mapDispatchToProps> 

class AppComponent extends Component<Props, {}> {
  
  componentDidMount(): void{
    $.ajax('https://serene-crag-74633.herokuapp.com/all')
      .then(res => {
          const players:Player[] =  playersService.parseContent(res)
          this.props.updatePlayersState({
            prefScores: playersService.getPlayerScores(players),
            players
          })
      })
      .catch(() => {
          console.log("error")
      })
  }
  
  static displayName = AppComponent.name;
  
  render () {
    return (
      <HashRouter>
        <NavBar>
          <Route exact path='/' component={Home} />
          <Route exact path='/ranker' component={Ranker} />
          <Route exact path= '/players/:id?' component={Progress} />
        </NavBar>
      </HashRouter>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) =>({
  updatePlayersState: (playersState: PlayersState) => dispatch(updatePlayersState(playersState))
});

const App = connect(null, mapDispatchToProps)(AppComponent)
export default App