import { AppBar, Box, Button, Container, Divider, Drawer, IconButton, List, ListItem, ListItemText, Typography } from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import CSS from 'csstype';
import React from "react";
import MediaQuery from "react-responsive";
import { Link, NavLink } from "react-router-dom";

const navBarItemStyle:CSS.Properties = {
    margin:'10px',
    alignSelf:'center'
}

const buttonSelectedStyle:CSS.Properties = {
    backgroundColor: '#dddddd'
}


interface State{
    opened: boolean
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

export class NavBar extends React.Component<{},State>{
    public readonly state:State = {
        opened:false
    }
    render(): React.ReactNode{
        return(
            <MediaQuery maxWidth={599}>
                {(isMobile) =>
                <>
                {isMobile && <>
                    <Drawer anchor='left' open={this.state.opened} onClose={this.toggleDrawer} style={{zIndex:999999}}>
                        <Typography variant="h6"style={{margin:'15px'}}>
                            TH Ranker
                        </Typography>
                        <Divider/>
                        <List style={{width:'200px'}}>
                            {
                                navList.map(item => 
                                    <ListItem component={(props) => <NavLink to={item.url} exact activeStyle={buttonSelectedStyle} {...props}/>} onClick={this.toggleDrawer} button>
                                        <ListItemText primary={item.name}/>
                                    </ListItem>
                                )
                            }
                        </List>
                    </Drawer>
                    </>
                }
                <AppBar position='sticky' color='default' style={{justifyContent:'space-between', flexDirection:'row', height:'55px'}} >
                    <div style={{display:'flex'}}>
                        {isMobile && 
                            <IconButton 
                                edge="start" 
                                size='small' 
                                color="inherit" 
                                onClick={this.toggleDrawer} 
                                style={{...navBarItemStyle, marginLeft:'10px'}}>
                                <MenuIcon />
                            </IconButton>
                        }
                        <Typography variant="h6" style={navBarItemStyle}>
                            TH Ranker
                        </Typography>
                    </div>
                    {!isMobile && <div style={navBarItemStyle}>
                        {
                            navList.map(item => 
                                <Button 
                                    component={(props) => <NavLink to={item.url} exact activeStyle={buttonSelectedStyle} {...props} />} 
                                    color="inherit" 
                                    style={{marginLeft:'10px',  }}
                                >
                                    {item.name}
                                </Button>
                            )
                        }
                    </div>}
                </AppBar>
                <Container>
                    <Box pt={3}>{this.props.children}</Box>
                </Container>
                </>
            }
            </MediaQuery>
        )
            
    }
    private readonly toggleDrawer = () => {
        this.setState(prevState => ({
            opened: !prevState.opened
        }))
    }
}