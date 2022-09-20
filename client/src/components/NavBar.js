import React from 'react'
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import { AppBar, Box, Toolbar, IconButton, Typography, InputBase, Avatar, Badge } from '@mui/material'
import { Link } from "react-router-dom"
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../features/authSlice';
import { toast } from 'react-toastify';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));


const NavBar = () => {
  const dispatch = useDispatch()
  const { cartTotalQuantity } = useSelector(state => state.cart)
  const auth = useSelector(state => state.auth)

  return (
    <div> <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"

          >
            <Link to='/'>
              <Avatar variant="rounded" src='/photo/logo.png' />
            </Link>
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 3 }}
          >
            Book Store
          </Typography>
          <Search
            sx={{ flexGrow: 1 }}
          >
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Happy Reading"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
          {auth._id ?
            <Typography sx={{ ml: 3 }}>
              <Link to='/' style={{ textDecoration: 'none', color: 'white' }} onClick={() => {
                dispatch(logoutUser(null))
                toast.warning("Logged Out", { position: "bottom-left" })
              }}>

                Logout</Link></Typography> :
            <Box sx={{ display: 'flex' }}>
              <Typography sx={{ mr: 1, ml: 1 }}><Link to='/login' style={{ textDecoration: 'none', color: 'white' }}>Login</Link></Typography>
              <Typography sx={{ mr: 1, ml: 1 }}><Link to='/register' style={{ textDecoration: 'none', color: 'white' }}>Register</Link></Typography>
            </Box>
          }
          <IconButton variant="rounded" size="small" aria-label="item" color="inherit" sx={{ mr: 3, ml: 3 }}>
            <Badge badgeContent={cartTotalQuantity} color="error">
              <Link to='/cart' style={{ textDecoration: 'none', color: 'white' }}>
                <ShoppingCartIcon />
              </Link>
            </Badge>
          </IconButton>


        </Toolbar>
      </AppBar>
    </Box></div >
  )
}

export default NavBar