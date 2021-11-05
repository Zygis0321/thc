import { IconButton, InputAdornment, TextField } from "@material-ui/core"
import { Search, Clear } from "@material-ui/icons"
import React from "react"

type Props = {
    label: string,
    searchText: string,
    onChange: (text: string) => void,
    helperText?: string,
}

export const SearchField: React.FC<Props> = (props) => {

    return(
        <TextField 
            label={props.label}
            variant="outlined" 
            onChange={(e) => props.onChange(e.target.value)} 
            fullWidth
            id="searchField"
            value = {props.searchText}
            onKeyPress={(ev) => {
                if (ev.key === 'Enter' ) {
                    document.getElementById('searchField')?.blur();
                }
            }}
            helperText = {props.helperText}
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <Search/>
                    </InputAdornment>
                ),
                endAdornment: (
                    props.searchText.length ?
                    <InputAdornment position="end">
                        <IconButton 
                            size='small'
                            onClick = {() => {
                                props.onChange('')
                            }}
                        >
                            <Clear/>
                        </IconButton>
                    </InputAdornment>
                    : null
                )
            }}
        />

    )
}