import { Box, Checkbox, InputAdornment, List, ListItem, ListItemSecondaryAction, ListItemText } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { Search } from '@material-ui/icons';
import Skeleton from '@material-ui/lab/Skeleton';
import React, { Component } from 'react';
import { Player } from '../services/player-service';
//import matchSorter from 'match-sorter'

interface OwnProps{
    players: Player[]
    handlePlayerToggle: (player: Player) => void
    playersCompare: Player[]
}
interface State{
    searchText: string
}

type Props = OwnProps


export class PlayersAutoComplete extends Component<Props, State>{
    public readonly state: State = {
        searchText: ''
    }
    render(): React.ReactNode{

        return(

            <>
                

                <TextField 
                    label="Players" 
                    variant="outlined" 
                    onChange={this.handleSearchChange} 
                    fullWidth
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <Search color='action'/>
                            </InputAdornment>
                        )
                    }}
                />
                <List dense>
                    {(!this.props.players.length ? Array.from(new Array(10)) : 
                        this.props.players.filter(p => p.name.toLowerCase().includes(this.state.searchText.toLowerCase())).slice(0, 10))
                        .map((player) => {
                            return (
                                player ? (
                                    <ListItem key={player.id} button onClick={() => this.props.handlePlayerToggle(player)}>
                                        <ListItemText id={player.id+player.name} primary={player.name} secondary={player.club} />
                                        <ListItemSecondaryAction>
                                            <Checkbox
                                                edge="end"
                                                onChange={() => this.props.handlePlayerToggle(player)}
                                                checked={this.props.playersCompare.some(p => p.id==player.id)}
                                            />
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                ) : (
                                    <Box pt={2} pl={1} pr={1}>
                                        <Skeleton />
                                        <Skeleton width="60%" />
                                    </Box>
                                )
                            )
                        })}
                </List>
            </>
        )
    }
    private readonly handleSearchChange = (e: any): void => {
        this.setState({searchText: e.target.value});
    }
}