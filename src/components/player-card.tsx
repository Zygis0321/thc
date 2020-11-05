import { Button, CardActionArea, CardActions, CardContent, IconButton, Typography } from "@material-ui/core";
import Card from '@material-ui/core/Card';
import { ArrowForward } from "@material-ui/icons";
import { Skeleton } from "@material-ui/lab";
import React from "react";
import { useMediaQuery } from "react-responsive";
import { useHistory } from "react-router";
import { getCountry } from "../services/country-service";
import { Player } from "../services/player-service";
import Flag from 'react-world-flags'

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
            <Typography color="textSecondary">
                {props.text}
            </Typography>
        </>
    )
}

function PlayerContent(props: {player: Player, withFlag:boolean, homePage?:boolean}){
    return(
        <CardContent style={props.homePage===true ? undefined :{paddingBottom:4}}>
            <div style={{display:'flex', marginBottom: props.homePage===true ? '0px':'12px'}}>
                {props.withFlag && <Flag 
                    style={{alignSelf:'center', marginRight:'12px',width: props.homePage===true ? '60px':'90px',objectFit:'fill', boxShadow: '0 0px 3px 0px rgb(150, 150, 150)',}}
                    alt = {getCountry(props.player.nation).name}
                    code={getCountry(props.player.nation).alpha2code.toLowerCase()}
                />}
                <Typography variant={props.homePage===true ? 'h6' : "h5"} align='center' style = {{margin:'auto'}} color={props.homePage===true?'textPrimary':"secondary"}>
                    {props.player.name}
                </Typography>
                {props.homePage===true &&
                    <IconButton >
                        <ArrowForward fontSize='large'/>
                    </IconButton>
                }
            </div>
            {props.homePage!==true &&
                <>
                    <PlayerDetail text='Club' value={props.player.club} />
                    <PlayerDetail text='Rank' value={props.player.rank.toString()} bold/>
                    <PlayerDetail text='Points' value={props.player.points.toString()} bold/>
                    <PlayerDetail text='Player Value' value={props.player.value.toString()}/>
                </>
            }
            
        </CardContent>
    )
}
function PlayerSkeleton(){
    return(
        <CardContent >
            <div style={{display:'flex'}}>
                <div style={{alignSelf:'center'}}><Skeleton variant='rect' width={60} height={40} /></div>
                <div style={{margin:'auto'}}><Skeleton variant='text' width='120px' height={30}/></div>
                <div style={{alignSelf:'center'}}><IconButton><ArrowForward fontSize='large'/></IconButton></div>
            </div>
            
        </CardContent>
    )
}


export function PlayerHomeCard(props: {player?: Player}){
    let history = useHistory()
    function PlayerClicked(playerId?: string){
        if(playerId==undefined)return
        history.push(`/players/${playerId}`)
    }
    return(
        <Card style = {{width:'100%', height:'100%'}}>
            <CardActionArea onClick={() => PlayerClicked(props.player?.id)} >
                {
                    props.player === undefined ? <PlayerSkeleton/> :
                    <PlayerContent player={props.player} withFlag homePage/>
                }
            </CardActionArea>
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
                                href =  {`https://stiga.trefik.cz/ithf/ranking/player.aspx?ID=${props.player.id}`}
                                target = '_blank'
                            >
                                Learn More
                            </Button>
                        </CardActions>
                    </div>
            {!isMobile && <Flag 
                style={{width:'345px', flex:'0 0 345px', boxShadow: '0 0px 3px 0px rgb(150, 150, 150)',}}
                alt = {getCountry(props.player.nation).name}
                code={getCountry(props.player.nation).alpha2code.toLowerCase()}
            />}
        </Card>
    )
}