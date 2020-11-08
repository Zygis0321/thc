import { AppBar, Box, Button, Container, Divider, Drawer, IconButton, List, ListItem, ListItemText, Typography } from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import CSS from 'csstype';
import React, { useState } from "react";
import MediaQuery from "react-responsive";
import { Link, NavLink, RouteComponentProps, useHistory, withRouter } from "react-router-dom";

const navBarItemStyle:CSS.Properties = {
    margin:'10px',
    alignSelf:'center'
}

const buttonSelectedStyle:CSS.Properties = {
    backgroundColor: '#dddddd'
}


interface navItem{
    name: string
    url: string
}

const navList: navItem[] = [
    {
        name: 'Home',
        url: '/'
    },
    {
        name: 'Players',
        url: '/players'
    },
    {
        name: 'Ranker',
        url: '/ranker'
    },

]


export const NavBar: React.FC = ({children}) => {

    let history = useHistory()
    const [opened, setOpened] = useState(false)

    function toggleDrawer(){
        setOpened(!opened)
    }

    return(
        <MediaQuery maxWidth={599}>
            {(isMobile) =>
            <>
            {isMobile && <>
                <Drawer anchor='left' open={opened} onClose={() => toggleDrawer()} style={{zIndex:999999}}>
                    <div style={{position:'relative', margin:6}}>
                        <img width={100} height={100} src='/logo256.png' alt='logo'/>
                        <Typography variant="h6"  style={{position:'absolute', left:70, bottom:0}}>
                            TH RANKER
                        </Typography>
                    </div>
                    <Divider/>
                    <List style={{width:'250px'}}>
                        {
                            navList.map(item => 
                                <ListItem component={(props) => <NavLink to={item.url} exact={item.url==='/'} activeStyle={buttonSelectedStyle} {...props}/>} onClick={() => toggleDrawer()} button>
                                    <ListItemText primary={item.name}/>
                                </ListItem>
                            )
                        }
                    </List>
                </Drawer>
                </>
            }
            <AppBar position='sticky' color='default' style={{justifyContent:'space-between', flexDirection:'row', height:'55px', paddingLeft:!isMobile ? 24 : undefined, paddingRight:24}} >
                <div style={{display:'flex'}}>
                    {isMobile &&
                        <IconButton 
                            edge="start" 
                            //size='small' 
                            color="inherit" 
                            onClick={() => toggleDrawer()} 
                            style={{...navBarItemStyle, marginLeft:'10px'}}>
                            <MenuIcon />
                        </IconButton>
                    }

                    
                    <div onClick={() => {history.push('/')}} style={{display:'flex', cursor:'pointer'}}>
                        {!isMobile && <img width={45} height={45} style={{alignSelf:'center'}} src='/logo256.png' alt='logo'/>}
                        <Typography variant="h6" style={{alignSelf:'center', marginLeft:5}}>
                            TH RANKER
                        </Typography>
                    </div>
                </div>
                {!isMobile && <div style={navBarItemStyle}>
                    {
                        navList.map(item => 
                            <Button 
                                component={(props) => <NavLink to={item.url} exact={item.url==='/'} activeStyle={buttonSelectedStyle} {...props} />} 
                                color="inherit" 
                                style={{marginLeft:'10px'}}
                            >
                                {item.name}
                            </Button>
                        )
                    }
                </div>}
            </AppBar>
            <Container>
                <Box pt={3}>{children}</Box>
            </Container>
            </>
        }
        </MediaQuery>
    )
} 
