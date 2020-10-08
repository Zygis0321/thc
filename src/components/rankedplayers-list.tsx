import { Box, Grid, IconButton, Typography } from "@material-ui/core";
import React, { Component } from "react";
import { SortableElement, SortableContainer } from "react-sortable-hoc";
import CSS from 'csstype';
import Skeleton from "@material-ui/lab/Skeleton";
import { PlayerRanked } from "../services/player-service";
import { Clear } from "@material-ui/icons";
import { List } from 'react-virtualized';

const listItemStyle: CSS.Properties = {
    boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.2)',
    backgroundColor: 'rgb(255, 255, 255)',
    marginTop: '12px',
    marginBottom: '12px',
    height: '124px'
}

const ratingUpStyle: CSS.Properties = {
    fontWeight: 600,
    color: '#5eb560'
}
const ratingDownStyle: CSS.Properties = {
    fontWeight: 600,
    color: '#f97373'
}
const ratingConstantStyle: CSS.Properties = {
    fontWeight: 600,
    color: '#969696'
}

const SortableItem = SortableElement(({children}:any) => children);


interface OwnProps{
    playersCompare: PlayerRanked[] 
    reorder: ({oldIndex, newIndex}: any) => void
    playerRemoved: (playerId: string) => void
}

type Props = OwnProps

export class RankedPlayersList extends Component<Props, {}>{
    
    componentDidUpdate(prevProps:Props) {
        if(prevProps.playersCompare !== this.props.playersCompare){
            console.log('ffff')
            this.forceUpdate()
        }
    }
    
    private readonly SortableList = SortableContainer(({children}:any) => {
        return( 
            <List
                height={240}
                //helperClass='SortableListRowActive'
                overscanRowCount={2}
                rowCount={this.props.playersCompare.length}
                rowHeight={100}
                rowRenderer={this.rowRenderer}
                width={600}
            >
                {children}
            </List>
         );
      });
    private readonly rowRenderer = ({index, key, style}:any) => {
        const value = this.props.playersCompare[index]
        return (
                <SortableItem key={key} index={index} >
                    <Grid container direction = 'row' style={listItemStyle}>
                    <Grid item xs = {1}>
                    <Typography><b>{value.pos}</b></Typography>

                    </Grid>
                    <Grid item xs={4}>
                        <Typography>{value.name}</Typography>

                    </Grid>
                    <Grid item xs>
                        {
                            value.lowestScore===-1 ? <Skeleton width={70}/> :(
                            <Grid container direction='row' >
                                <Box mr={0.5}><Typography>{value.newRank}</Typography></Box>
                                {
                                    value.rank > value.newRank ? <Typography style={ratingUpStyle}>{`(+${Math.abs(value.rank-value.newRank)})`}</Typography>:
                                    value.rank === value.newRank ? <Typography style={ratingConstantStyle}>{`(=${value.rank-value.newRank})`}</Typography> :
                                    <Typography style={ratingDownStyle}>{`(-${Math.abs(value.rank-value.newRank)})`}</Typography>
                                } 
                            </Grid>
                            )
                        }

                    </Grid>

                    <Grid item xs key={value.newPoints}>
                        {
                            value.lowestScore===-1 ? <Skeleton width={70}/> :(
                                <Grid container direction='row' >
                                    <Box mr={0.5}><Typography>{value.newPoints}</Typography></Box>
                                    {
                                        value.points < value.newPoints ? <Typography style={ratingUpStyle}>{`(+${Math.abs(value.points-value.newPoints)})`}</Typography>:
                                        <Typography style={ratingConstantStyle}>{`(=${value.points-value.newPoints})`}</Typography> 
                                    } 
                                </Grid>
                                )
                        }
                        

                    </Grid>
                    <Grid item xs={2}>
                        <Grid container direction='row' justify='flex-end'>
                            <Box  display="flex" alignItems="center" justifyContent="flex-end" marginRight={2} >
                                <Typography align='right'><b>{value.score}</b></Typography>
                            </Box>
                            <Box display="flex" alignItems="center" justifyContent="flex-end" >
                                <IconButton size='small' onClick = {() => this.props.playerRemoved(value.id)}>
                                    <Clear/>
                                </IconButton>
                            </Box>
                        </Grid>
                    </Grid>
                    </Grid>
                </SortableItem>
        )

    }

    render(): React.ReactNode{
        return(
            <this.SortableList 
                onSortEnd={this.props.reorder} 
                distance={1}
                
            />
        )
    }

}