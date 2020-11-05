import { CircularProgress, TextField, Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid/Grid';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import $ from "jquery";
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router';
import { percentageExceptionList, percentageNormalList } from '../data/scorecalc-data';
import { Player } from '../services/player-service';
import tournamentsService, { PointsByDate } from '../services/tournament-service';
import { RootState } from '../store/combineReducers';
import PlayerCard from './player-card';
import { PlayersChart } from './players-chart';

interface Params{
    id: string
}

type Props = ReturnType<typeof mapStateToProps> & RouteComponentProps<Params>

interface State{
    playerPointsNormal1: PointsByDate[]
    playerPointsException1: PointsByDate[]
    playerPointsNormal2: PointsByDate[]
    playerPointsException2: PointsByDate[]
    playerName1?: string
    playerName2?: string
    
    playerUpdating: boolean
    selectedPlayer: Player | null
}

interface PlayerPoints{
    normal: PointsByDate[],
    exception: PointsByDate[]
}

export class ProgressComponent extends Component<Props, State>{

    public readonly state:State = {
        playerPointsNormal1: [],
        playerPointsException1: [],
        playerPointsNormal2: [],
        playerPointsException2: [],
        
        playerUpdating: false,
        selectedPlayer: null
    }

    componentDidMount(){
        if(this.props.match.params.id !== undefined && this.props.players.length){
            this.handlePlayerChange(undefined, this.getPlayerValue())
        }
    }

    componentDidUpdate(prevProps: Props){
        if(prevProps.players.length !== this.props.players.length && this.props.match.params.id !== undefined ||
           prevProps.match.params.id !== this.props.match.params.id && this.props.players.length){
            this.handlePlayerChange(undefined, this.getPlayerValue())
        }
    }


    getPlayerValue(): Player | null{
        let player = this.props.players.find(player => player.id === this.props.match.params.id)
        if(player === undefined){
            return null
        }

        return player
    }
    

    render(): React.ReactNode{
        return(
            (this.props.match.params.id !== undefined && this.props.players.length === 0) 
            ? 
            <div style={{
                height:'calc(100vh - 100px)',
                display:'flex', 
                justifyContent:"center", 
                alignItems:'center'}}
            >
                <CircularProgress style = {{alignSelf:'center'}}/>
            </div>
            :
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={5} md={4}>
                        <Grid container spacing={3}>

                        <Grid item xs={12}>
                            <Autocomplete
                                blurOnSelect
                                options = {this.props.players}
                                getOptionLabel = {(option) => option.name}
                                value = {this.state.selectedPlayer}
                                renderInput = {(params) => 
                                    <TextField {...params} label="Select a player" variant = "outlined" />
                                }
                                filterOptions = {createFilterOptions({
                                    limit: 100
                                })}
                                onChange = {this.handleValueChange}
                                loading = {this.props.players.length === 0}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Autocomplete
                                blurOnSelect
                                options = {this.props.players}
                                getOptionLabel = {(option) => option.name}
                                renderInput = {(params) => 
                                    <TextField {...params} label="Select a player to compare" />
                                }
                                filterOptions = {createFilterOptions({
                                    limit: 100
                                })}
                                onChange = {this.handlePlayerCompareChange}
                                loading = {this.props.players.length === 0}
                            />
                        </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs sm md>
                        <PlayerCard player={this.state.selectedPlayer}/>
                    </Grid>
                    <Grid item xs = {12}>
                        <div style={{position: "relative"}}>
                            {
                                <div style={(this.state.playerUpdating || this.state.playerName1 === undefined) ? {filter:"blur(5px)"} : undefined }>
                                    
                                    <PlayersChart 
                                        playerPointsNormal1={this.state.playerPointsNormal1} 
                                        playerPointsException1={this.state.playerPointsException1}
                                        playerPointsNormal2={this.state.playerPointsNormal2} 
                                        playerPointsException2={this.state.playerPointsException2}
                                        playerName1={this.state.playerName1}
                                        playerName2={this.state.playerName2}
                                    />
                                </div>
                            }
                            {
                                (this.state.playerUpdating || this.state.playerName1 === undefined) && 
                                <div style={{
                                    position:"absolute", 
                                    width:"100%", 
                                    height:"500px", 
                                    top:0, 
                                    left:0, 
                                    display:'flex', 
                                    justifyContent:"center", 
                                    alignItems:'center'
                                }}>
                                    {this.state.playerName1 !== undefined ?

                                        <CircularProgress  />
                                        :
                                        <Typography>
                                            Select a player to load chart
                                        </Typography>
                                    }
                                </div>
                            }
                        </div>
                    </Grid>
                </Grid>
        )

    }

    
    private readonly handleValueChange = (event: any, newValue: Player|null) => {
        if(newValue === null){
            this.props.history.push(`/players`)
        }
        else{
            this.props.history.push(`/players/${newValue.id}`)
        }
    }
    private readonly handlePlayerChange = (event: any, newValue: Player|null) =>{
        this.setState({playerName1: newValue?.name, selectedPlayer: newValue})
        this.getPlayerPoints(newValue).then((value) => {
            this.setState({
                playerPointsNormal1: value.normal,
                playerPointsException1: value.exception
            })
            
        })
    }
    private readonly handlePlayerCompareChange = (event: any, newValue: Player|null) =>{
        this.getPlayerPoints(newValue).then((value) => {
            this.setState({
                playerPointsNormal2: value.normal,
                playerPointsException2: value.exception,
                playerName2: newValue?.name
            })
        })
    }


    private readonly getPlayerPoints = (newValue: Player|null): Promise<PlayerPoints> =>{
        var promise = new Promise<PlayerPoints>((resolve, reject) => {
            if(newValue === null){
                resolve( {
                    normal: [],
                    exception: []
                })
            }
            else{
                this.setState({playerUpdating: true})
                $.getJSON('https://serene-crag-74633.herokuapp.com/tournaments/'+newValue.id)
                .then(res => {
                    resolve({
                        normal: tournamentsService.getPointsByDate(res, percentageNormalList),
                        exception: tournamentsService.getPointsByDate(res, percentageExceptionList)
                    })
                })
                .catch(() => {
                    console.log("error")
                    resolve( {
                        normal: [],
                        exception: []
                    })
                })
                .always(() => {
                    this.setState({playerUpdating: false})
                })
            }

        })
        return promise
    }
}

const mapStateToProps = (state: RootState) =>({
    players: state.players.players
});

const Progress = connect(mapStateToProps)(ProgressComponent)
export {Progress};
