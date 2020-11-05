import { BottomNavigation, BottomNavigationAction, Box, Button, Divider, FormControl, Grid, InputLabel, MenuItem, Select, Typography } from '@material-ui/core';
import { ClearAll, GroupAdd, List as ListIcon } from '@material-ui/icons';
import arrayMove from 'array-move';
import $ from "jquery";
import React, { Component } from 'react';
import { connect } from 'react-redux';
import MediaQuery from 'react-responsive';
import { AnyAction, Dispatch } from 'redux';
import { Level, levelList } from '../data/scorecalc-data';
import playersService, { Player, PlayerRanked } from '../services/player-service';
import { RootState } from '../store/combineReducers';
import { updateRankerState } from '../store/ranker/ranker-actions';
import { RankerState } from '../store/ranker/ranker-types';
import { PlayersAutoComplete } from './players-autocomplete';
import { RankedPlayersList } from './rankedplayers-list';




type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps> 

export class RankerComponent extends Component<Props, {}>{ 
    
    private readonly recalc = (players: PlayerRanked[], levelName: string): PlayerRanked[] => {
        let levelFound = levelList.find(level => level.name==levelName)
        let level:Level = levelFound ? levelFound : levelList[0]
        return playersService.rankPlayers(playersService.recalc(players, level), this.props.prefScores);
    }

    private readonly reorder = ({oldIndex, newIndex}: any): void => {
        this.props.updateRankerState({
            ...this.props.rankerState, 
            playersCompare: this.recalc(arrayMove(this.props.rankerState.playersCompare, oldIndex, newIndex), this.props.rankerState.selectedLevel)
        })
      };

    render(): React.ReactNode{
        return(
            <>
                <MediaQuery maxWidth={599}>
                {(isMobile) => 
                <Box pb={isMobile ? 6 : 2}>
                    <Grid container spacing={3}>
                            <>
                            {(!isMobile || this.props.rankerState.bottomNavVal === 0) &&
                            <Grid item xs={12}  sm={3} style={{minWidth:'200px'}}>
                                <PlayersAutoComplete
                                    players = {this.props.players}
                                    handlePlayerToggle = {this.handlePlayerToggle}
                                    playersCompare = {this.props.rankerState.playersCompare}
                                />
                            </Grid>
                            }
                        
                            {(!isMobile || this.props.rankerState.bottomNavVal === 1) &&
                                <Grid item xs={12} sm>
                                    <Grid container justify='space-between' alignItems='center'>
                                        <Grid item>
                                        <FormControl>
                                            <InputLabel>Level</InputLabel>
                                            <Select
                                                value={this.props.rankerState.selectedLevel}
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
                                    <Typography align='right' variant='body2'style={{marginTop:20, marginRight:10}} color="textSecondary">
                                        <i>{isMobile ? "*Hold and drag to reorder" :
                                            "*Drag to reorder"}</i>
                                    </Typography>
                                    <RankedPlayersList
                                        playersCompare = {this.props.rankerState.playersCompare}
                                        reorder = {this.reorder}
                                        playerRemoved = {this.playerRemoved}
                                    />
                                </Grid>
                            
                            }
                            
                        </>
                    </Grid>
                </Box>
                }
            
                </MediaQuery>
            <MediaQuery maxWidth={599}>
                <BottomNavigation
                    value = {this.props.rankerState.bottomNavVal}
                    onChange={(e, newValue) => {
                        this.props.updateRankerState({
                            ...this.props.rankerState,
                            bottomNavVal: newValue
                        })
                    }}
                    style = {{
                        width:'100%',
                        position: 'fixed',
                        bottom: '0',
                        right:'0',
                        left:'0',
                        boxShadow: '0 0px 3px 0px rgb(150, 150, 150)',
                        zIndex: 99999
                    }}
                    showLabels
                >
                    <BottomNavigationAction label="Select Players" style={{maxWidth:'1000px'}} icon={<GroupAdd/>}/>
                    <BottomNavigationAction label="Standings" style={{maxWidth:"1000px"}} icon={<ListIcon/>}/>
                </BottomNavigation>
            </MediaQuery>
            </>
        )
    }

    private readonly handlePlayerToggle = (player: Player): void => {
        if(this.props.rankerState.playersCompare.some(p => p.id==player.id)){
            this.playerRemoved(player.id)
        }
        else{
            this.playerAdded(player);
        }
    }
    private readonly playerAdded = (player: Player): void => {
        
        this.props.updateRankerState({
            ...this.props.rankerState,
            playersCompare: this.recalc(this.props.rankerState.playersCompare.concat({
                ...player, 
                pos:this.props.rankerState.playersCompare.length+1, 
                score:-1, 
                lowestScore:-1,
                newRank:-1,
                newPoints:-1
            }), this.props.rankerState.selectedLevel)
        })
        $.ajax('https://serene-crag-74633.herokuapp.com/single/'+player.id)
        .then(res => {
            
            let score = Number(res);
            let items = [...this.props.rankerState.playersCompare]
            for(var i=0; i<items.length; i++){
                if(items[i].id === player.id && items[i].lowestScore===-1){
                    let item = {...items[i]}
                    item.lowestScore=score
                    
                    items[i]=item
                    this.props.updateRankerState({
                        ...this.props.rankerState,
                        playersCompare: this.recalc(items, this.props.rankerState.selectedLevel)
                    })

                    break
                }
            }
        
        })
        .catch(() => {
            console.log("error")
        })

    }
    private readonly handleClearAllClick = (): void => {
        this.props.updateRankerState({
            ...this.props.rankerState,
            playersCompare: []
        })
    }
    private readonly playerRemoved = (playerId: string): void => {
        this.props.updateRankerState({
            ...this.props.rankerState,
            playersCompare: this.recalc(this.props.rankerState.playersCompare.filter(player => player.id !== playerId), this.props.rankerState.selectedLevel)
        })
    }
    private readonly handleLevelChange = (e: any): void => {
        this.props.updateRankerState({
            ...this.props.rankerState,
            selectedLevel: e.target.value,
            playersCompare: this.recalc(this.props.rankerState.playersCompare, e.target.value)
        })
    }
}

const mapStateToProps = (state: RootState) =>({
    players: state.players.players,
    prefScores: state.players.prefScores,
    rankerState: state.ranker
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) =>({
    updateRankerState: (rankerState: RankerState) => dispatch(updateRankerState(rankerState))
});
  

const Ranker = connect(mapStateToProps, mapDispatchToProps)(RankerComponent)
export { Ranker };
