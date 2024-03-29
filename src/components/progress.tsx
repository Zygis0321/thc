import { AppBar, CircularProgress, Paper, Tab, Tabs, TextField, Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid/Grid';
import { FilterOptionsState } from '@material-ui/lab';
import Autocomplete, { AutocompleteChangeDetails, AutocompleteChangeReason } from '@material-ui/lab/Autocomplete';
import $ from "jquery";
import React, { Component } from 'react';
import { Helmet } from "react-helmet";
import { connect } from 'react-redux';
import MediaQuery from 'react-responsive';
import { RouteComponentProps } from 'react-router';
import { percentageExceptionList, percentageNormalList } from '../data/scorecalc-data';
import { isSearchMatch, maxFilter } from '../services/filter-service';
import { Player } from '../services/player-service';
import tournamentsService, { PlayerPoints } from '../services/tournament-service';
import { RootState } from '../store/combineReducers';
import { PlayersCareerChart } from './charts/career-chart-wrapper';
import { PlayersYearChart } from './charts/year-chart-wrapper';
import { ErrorMessage } from './error-message';
import PlayerCard from './player-card';
import { PlayerCompareTable } from './player-compare-table';

interface Params{
    id: string
}

type Props = ReturnType<typeof mapStateToProps> & RouteComponentProps<Params>

interface PlayerPointsWithId extends PlayerPoints{
    id: string
}

interface State{

    mainPlayerPoints?: PlayerPoints,
    comparePlayerPoints: PlayerPointsWithId[]   
    
    playerUpdating: number
    selectedPlayer: Player | null
    selectedComparePlayers: Player[]

    tabValue: number

    showError: boolean
}

export class ProgressComponent extends Component<Props, State>{

    public readonly state:State = {
        comparePlayerPoints: [],
        
        playerUpdating: 0,
        selectedPlayer: null,
        selectedComparePlayers: [],
        tabValue: 0,

        showError: false
    }

    componentDidMount(){
        if(this.props.match.params.id !== undefined && this.props.players.length){
            this.handlePlayerChange(undefined, this.getPlayerValue())
        }

    }

    componentDidUpdate(prevProps: Props){
        if((prevProps.players.length !== this.props.players.length && this.props.match.params.id !== undefined) ||
           (prevProps.match.params.id !== this.props.match.params.id && this.props.players.length)){
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

    getPlayerPointsArray(): PlayerPoints[]{
        if(this.state.mainPlayerPoints !== undefined ){
            return [ this.state.mainPlayerPoints ].concat(this.state.comparePlayerPoints)
        }
        return []
    }
    
    filterOptions(options: Player[], state: FilterOptionsState<Player>): Player[]{
        return maxFilter<Player>(
            options, 
            p => isSearchMatch(state.inputValue, [...p.name.split(' '), ...p.nationName.split(' '), ...p.club.split(' ')]), 
            100
        )
    }


    render(): React.ReactNode{
        return(
            <>
            <Helmet>
                <title>Players | Table Hockey Ranker</title>
                <meta name="description" content="Explore and compare ITHF rank changes of table hockey players." />
            </Helmet>
            {(this.props.match.params.id !== undefined && this.props.players.length === 0) 
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
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={5} md={4}>
                        <Grid container spacing={3}>

                        <Grid item xs={12}>
                            <Autocomplete
                                blurOnSelect
                                options = {this.props.players}
                                getOptionLabel = {(option) => option.name}
                                value = {this.state.selectedPlayer}
                                renderInput = {(params) => 
                                    <TextField {...params} label="Select a player" variant = "outlined" helperText="Search by player name, nation or club"/>
                                }
                                filterOptions = {this.filterOptions}
                                onChange = {this.handleValueChange}
                                loading = {this.props.players.length === 0}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Autocomplete
                                multiple
                                blurOnSelect
                                options = {this.props.players}
                                getOptionLabel = {(option) => option.name}
                                renderInput = {(params) => 
                                    <TextField {...params} label="Select players to compare" />
                                }
                                filterOptions = {this.filterOptions}
                                onChange = {this.handlePlayerCompareChange}
                                loading = {this.props.players.length === 0}
                            />
                        </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs sm md>
                        <PlayerCard player={this.state.selectedPlayer}/>
                    </Grid>
                    <Grid xs={12} style={{marginTop:'18px'}}>
                        <div style={{ marginLeft:'8px', marginRight:'8px',}}>
                            <PlayerCompareTable players={this.state.selectedPlayer ? [{...this.state.selectedPlayer, isMain: true}, ...this.state.selectedComparePlayers]:this.state.selectedComparePlayers}/>
                        </div>
                    </Grid>
                    <Paper className="Paper" style={{width:'100%', marginTop:'24px', marginBottom:'24px', marginLeft:'8px', marginRight:'8px', overflow:'hidden', }}>
                    <Grid item xs = {12}>
                    
                        <AppBar position="static" color="transparent" style={{marginBottom:'18px', boxShadow: '0 0px 3px 0px rgb(150, 150, 150)'}}>
                        <Tabs
                            value = {this.state.tabValue}
                            onChange = {(event: any, newValue:number) => {this.setState({tabValue:newValue})}}
                            centered
                            indicatorColor='primary'
                        >
                            <Tab label="Career Chart"/>
                            <Tab label="Date Chart"/>
                        </Tabs>
                        </AppBar>
                        <MediaQuery maxWidth={599}>
                        {(isMobile) =>
                        <div style={{position: "relative", padding:isMobile?'6px': '10px'}}>
                            {
                                <div style={(this.state.playerUpdating || this.state.mainPlayerPoints === undefined) ? {filter:"blur(5px)", pointerEvents:'none'} : undefined }>
                                    
                                    {this.state.tabValue === 1 ?
                                        <PlayersYearChart 
                                            playerPointsArray = {this.getPlayerPointsArray()}
                                        />
                                        :
                                        <PlayersCareerChart 
                                            playerPointsArray = {this.getPlayerPointsArray()}
                                        />
                                    }
                                </div>
                            }
                            {
                                (this.state.playerUpdating || this.state.mainPlayerPoints === undefined) && 
                                <div style={{
                                    position:"absolute", 
                                    width:"100%", 
                                    height:isMobile?"400px":"500px", 
                                    top:0, 
                                    left:0, 
                                    display:'flex', 
                                    justifyContent:"center", 
                                    alignItems:'center'
                                }}>
                                    {this.state.playerUpdating && this.state.selectedPlayer !== null ?

                                        <CircularProgress  />
                                        :
                                        <Typography>
                                            Select a player to load chart
                                        </Typography>
                                    }
                                </div>
                            }
                        </div>
                        }
                        </MediaQuery>
                    </Grid>
                    </Paper>

                </Grid>}
                <ErrorMessage show={this.state.showError}/>
                </>
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
        this.setState({selectedPlayer: newValue})
        this.getPlayerPoints(newValue).then((value) => {
            if(this.state.selectedPlayer?.id === newValue?.id){
                this.setState({
                    mainPlayerPoints: value
                })                
            }

            
        })
    }
    private readonly handlePlayerCompareChange = (
        event: any, 
        newValue: Player[], 
        reason: AutocompleteChangeReason, 
        details: AutocompleteChangeDetails<Player> | undefined
    ) =>{
        //this.setState({playerName2: newValue?.name})
        if(reason === "clear"){
            this.setState({
                comparePlayerPoints: [],
                selectedComparePlayers: []
            })
        }
        else if(details !== undefined){
            if(reason === "remove-option"){
                this.setState((prevState) => ({
                    comparePlayerPoints: prevState.comparePlayerPoints.filter(player => player.id !== details.option.id),
                    selectedComparePlayers: prevState.selectedComparePlayers.filter(player => player.id !== details.option.id)
                }))
            }
            else if(reason === "select-option"){
                this.setState((prevState) => ({
                    selectedComparePlayers: prevState.selectedComparePlayers.concat(details.option)
                }))
                this.getPlayerPoints(details.option).then((value) => {
                    if(value!==undefined && this.state.selectedComparePlayers.some(player => player.id === details.option.id)){
                        const valToAdd: PlayerPointsWithId = {
                            ...value,
                            id: details.option.id
                        }

                        this.setState((prevState) => ({
                            comparePlayerPoints: prevState.comparePlayerPoints.concat(valToAdd)
                        }))
                    }

                })
            }
        }
    }


    private readonly getPlayerPoints = (newValue: Player|null): Promise<PlayerPoints | undefined> =>{
        var promise = new Promise<PlayerPoints | undefined>((resolve, reject) => {
            if(newValue === null){
                resolve(undefined)
            }
            else{
                this.setState((prevState) => ({playerUpdating: prevState.playerUpdating+1}))
                $.getJSON('https://europe-west3-thranker.cloudfunctions.net/tournaments?playerId='+newValue.id)
                .then(res => {
                    resolve({
                        pointsNormal: tournamentsService.getPointsByDate(res, percentageNormalList),
                        pointsException: tournamentsService.getPointsByDate(res, percentageExceptionList),
                        playerName:newValue.name
                    })
                })
                .catch(() => {
                    this.setState({showError: true})
                    resolve(undefined)
                })
                .always(() => {
                    this.setState((prevState) => ({playerUpdating: prevState.playerUpdating-1}))
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
export { Progress };

