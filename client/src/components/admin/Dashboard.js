import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import NavBar from '../NavBar';
import { Link, Outlet } from 'react-router-dom'

const drawerWidth = 240;

export default function Dashboard() {

  const styled = { textDecoration: 'none', color: 'black' }
  const listStyle = { p: 3, fontSize: '20px' }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <NavBar />
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />

        <Box sx={{ overflow: 'auto', mt: 6 }} >

          <List >
            <ListItem disablePadding fullWith>
              <ListItemButton sx={listStyle} >
                <Link to='/admin' style={styled}>Dashboard</Link>
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton sx={listStyle}>
                <Link to='/admin/summary' style={styled}>Summary</Link>
              </ListItemButton>
            </ListItem> <ListItem disablePadding>
              <ListItemButton sx={listStyle}>
                <Link to='/admin/products' style={styled}>Product</Link>
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer >
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Outlet />
      </Box>
    </Box >
  );
}