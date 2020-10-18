import React, { Component } from 'react';
import playersService, { Player, PlayerRanked } from '../services/player-service';
import { PlayersAutoComplete } from './players-autocomplete';
import $ from "jquery";
import { Box, Button, Container, FormControl, Grid, InputLabel, MenuItem, Select } from '@material-ui/core';
import arrayMove from 'array-move';
import { Level, levelList } from '../data/scorecalc-data';
import { ClearAll } from '@material-ui/icons';
import { RankedPlayersList } from './rankedplayers-list';
import { RootState } from '../store/combineReducers';
import { connect } from 'react-redux';


interface State{
    playersCompare: PlayerRanked[] 
    selectedLevel: string
}

type Props = ReturnType<typeof mapStateToProps>

export class HomeComponent extends Component<Props, State>{

    public readonly state: State = {
        playersCompare: [],
        selectedLevel: levelList[0].name
    }
    
    


    private readonly recalc = (players: PlayerRanked[], levelName: string): PlayerRanked[] => {
        let levelFound = levelList.find(level => level.name==levelName)
        let level:Level = levelFound ? levelFound : levelList[0]
        return playersService.rankPlayers(playersService.recalc(players, level));
    }

    private readonly reorder = ({oldIndex, newIndex}: any): void => {
        this.setState(({playersCompare}) => ({
            playersCompare: this.recalc(arrayMove(playersCompare, oldIndex, newIndex), this.state.selectedLevel),
        }));
      };
    
    public componentDidUpdate(prevProps: Props): void{
        if(prevProps.players.length===0 && this.props.players.length > 0){
            playersService.setPlayerScores(this.props.players)
        }
    }

    public componentDidMount(): void{

    }

    render(): React.ReactNode{
        return(
            <Container>
                <Box pt={5}>
                <Grid container spacing={3}>
                    <Grid item xs={12}  sm={3} style={{minWidth:'200px'}}>
                        <PlayersAutoComplete
                            players = {this.props.players}
                            handlePlayerToggle = {this.handlePlayerToggle}
                            playersCompare = {this.state.playersCompare}
                            ///checked = {this.state.playersCompare.map(player => player.id).sort()}
                        />
                    </Grid>
                    <Grid item xs={12} sm>
                        <Grid container justify='space-between' alignItems='center'>
                            <Grid item>
                            <FormControl>
                                <InputLabel>Level</InputLabel>
                                <Select
                                    value={this.state.selectedLevel}
                                    onChange={this.handleLevelChange}
                                >
                                    {levelList.map(level => <MenuItem value={level.name}>{level.name}</MenuItem> )}
                                </Select>
                            </FormControl>
                            </Grid>
                            <Grid item>
                            <Button
                                variant="contained"
                                color="secondary"
                                startIcon={<ClearAll />}
                                onClick={this.handleClearAllClick}
                                style={{float:'right'}}
                            >
                                Clear
                            </Button>
                            </Grid>
                        </Grid>
                        <RankedPlayersList
                            playersCompare = {this.state.playersCompare}
                            reorder = {this.reorder}
                            playerRemoved = {this.playerRemoved}
                        />
                    </Grid>
            
                </Grid>
                
                </Box>
            </Container>

        )
    }

    private readonly handlePlayerToggle = (player: Player): void => {
        if(this.state.playersCompare.some(p => p.id==player.id)){
            this.playerRemoved(player.id)
        }
        else{
            this.playerAdded(player);
        }
    }
    private readonly playerAdded = (player: Player): void => {

        this.setState(prevState => ({
            ...prevState,
            playersCompare: this.recalc(prevState.playersCompare.concat({
                ...player, 
                pos:prevState.playersCompare.length+1, 
                score:-1, 
                lowestScore:-1,
                newRank:-1,
                newPoints:-1
            }), prevState.selectedLevel)
        }))
        $.ajax('https://serene-crag-74633.herokuapp.com/single/'+player.id)
        .then(res => {
            
            let score = Number(res);
            let items = [...this.state.playersCompare]
            for(var i=0; i<items.length; i++){
                if(items[i].id === player.id && items[i].lowestScore===-1){
                    let item = {...items[i]}
                    item.lowestScore=score
                    
                    items[i]=item
                    
                    this.setState({playersCompare: this.recalc(items, this.state.selectedLevel)})

                    break
                }
            }
        
        })
        .catch(() => {
            console.log("error")
        })

    }
    private readonly handleClearAllClick = (): void => {
        this.setState({
            playersCompare: []
        })
    }
    private readonly playerRemoved = (playerId: string): void => {
        this.setState(({playersCompare, selectedLevel}) => ({
            playersCompare: this.recalc(playersCompare.filter(player => player.id !== playerId), selectedLevel)
        }))
    }
    private readonly handleLevelChange = (e: any): void => {
        
        this.setState(({playersCompare}) => ({
            selectedLevel: e.target.value,
            playersCompare: this.recalc(playersCompare, e.target.value)
            
        }));
    }
}

const mapStateToProps = (state: RootState) =>({
    players: state.players
});

const Home = connect(mapStateToProps)(HomeComponent)
export {Home}