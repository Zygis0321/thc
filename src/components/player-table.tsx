import { Grid, TableContainer, TextField } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import { FilterOptionsState } from '@material-ui/lab';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useSelector } from 'react-redux';
import { useHistory, useParams, useRouteMatch } from 'react-router-dom';
import { CellField } from '../common/models';
import { isSearchMatch, maxFilter } from '../services/filter-service';
import { getUniqueValues, Player, PlayerValue } from '../services/player-service';
import { RootState } from '../store/combineReducers';
import { LoadingComponent } from './loading-component';
import { SearchField } from './search-field';
import { getPaginationProps, getPathWithParams } from './table/helpers';
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
        link: 'playerLink',
    },
    {
        type: 'flag',
        name: 'nationName',
        label: 'Nation',
        alpha2Code: 'nationAlpha2Code'
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
            isSearchMatch(searchText, player.name.split(' ')) &&
            (selectedNations.length === 0 || selectedNations.some((nation) => nation === player.nationName)) &&
            (selectedClubs.length === 0 || selectedClubs.some((club) => club === player.club))
        )
    }
    const history = useHistory();
    const { path } = useRouteMatch();

    const handleFilterChange = () => {
        history.replace(getPathWithParams({page: 0}, path))
    }

    const filteredPlayers = players.filter(isValidPlayer);
    const rowsPerPage = 50;

    function filterOptions(options: PlayerValue[], state: FilterOptionsState<PlayerValue>): PlayerValue[]{
        return maxFilter<PlayerValue>(
            options, 
            p => isSearchMatch(state.inputValue, (p as string).split(' ')), 
            100
        )
    }

    return(
        <>
        <Helmet>
            <meta
                name="description"
                content="A list of all ranked ITHF table hockey players. Easily search for players by name, nation or club."
            />
            <title>Players Table | Table Hockey Ranker</title>
        </Helmet>
        <LoadingComponent isLoading={players.length === 0}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={3}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6} md={12}>
                            <SearchField
                                label="Player name"
                                searchText={searchText}
                                onChange={(text: string) => {
                                    setSearchText(text)
                                    handleFilterChange()
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={12}>
                            <Autocomplete
                                multiple
                                blurOnSelect
                                options = {getUniqueValues(players, 'nationName')}
                                //getOptionLabel = {(option) => getCountry(option as string).name}
                                renderInput = {(params) => 
                                    <TextField {...params} label="Select nations" />
                                }
                                filterOptions = {filterOptions}
                                onChange = {(e, newValue) => {
                                    setSelectedNations(newValue)
                                    handleFilterChange()
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
                                filterOptions = {filterOptions}
                                onChange = {(e, newValue) => {
                                    setSelectedClubs(newValue)
                                    handleFilterChange()
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
                                    values={filteredPlayers} 
                                    pagination={{...paginationProps, rowsPerPage}} 
                                    includeSerialNumber
                                />
                            </Table>
                        </TableContainer>
                        <TablePaginationComponent
                            count = {Math.ceil(filteredPlayers.length / rowsPerPage)}
                        />
                    </Paper>
                </Grid>
            </Grid>
        </LoadingComponent>
        </>
    )
}
