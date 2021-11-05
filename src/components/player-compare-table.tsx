import { TableContainer } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import React from 'react';
import { CellField } from '../common/models';
import { PlayerMain } from '../services/player-service';
import { TableComponent } from './table/table-component';


type Props = {
    players: PlayerMain[]
}

const fields: CellField[] = [
    {
        type: 'text',
        name: 'rank',
        label: 'Rank',
        isBold: true,
    },
    {
        type: 'text',
        name: 'name',
        label: 'Name',
    },
    {
        type: 'flag',
        name: 'nation',
        label: 'Nation',
        alpha2Code: 'nationAlpha2Code',
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
        hideMobile: true,
    },
    {
        type: 'text',
        name: 'club',
        label: 'Club',
        hideTablet: true,
    },
]

export const PlayerCompareTable: React.FC<Props> = (props) => {
    return(
            <TableContainer 
                style={{minHeight:180}} 
                component={Paper} 
                className="Paper" 
            >
                <Table>
                    <TableComponent 
                        fields={fields} 
                        values={props.players} 
                    />
                </Table>
            </TableContainer>
    )
}
