import { Button, CardActions, CardContent, Typography } from "@material-ui/core";
import Card from '@material-ui/core/Card';
import { Skeleton } from "@material-ui/lab";
import React from "react";
import { useMediaQuery } from "react-responsive";
import { getCountry } from "../services/country-service";
import { Player } from "../services/player-service";

interface OwnProps{
    player: Player | null
}

type Props = OwnProps


function PlayerDetail(props: {text: string, value: string, bold?: boolean}){
    return (
        <>
            <Typography align='right' style={{float:'right'}}>
                {props.bold === true ? <b>{props.value}</b> : props.value}
            </Typography>
            <Typography color="textSecondary" style={{fontWeight:'lighter'}}>
                {props.text}
            </Typography>
        </>
    )
}

function PlayerContent(props: {player: Player, withFlag:boolean}){
    return(
        <CardContent >
            <div style={{display:'flex', marginBottom:'12px'}}>
                {props.withFlag && <img 
                style={{alignSelf:'center',width:'100px',objectFit:'fill', boxShadow: '0 0px 3px 0px rgb(150, 150, 150)',}}
                    src = {require(`../data/flags/${getCountry(props.player.nation).alpha2code.toLowerCase()}.svg`)}
                />}
                <Typography variant="h5" align='center' style = {{margin:'auto'}} color="secondary">
                    {props.player.name}
                </Typography>
            </div>
            <PlayerDetail text='Club' value={props.player.club} />
            <PlayerDetail text='Rank' value={props.player.rank.toString()} bold/>
            <PlayerDetail text='Points' value={props.player.points.toString()} bold/>
            <PlayerDetail text='Player Value' value={props.player.value.toString()}/>
            
        </CardContent>
    )
}
function PlayerSkeleton(){
    return(
        <CardContent >
            <div style={{display:'flex', marginBottom:'12px'}}>
                <div style={{alignSelf:'center'}}><Skeleton variant='rect' width={100} height={66} /></div>
                <div style={{margin:'auto'}}><Skeleton variant='text' width='150px' height={40}/></div>
            </div>
            <Skeleton variant='text' height={25}/>
            <Skeleton variant='text' height={25}/>
            <Skeleton variant='text' height={25}/>
            <Skeleton variant='text' height={25}/>
            
        </CardContent>
    )
}


export function PlayerHomeCard(props: {player?: Player}){
    return(
        <Card style = {{width:'100%', height:'100%'}}>
            {/* <CardActionArea> */}
                {
                    props.player === undefined ? <PlayerSkeleton/> :
                    <PlayerContent player={props.player} withFlag />
                }
            {/* </CardActionArea> */}
        </Card>

    )
}

export default function PlayerCard(props: Props){
    const isMobile = useMediaQuery({maxWidth: 959});
    return (
        props.player === null ?
        <Card style = {{ display:'flex', height: '230px', width:'100%', maxWidth:'650px', marginLeft:'auto', marginRight:'auto'}}>
            <Typography style={{margin:'auto'}}>
                No player selected
            </Typography>
        </Card>
        :
        <Card style = {{display:'flex',justifyContent:'flex-end', alignItems:'stretch',  maxWidth:'650px', marginLeft:'auto', marginRight:'auto', width:'100%'}}>
                
                    <div style={{display:'flex', flexDirection:'column', justifyContent:'space-between', width:'100%'}}>
                        <PlayerContent player={props.player} withFlag={isMobile} />
                        <CardActions>
                            <Button 
                                size="small" 
                                color="primary"
                                onClick={() => {
                                    if(props.player !== null)
                                        window.open( `https://stiga.trefik.cz/ithf/ranking/player.aspx?ID=${props.player.id}`, '_blank')
                                }}
                            >
                                Learn More
                            </Button>
                        </CardActions>
                    </div>
            {!isMobile && <img 
            style={{width:'345px', flex:'0 0 345px', boxShadow: '0 0px 3px 0px rgb(150, 150, 150)',}}
            //height="100%"
                src = {require(`../data/flags/${getCountry(props.player.nation).alpha2code.toLowerCase()}.svg`)}
            />}
        </Card>
    )
}