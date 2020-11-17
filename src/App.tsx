import $ from "jquery";
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router';
import { HashRouter } from 'react-router-dom';
import { AnyAction, Dispatch } from 'redux';
import './App.css';
import { Home } from './components/home';
import { NavBar } from './components/navbar';
import { Progress } from './components/progress';
import { Ranker } from './components/ranker';
import playersService, { Player } from './services/player-service';
import { updatePlayersState } from './store/players/player-actions';
import { PlayersState } from './store/players/player-types';

type Props = ReturnType<typeof mapDispatchToProps> 

class AppComponent extends Component<Props, {}> {
  
  componentDidMount(): void{
    $.ajax('https://europe-west3-thranker.cloudfunctions.net/all')
      .then(res => {
          const players:Player[] =  playersService.parseContent(res)
          const prefScores:number[] = playersService.getPlayerScores(players)
          this.props.updatePlayersState({
            prefScores,
            players: playersService.fixPlayers(players, prefScores)
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