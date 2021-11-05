import { Box, Checkbox, List, ListItem, ListItemSecondaryAction, ListItemText } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import React, { Component } from 'react';
import { isSearchMatch } from '../services/filter-service';
import { Player } from '../services/player-service';
import { SearchField } from './search-field';
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
                
                <SearchField
                    label="Players"
                    searchText={this.state.searchText}
                    onChange={this.handleSearchChange}
                    helperText="Search by player name, nation or club"
                />
                <List dense>
                    {(!this.props.players.length ? Array.from(new Array(10)) : 
                        this.props.players.filter(p => isSearchMatch(this.state.searchText, [...p.name.split(' '), ...p.nation.split(' '), ...p.club.split(' ')])).slice(0, 10))
                        .map((player) => {
                            return (
                                player ? (
                                    <ListItem key={player.id} button onClick={() => this.props.handlePlayerToggle(player)}>
                                        <ListItemText id={player.id+player.name} primary={player.name} secondary={player.club} />
                                        <ListItemSecondaryAction>
                                            <Checkbox
                                                edge="end"
                                                onChange={() => this.props.handlePlayerToggle(player)}
                                                checked={this.props.playersCompare.some(p => p.id===player.id)}
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
    private readonly handleSearchChange = (text: string): void => {
        this.setState({searchText: text});
    }
}