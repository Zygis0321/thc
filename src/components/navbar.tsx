import { AppBar, Box, Button, Container, Divider, Drawer, IconButton, List, ListItem, ListItemText, Typography } from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import CSS from 'csstype';
import React from "react";
import MediaQuery from "react-responsive";
import { Link } from "react-router-dom";

const navBarItemStyle:CSS.Properties = {
    margin:'10px',
    alignSelf:'center'
}

interface State{
    opened: boolean    
}

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
                            <ListItem component={(props) => <Link to='/' {...props}/>} onClick={this.toggleDrawer} button>
                                <ListItemText primary='Home'/>
                            </ListItem>
                            <ListItem component={(props) => <Link to='/players' {...props}/>} onClick={this.toggleDrawer} button>
                                <ListItemText primary='Players'/>
                            </ListItem>
                            <ListItem component={(props) => <Link to='/ranker' {...props}/>} onClick={this.toggleDrawer} button>
                                <ListItemText primary='Ranker'/>
                            </ListItem>
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
                        <Button component={(props) => <Link to='/' {...props} />} color="inherit" style={{marginLeft:'10px'}}>Home</Button>
                        <Button 
                            component={(props) => <Link to='/players' {...props} />} 
                            color="inherit" 
                            style={{marginLeft:'10px'}}
                        >
                            Players
                        </Button>
                        <Button 
                            component={(props) => <Link to='/ranker' {...props}/>} 
                            color="inherit" 
                            style={{marginLeft:'10px'}}
                        >
                            Ranker
                        </Button>
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