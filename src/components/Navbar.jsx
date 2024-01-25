import {
  AppBar,
  Avatar,
  Box,
  Container,
  Grid,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
  Link,
  Menu,
  MenuItem,
} from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import { signOutSuccess } from '../redux/user/userSlice';

function Copyright(props) {
  return (
    <Typography
      variant='body2'
      color='text.secondary'
      align='center'
      {...props}>
      {'Copyright © '}
      <Link color='inherit' href='https://mui.com/'>
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [anchorElUser, setAnchorElUser] = useState(null);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    if (!currentUser) navigate('/signin');
  }, [currentUser]);

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleSignOut = async () => {
    try {
      await axios.get('http://localhost:4000/api/auth/signout');
      dispatch(signOutSuccess());
    } catch (error) {
      console.log(error);
    }
  };

  const footers = [
    {
      title: 'Company',
      description: ['Team', 'History', 'Contact us', 'Locations'],
    },
    {
      title: 'Features',
      description: [
        'Cool stuff',
        'Random feature',
        'Team feature',
        'Developer stuff',
        'Another one',
      ],
    },
    {
      title: 'Resources',
      description: [
        'Resource',
        'Resource name',
        'Another resource',
        'Final resource',
      ],
    },
    {
      title: 'Legal',
      description: ['Privacy policy', 'Terms of use'],
    },
  ];

  return (
    <>
      <AppBar
        position='static'
        color='default'
        elevation={0}
        sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}>
        <Toolbar sx={{ flexWrap: 'wrap', justifyContent: 'space-between' }}>
          <div onClick={() => navigate('/home')} style={{ cursor: 'pointer' }}>
            <Typography
              variant='h6'
              color='inherit'
              noWrap
              sx={{ flexGrow: 1 }}>
              BLOG APP
            </Typography>
          </div>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title='Open settings'>
              <IconButton sx={{ p: 0 }} onClick={handleOpenUserMenu}>
                <Avatar
                  alt={currentUser?.data.firstname}
                  // src={currentUser.data?.profilePhoto}
                  src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp'
                />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id='menu-appbar'
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}>
              <MenuItem
                onClick={() => {
                  navigate('/profile');
                  handleCloseUserMenu();
                }}>
                <Typography textAlign='center'>Profile</Typography>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  navigate('/home');
                  handleCloseUserMenu();
                }}>
                <Typography textAlign='center'>Dashboard</Typography>
              </MenuItem>
              <MenuItem onClick={handleSignOut}>
                <Typography textAlign='center'>Logout</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      {/* All the components */}

      <Outlet />

      <Container
        maxWidth='md'
        component='footer'
        sx={{
          borderTop: (theme) => `1px solid ${theme.palette.divider}`,
          mt: 4,
          py: [3, 6],
        }}>
        <Grid container spacing={4} justifyContent='space-evenly'>
          {footers.map((footer) => (
            <Grid item xs={6} sm={3} key={footer.title}>
              <Typography variant='h6' color='text.primary' gutterBottom>
                {footer.title}
              </Typography>
              <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
                {footer.description.map((item) => (
                  <li key={item}>
                    <Link href='#' variant='subtitle1' color='text.secondary'>
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </Grid>
          ))}
        </Grid>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </>
  );
};

export default Navbar;
