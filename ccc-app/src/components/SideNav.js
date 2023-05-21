/*
COMP90024 Project 2 2023
Contributer
Aobo Li              1172339
Pavith Samarakoon    1297058
Zhihao Liang         1367102
Jiqiang Chen         1171420
Yijun Liu            1132416
*/
import * as React from 'react';
import { NavLink } from 'react-router-dom';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

const drawerWidth = 240;

export default function SideNav() {
    const navInfo = [{'label': 'Home', 'link': '/'}, {'label': 'Ukraine-Russia War', 'link': '/Scenario1'},
    {'label': 'LGBTQ', 'link': '/Scenario2'}, {'label': 'Time', 'link': '/Scenario3'}]

    return (
    <>
    <CssBaseline />
    <AppBar
        
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}>
        <Toolbar>
                <Typography variant="h4" noWrap component="div">
                    CCC Team 14
                </Typography>
            </Toolbar>
    </AppBar>
    <Drawer
        sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
                width: drawerWidth,
                boxSizing: 'border-box',
            },
            color: "#c5eceb"
        }}
        variant="permanent"
        anchor="left"
    >
        <Toolbar />
        <Divider />
        <List>
            {navInfo.map((page, index) => (
                <ListItem key={page.label} disablePadding>
                    <ListItemButton component={NavLink} to={page.link}>
                        <ListItemText primary={page.label} />
                    </ListItemButton>
                </ListItem>
            ))}
        </List>
        <Divider />
    </Drawer>
    </>
  );
}