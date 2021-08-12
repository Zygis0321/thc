import { Grid, TableCell, TableContainer, TableHead, TextField, Typography } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { CellField } from '../common/models';
import { getCountry } from '../services/country-service';
import { getUniqueValues, Player, PlayerMain, PlayerValue } from '../services/player-service';
import { RootState } from '../store/combineReducers';
import { LoadingComponent } from './loading-component';
import { SearchField } from './search-field';
import { getPaginationProps } from './table/helpers';
import { PaginationLocationProps } from './table/models';
import { TableComponent } from './table/table-component';
import { TablePaginationComponent } from './table/table-pagination-component';



const fields: CellField[] = [
    {
        type: 'text',
        name: 'rank',
        label: 'Rank',
        isBold: true,
    },
    {
        type: 'link',
        name: 'name',
        label: 'Name',
    },
    {
        type: 'flag',
        name: 'nation',
        label: 'Nation',
    },
    {
        type: 'text',
        name: 'value',
        label: 'Value',
    },
    {
        type: 'text',
        name: 'points',
        label: 'Points',
        isBold: true,
    },
    {
        type: 'text',
        name: 'club',
        label: 'Club',
    },
]

export const PlayerTable: React.FC = (props) => {
    const players = useSelector(
        (state: RootState) => 
        state.players.players
    )
    const paginationProps = getPaginationProps(useParams<PaginationLocationProps>());

    const [searchText, setSearchText] = useState('');
    const [selectedNations, setSelectedNations] = useState<PlayerValue[]>([])
    const [selectedClubs, setSelectedClubs] = useState<PlayerValue[]>([])

    const isValidPlayer = (player: Player) => {
        return(
            player.name.toLowerCase().includes(searchText.toLowerCase()) &&
            (selectedNations.length === 0 || selectedNations.some((nation) => nation === player.nation)) &&
            (selectedClubs.length === 0 || selectedClubs.some((club) => club === player.club))
        )
    }

    const filteredPlayers = players.filter(isValidPlayer);

    return(
        <LoadingComponent isLoading={players.length === 0}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={3}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6} md={12}>
                            <SearchField
                                label="Player name"
                                searchText={searchText}
                                onChange={(text: string) => setSearchText(text)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={12}>
                            <Autocomplete
                                multiple
                                blurOnSelect
                                options = {getUniqueValues(players, 'nation')}
                                getOptionLabel = {(option) => getCountry(option as string).name}
                                renderInput = {(params) => 
                                    <TextField {...params} label="Select nations" />
                                }
                                filterOptions = {createFilterOptions({
                                    limit: 100
                                })}
                                onChange = {(e, newValue) => {
                                    setSelectedNations(newValue)
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={12}>
                            <Autocomplete
                                multiple
                                blurOnSelect
                                options = {getUniqueValues(players, 'club')}
                                renderInput = {(params) => 
                                    <TextField {...params} label="Select clubs" />
                                }
                                filterOptions = {createFilterOptions({
                                    limit: 100
                                })}
                                onChange = {(e, newValue) => {
                                    setSelectedClubs(newValue)
                                }}
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} md={9}>
                    <Paper className="Paper" style = {{marginLeft: '0px', marginRight: '0px', marginBottom:'12px'}}>
                        <TableContainer className="Table-paper" component={Paper} style={{minHeight: 300, height: `calc(100vh - 145px)`}}>
                            <Table stickyHeader>
                                <TableComponent 
                                    fields={fields} 
                                    values={filteredPlayers.map((player) => ({...player, name:{value: player.name, link: `/players/${player.id}`}}))} 
                                    pagination={paginationProps} 
                                    includeSerialNumber
                                />
                            </Table>
                        </TableContainer>
                        <TablePaginationComponent
                            count = {filteredPlayers.length}
                            rowsPerPageOptions = {[20, 50, 100]}
                        />
                    </Paper>
                </Grid>
            </Grid>
        </LoadingComponent>

    )
}
