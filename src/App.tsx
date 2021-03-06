import $ from "jquery";
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router';
import { HashRouter } from 'react-router-dom';
import { AnyAction, Dispatch } from 'redux';
import './App.css';
import { ErrorMessage } from "./components/error-message";
import { Home } from './components/home';
import { NavBar } from './components/navbar';
import { Progress } from './components/progress';
import { Ranker } from './components/ranker';
import playersService, { Player } from './services/player-service';
import { updatePlayersState } from './store/players/player-actions';
import { PlayersState } from './store/players/player-types';

type Props = ReturnType<typeof mapDispatchToProps> 

interface State{
  showError: boolean
}

class AppComponent extends Component<Props, State> {
  public readonly state: State = {
    showError: false
  }
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
          this.setState({showError: true})
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
        <ErrorMessage show={this.state.showError}/>
      </HashRouter>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) =>({
  updatePlayersState: (playersState: PlayersState) => dispatch(updatePlayersState(playersState))
});

const App = connect(null, mapDispatchToProps)(AppComponent)
export default App