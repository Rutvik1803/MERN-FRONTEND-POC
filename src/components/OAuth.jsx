import { Button, Typography } from '@mui/material';
import React from 'react';
import GoogleIcon from '@mui/icons-material/Google';
import { GoogleAuthProvider, signInWithPopup, getAuth } from '@firebase/auth';
import { app } from '../firebase';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';

const OAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      const [fname, lname] = result.user.displayName.split(' ');

      const response = await axios.post(
        'http://localhost:4000/api/auth/google',
        {
          fname,
          lname,
          email: result.user.email,
          photo: result.user.photoURL,
        }
      );

      dispatch(signInSuccess(response));
      navigate('/home');
    } catch (error) {}
  };
  return (
    <>
      <Typography
        variant='body2'
        color='textSecondary'
        sx={{ display: 'flex', justifyContent: 'center' }}>
        OR
      </Typography>
      <Button
        onClick={handleGoogleClick}
        type='submit'
        fullWidth
        variant='contained'
        sx={{
          mt: 3,
          mb: 2,
          backgroundColor: 'black',
          '&:hover': {
            backgroundColor: 'white',
            color: 'black',
          },
        }}>
        CONTINUE WITH &nbsp;
        <GoogleIcon />
      </Button>
    </>
  );
};

export default OAuth;
