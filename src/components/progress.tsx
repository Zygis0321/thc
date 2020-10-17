import { CircularProgress, Slider, TextField, Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box/Box';
import Button from '@material-ui/core/Button/Button';
import Container from '@material-ui/core/Container/Container';
import Grid from '@material-ui/core/Grid/Grid';
import { ClearAll, ThreeSixty } from '@material-ui/icons';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Player } from '../services/player-service';
import tournamentsService, { PlayerWithTournaments, PointsByDate, Tournament } from '../services/tournament-service';
import { RootState } from '../store/combineReducers';
import { PlayersAutoComplete } from './players-autocomplete';
import $ from "jquery";
import { RankedPlayersList } from './rankedplayers-list';
import { PlayersChart } from './players-chart';

type Props = ReturnType<typeof mapStateToProps>

interface State{
    playerPoints: PointsByDate[]
}

export class ProgressComponent extends Component<Props, State>{

    public readonly state:State = {
        playerPoints: []
    }

    render(): React.ReactNode{
        return(
            <Container>
                <Box pt={5}>
                <Grid container spacing={3}>
                        <Autocomplete
                            options = {this.props.players}
                            getOptionLabel = {(option) => option.name}
                            renderInput = {(params) => 
                                <TextField {...params} label="Choose a player" />
                            }
                            filterOptions = {createFilterOptions({
                                limit: 100
                            })}
                            onChange = {this.handlePlayerChange}
                        />
                        {/*<Autocomplete
                            options = {this.props.players}
                            getOptionLabel = {(option) => option.name}
                            renderInput = {(params) => 
                                <TextField {...params} label="Select a player to compare" />
                            }
                            filterOptions = {createFilterOptions({
                                limit: 100
                            })}
                        />*/}
                        {this.state.playerPoints.length ? 
                            <PlayersChart playerPoints={this.state.playerPoints} /> :
                            <CircularProgress/>
                        }
                </Grid>
                
                </Box>
            </Container>
        )

    }
    
    private readonly handlePlayerChange = (event: any, newValue: Player|null) =>{
        if(newValue === null){
            this.setState({playerPoints: []})
        }
        else{
            $.getJSON('https://serene-crag-74633.herokuapp.com/tournaments/'+newValue.id)
            .then(res => {
                this.setState({
                    playerPoints: tournamentsService.getPointsByDate(res)
                })
            })
            .catch(() => {
                console.log("error")
            })
        }
    }

}

const mapStateToProps = (state: RootState) =>({
    players: state.players
});

const Progress = connect(mapStateToProps)(ProgressComponent)
export {Progress}