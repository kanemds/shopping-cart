import * as React from 'react';
import NavBar from '../NavBar';
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { Button, Drawer, Box, AppBar, CssBaseline, Toolbar, List, Typography, ListItem, ListItemButton } from '@mui/material';

const drawerWidth = 240;

export default function Dashboard() {

  const styled = { textDecoration: 'none', color: 'black' }
  const listStyle = { p: 3, fontSize: '20px' }
  const navigate = useNavigate()
  const user = useSelector(state => state.auth)

  if (!user.isAdmin) {
    return (
      <Box>
        <Typography>Please Login As Admin</Typography>
        <Button onClick={() => navigate(-1)}>Keep Shopping</Button >
      </Box>
    )
  }



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

            <ListItem disablePadding>
              <ListItemButton sx={listStyle}>
                <Link to='/admin/summary' style={styled}>Summary</Link>
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton sx={listStyle}>
                <Link to='/admin/users' style={styled}>Users</Link>
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton sx={listStyle}>
                <Link to='/admin/products' style={styled}>Product</Link>
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton sx={listStyle}>
                <Link to='/admin/orders' style={styled}>Order</Link>
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