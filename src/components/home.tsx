import React, { Component } from 'react';
import playersService, { Player, PlayerRanked } from '../services/player-service';
import { PlayersAutoComplete } from './players-autocomplete';
import $ from "jquery";
import { Box, Button, Container, FormControl, Grid, InputLabel, List, ListItem, ListItemText, MenuItem, Paper, Select } from '@material-ui/core';
import arrayMove from 'array-move';
import { Level, levelList } from '../data/scorecalc-data';
import { ClearAll } from '@material-ui/icons';
import { RankedPlayersList } from './rankedplayers-list';


interface State{
    players: Player[]
    playersCompare: PlayerRanked[] 
    selectedLevel: string
}

export class Home extends Component<{}, State>{

    public readonly state: State = {
        players: [],
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
    
    public componentDidMount(): void{
        $.ajax('https://thcserver.herokuapp.com/all')
        .then(res => {
            const players:Player[] =  playersService.parseContent(res)
            playersService.setPlayerScores(players)
            this.setState({ players: players});
        })
        .catch(() => {
            console.log("error")
        })
    }

    render(): React.ReactNode{
        return(
            <Container>
                <Box pt={5}>
                <Grid container spacing={3}>
                    <Grid item xs={3}>
                        <PlayersAutoComplete
                            players = {this.state.players}
                            playerAdded = {this.playerAdded}
                        />
                    </Grid>
                    <Grid item xs>
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

    
    private readonly playerAdded = (player: Player): void => {

        if(this.state.playersCompare.find(p => p.id===player.id) !== undefined){
            return;
        }

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
        $.ajax('https://thcserver.herokuapp.com/single/'+player.id)
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