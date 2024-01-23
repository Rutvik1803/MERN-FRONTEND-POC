import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';

import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Alert, IconButton, Snackbar } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import OAuth from '../components/OAuth';


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="#">
      MERN-AUTH
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


export default function SignUp() {
  const userIntialState = {
    fname: '',
    lname: '',
    email: '',
    pass: ''
  }
  const navigate = useNavigate()
  const [formData, setformData] = useState(userIntialState);
  const [isError,setIsError] = useState(false);
  const [isLoading,setIsLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // Add this line

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnackbar(false);
  };

  const handleChange = (event) =>{
    setformData({...formData,[event.target.id]: event.target.value})
  }

  const handleSubmit = async () => {
    try{ 
      setIsLoading(true);
      await axios.post('http://localhost:4000/api/auth/signup', {
      fname: formData.firstName,
      lname: formData.lastName,
      email: formData.email,
      pass: formData.password
    })
    setIsLoading(false);
    setOpenSnackbar(true);
  }
    catch(error){
      setIsLoading(false)
      setIsError(true)
    }
  };
 

  return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 28,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'black' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box  sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  autoComplete="new-password"
                  onChange={handleChange}
                  InputProps={{
                    endAdornment: (
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    ),
                  }}
                />
              </Grid>
            </Grid>
            <Button
              onClick={handleSubmit}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2,  backgroundColor: 'black', '&:hover':{
                backgroundColor:'white', color: 'black'
              } }}
            >
              {isLoading ? 'Loading...' : 'SignUp'}
            </Button>
            <OAuth/>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/signin" sx={{color:'black'}} variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        {isError && <p style={{color: 'red', display:'flex', justifyContent:'center'}}>Something Went Wrong!</p>}
        <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical:'top',horizontal:'right'}} key={'top' +  'right'} >
          <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
            Registration Successfull!
          </Alert>
        </Snackbar>
        <Copyright sx={{ mt: 5 }} />
      </Container>
   
  );
}