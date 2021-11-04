import { Box, Grid, IconButton, List, ListItem, ListItemText } from "@material-ui/core";
import { Remove } from "@material-ui/icons";
import Skeleton from "@material-ui/lab/Skeleton";
import CSS from 'csstype';
import React, { Component } from "react";
import MediaQuery, { useMediaQuery } from 'react-responsive';
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import { PlayerRanked } from "../services/player-service";
import styles from './styles/playerlist.module.css';

const listItemStyle: CSS.Properties = {
    boxShadow: '0 1.5px 4px rgba(0, 0, 0, 0.2)',
    backgroundColor: 'rgb(255, 255, 255)',
    marginTop: '10px',
    marginBottom: '10px',
    borderRadius: '7px'
}

const mobileListItemStyle: CSS.Properties = {
    ...listItemStyle,
    paddingRight: '5px',
    paddingLeft: '10px'
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

const tabletMaxWidth = 800

const SortableItem = SortableElement(({children}:any) => { 
    const isTabletOrMobile = useMediaQuery({ maxWidth: tabletMaxWidth })
    return(
        <ListItem 
            
            style={isTabletOrMobile ? mobileListItemStyle : listItemStyle}
            onMouseEnter={ (): void => { if (document.body.style.cursor !== 'grabbing') document.body.style.cursor = 'grab' } }
            onMouseLeave={ (): void => { if (document.body.style.cursor === 'grab') document.body.style.cursor = '' } }
        >
            {children}
        </ListItem>
        )
    });
    
const SortableList = SortableContainer(({children}:any) => {
    const isTabletOrMobile = useMediaQuery({ maxWidth: tabletMaxWidth })
    return <List dense={isTabletOrMobile} style={{paddingTop:0}}>{children}</List>;
});
const ResponsiveListItem = ({children}:any) => {
    const isTabletOrMobile = useMediaQuery({ maxWidth: tabletMaxWidth })
    return <ListItem style={isTabletOrMobile ? {paddingRight:'5px', paddingLeft:'10px'}:undefined}>{children}</ListItem>
}


interface OwnProps{
    playersCompare: PlayerRanked[] 
    reorder: ({oldIndex, newIndex}: any) => void
    playerRemoved: (playerId: string) => void
}

type Props = OwnProps


export class RankedPlayersList extends Component<Props, {}>{
    
    render(): React.ReactNode{
        return(
            <MediaQuery maxWidth={599}>
            {(isMobile) => 
            <SortableList 
                onSortStart={() => (document.body.style.cursor = 'grabbing')}
                onSortEnd={({oldIndex, newIndex}: any) => {
                    document.body.style.cursor = 'default'
                    this.props.reorder({oldIndex, newIndex})
                }} 
                shouldCancelStart = {(e: any) => {
                    if(
                        e.target.id === "buttonRemove" || 
                        (e.target.nearestViewportElement !== undefined && 
                        e.target.nearestViewportElement.id === "buttonRemove")
                    ){
                        return true
                    }
                }} 
                useWindowAsScrollContainer
                lockAxis = 'y'
                pressDelay = {isMobile ? 200 : 0}
                helperClass = {styles.selected}
            >
                <ResponsiveListItem>
                    <Grid item xs = {1}>
                        <ListItemText >#</ListItemText>
                    </Grid>
                    <Grid item xs={3} sm={4}>
                        <ListItemText>Name</ListItemText>

                    </Grid>
                    <Grid item xs>
                        <ListItemText>Rank</ListItemText>

                    </Grid>
                    <Grid item xs>
                        <ListItemText >Points</ListItemText>

                    </Grid>
                    <Grid item xs={2} sm={2} md={2} style={{minWidth: '65px'}}>  
                        <ListItemText style={{textAlign:'right', float:'right'}}>Tournament Points</ListItemText>
                    </Grid>
                </ResponsiveListItem>
                {this.props.playersCompare.map((value, index) => (
                <SortableItem  key={index} index={index} >
                    <Grid item xs = {1}>
                    <ListItemText><b>{value.pos}</b></ListItemText>

                    </Grid>
                    <Grid item xs={3} sm={4}>
                        <ListItemText style={{marginRight:5}}>{value.name}</ListItemText>

                    </Grid>
                    <Grid item xs>
                        {
                            value.lowestScore===-1 ? <Skeleton width={65}/> :(
                            <Grid container direction='row' >
                                <Box mr={0.5}><ListItemText>{value.newRank}</ListItemText></Box>
                                {
                                    value.rank > value.newRank ? <ListItemText style={ratingUpStyle}><b>{`(+${Math.abs(value.rank-value.newRank)})`}</b></ListItemText>:
                                    value.rank === value.newRank ? <ListItemText style={ratingConstantStyle}><b>{`(=${value.rank-value.newRank})`}</b></ListItemText> :
                                    <ListItemText style={ratingDownStyle}><b>{`(-${Math.abs(value.rank-value.newRank)})`}</b></ListItemText>
                                } 
                            </Grid>
                            )
                        }

                    </Grid>

                    <Grid item xs>
                        {
                            value.lowestScore===-1 ? <Skeleton width={65}/> :(
                                <Grid container direction='row' >
                                    <Box mr={0.5}><ListItemText >{value.newPoints}</ListItemText></Box>
                                    {
                                        value.points < value.newPoints ? <ListItemText style={ratingUpStyle}><b>{`(+${Math.abs(value.points-value.newPoints)})`}</b></ListItemText>:
                                        <ListItemText style={ratingConstantStyle}><b> {`(=${value.points-value.newPoints})`}</b></ListItemText> 
                                    } 
                                </Grid>
                                )
                        }
                        

                    </Grid>
                      <Grid item xs={2} sm={2}  style={{minWidth: '65px'}}>  
                         <Grid container direction='row' justify='flex-end' > 
                            <MediaQuery maxWidth={tabletMaxWidth}>
                                {(matches) => 
                                    <>
                                        <Box  display="flex" alignItems="center" justifyContent="flex-end" marginRight={matches?'2px':2} >
                                            <ListItemText  ><b>{value.score}</b></ListItemText>
                                        </Box>
                                        <IconButton size='small' onClick = {() => this.props.playerRemoved(value.id)} id="buttonRemove">
                                            <Remove fontSize={matches ? 'small' : undefined} id="buttonRemove"/>
                                        </IconButton>
                                    </>
                                    
                                }
                            </MediaQuery>
                         </Grid> 
                     </Grid> 
                </SortableItem>
                ))}
            </SortableList>
            }
            </MediaQuery>
        )
    }

}