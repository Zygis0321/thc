import InputBase from '@material-ui/core/InputBase';
import TextField from '@material-ui/core/TextField';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import React, { Component } from 'react';
import { Player } from '../services/player-service';

interface OwnProps{
    players: Player[]
    playerAdded: (player: Player) => void
}
type Props = OwnProps


export class PlayersAutoComplete extends Component<Props, {}>{
    render(): React.ReactNode{

        return(

            <Autocomplete
                open
                filterOptions = {createFilterOptions({limit: 20})}
                options={this.props.players}
                getOptionLabel={(option) => option.name}
                renderInput={(params) => <TextField {...params} variant="outlined" label="Players"  />}
                ListboxProps={{ style: {  maxHeight:'200rem' } } }
                renderTags={() => null}
                closeIcon = {null}
                popupIcon = {null}
                onChange={(event, newValue, reason, details) => {
                    if(reason === 'select-option' && details?.option != undefined){
                        this.props.playerAdded(details.option)
                    }
                    if(reason === 'remove-option' && details?.option != undefined){
                    }
                }}
            />
        )
    }
}