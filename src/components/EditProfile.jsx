import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, Grid, IconButton, TextField, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Visibility, VisibilityOff } from '@mui/icons-material';

export default function EditProfile({
  fullScreen,
  open,
  handleClose,
  handleChange,
  currentUser,
  handleDataSubmit,
}) {
  const [showPassword, setShowPassword] = React.useState(false); // Add this line

  return (
    <>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby='responsive-dialog-title'>
        <DialogTitle id='responsive-dialog-title'>
          <Typography fontSize='2rem' align='center'>
            Update Profile
          </Typography>
          <IconButton
            edge='end'
            color='inherit'
            onClick={handleClose}
            aria-label='close'
            sx={{ position: 'absolute', right: 12, top: 10 }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  defaultValue={currentUser.data?.firstname}
                  autoComplete='given-name'
                  name='firstName'
                  required
                  fullWidth
                  id='firstName'
                  label='First Name'
                  autoFocus
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  defaultValue={currentUser.data?.lastname}
                  required
                  fullWidth
                  id='lastName'
                  label='Last Name'
                  name='lastName'
                  autoComplete='family-name'
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  defaultValue={currentUser.data?.email}
                  required
                  fullWidth
                  id='email'
                  label='Email Address'
                  name='email'
                  autoComplete='email'
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name='password'
                  label='Password'
                  type={showPassword ? 'text' : 'password'}
                  // type='password'
                  id='password'
                  autoComplete='new-password'
                  onChange={handleChange}
                  InputProps={{
                    endAdornment: (
                      <IconButton
                        aria-label='toggle password visibility'
                        onClick={() => setShowPassword(!showPassword)}
                        edge='end'>
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    ),
                  }}
                />
              </Grid>
            </Grid>
            <Button
              onClick={handleDataSubmit}
              //   onClick={handleSubmit}
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
              {/* {isLoading ? 'Loading...' : 'SignUp'} */}
              Update
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}
