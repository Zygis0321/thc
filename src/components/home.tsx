import { Button, Typography } from "@material-ui/core";
import { Whatshot } from "@material-ui/icons";
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";
import { RootState } from "../store/combineReducers";
import { PlayerHomeCard } from "./player-card";


function getSkeletons(count: number){
    let skeletons = []
    for(let i=0; i<count; i++){
        skeletons.push(<PlayerHomeCard/>)
    }
    return skeletons
}


export function Home(){
    
    const isMobile = useMediaQuery({maxWidth:'599px'})
    const [playerCount, setPlayerCount] = useState(isMobile ? 4 : 6)

    const players = useSelector(
        (state: RootState) => 
        state.players.players.slice(0, playerCount)
    )
    return(
        <>
        <Helmet>
            <meta
                name="description"
                content="TH Ranker is a set of tools that allow to visualize ITHF table hockey ranking changes."
            />
            <title>Table Hockey Ranker</title>
        </Helmet>
            <div style={{display:'flex', justifyContent:'center'}}>
                <div style={{alignSelf:'stretch'}}><Whatshot fontSize='large' style={{ color:'#2c387e'}}/></div>

                    <Typography 
                        variant='h4' 
                        align='center'
                        style={{
                            color:'white', 
                            marginBottom:'20px', 
                            WebkitTextStroke:'1px', 
                            WebkitTextStrokeColor:'#3f51b5',
                        }}
                        >
                        <b>TOP PLAYERS</b>
                    </Typography>
            </div>
            <div 
                style={!isMobile ? {
                    display:'grid', 
                    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
                    gridGap:'20px'
                }:
                {
                    display:'grid', 
                    gridGap:'20px'
                }
            }>
                {
                    players.length > 0 ? players.map(value =>
                        <PlayerHomeCard player={value}/>
                    ) : getSkeletons(playerCount)   
                }
            </div>
            <div style={{display: 'flex', gap: 10, justifyContent: 'center', marginTop: 20, marginBottom: 20}}>
                <Button 
                    variant='outlined' 
                    color='primary' 
                    onClick={() => {
                        setPlayerCount(playerCount+6)
                    }}
                    style={{width:'200px'}}
                >
                    Load More
                </Button>
                <Button 
                    variant='contained' 
                    color='primary' 
                    component={(props) => <Link to='/table' {...props}/>}
                    onClick={() => {
                        setPlayerCount(playerCount+6)
                    }}
                    style={{width:'200px'}}
                >
                    All players
                </Button>
            </div>
        </>
    )
}