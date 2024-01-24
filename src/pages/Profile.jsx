import React, { useEffect, useRef, useState } from 'react';
import {
  Container,
  Grid,
  Typography,
  Avatar,
  Card,
  CardContent,
  Divider,
  Button,
  Tooltip,
  Box,
} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { useDispatch, useSelector } from 'react-redux';
import {
  getStorage,
  uploadBytesResumable,
  ref,
  getDownloadURL,
} from 'firebase/storage';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { app } from '../firebase';
import EditProfile from '../components/EditProfile';
import { updateUserSuccess } from '../redux/user/userSlice';
import axios from 'axios';

function CircularProgressWithLabel(props) {
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress variant='determinate' {...props} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Typography variant='caption' component='div' color='text.secondary'>
          {props.value}
        </Typography>
      </Box>
    </Box>
  );
}

export default function ProfilePage() {
  const { currentUser } = useSelector((state) => state.user);
  const photoRef = useRef(null);
  const [image, setImage] = useState(undefined);
  const [imagePercent, setImagePercent] = useState(0);
  const [imageError, setimageError] = useState(false);
  const [formData, setformData] = useState(currentUser.data);

  const dispatch = useDispatch();

  // Modal Things
  const [openModal, setOpenModal] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleChange = (e) => {
    setformData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleModalClickOpen = () => {
    setOpenModal(true);
  };

  const handleModalClose = () => {
    setOpenModal(false);
  };

  const handleFileUpload = async (image) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);
    //Below code is for the image uploaded to firebase storage and then we get the url of our image in the formData
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImagePercent(Math.round(progress));
      },
      (error) => {
        setimageError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setformData({ ...formData, profilePhoto: downloadURL })
        );
      }
    );
  };

  //API Calling
  const handleDataSubmit = async () => {
    try {
      const response = await axios.post(
        `http://localhost:4000/api/user/update/${currentUser.data._id}`,
        {
          formData,
        },
        {
          withCredentials: true,
        }
      );

      dispatch(updateUserSuccess(response));
      handleModalClose();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (image) handleFileUpload(image);
  }, [image]);

  return (
    <section>
      <Container sx={{ paddingY: 2 }}>
        <Grid container spacing={3}>
          <Grid item lg={12}>
            <Card
              sx={{
                boxShadow: 'none',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}>
              <input
                type='file'
                ref={photoRef}
                hidden
                accept='image/*'
                onChange={(e) => setImage(e.target.files[0])}
              />
              <Avatar
                onClick={() => photoRef.current.click()}
                src={
                  'https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp'
                }
                alt='avatar'
                style={{
                  width: '150px',
                  borderRadius: '50% !important',
                  height: 'auto',
                }}
              />
              <p style={{ textAlign: 'center', fontSize: '1rem' }}>
                {imageError ? (
                  <span style={{ color: 'red' }}>
                    Error uploading image (file size must be less than 2 MB)
                  </span>
                ) : imagePercent > 0 && imagePercent < 100 ? (
                  <CircularProgressWithLabel value={imagePercent} />
                ) : imagePercent === 100 ? (
                  <span style={{ color: 'green' }}>
                    Image uploaded successfully
                  </span>
                ) : (
                  ''
                )}
              </p>
              <Typography
                variant='body2'
                sx={{
                  mb: '1rem !important',
                  fontSize: '1.25rem',
                  fontWeight: 500,
                }}>
                {`${currentUser.data?.firstname} ${currentUser.data?.lastname}`}
              </Typography>
              <Typography
                variant='body2'
                sx={{ color: '#757575 !important', mb: '.25rem' }}>
                Full Stack Developer
              </Typography>
              <Tooltip title='Edit Profile Details'>
                <Button onClick={handleModalClickOpen}>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 512 512'
                    width={22}>
                    <path d='M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 256.2L344 121.9 390.1 168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 16.7 16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4 64 0 103.4 0 152V424c0 48.6 39.4 88 88 88H360c48.6 0 88-39.4 88-88V312c0-13.3-10.7-24-24-24s-24 10.7-24 24V424c0 22.1-17.9 40-40 40H88c-22.1 0-40-17.9-40-40V152c0-22.1 17.9-40 40-40H200c13.3 0 24-10.7 24-24s-10.7-24-24-24H88z' />
                  </svg>
                </Button>
              </Tooltip>
              <Card sx={{ boxShadow: 'none', width: '60%' }}>
                <CardContent>
                  {[
                    {
                      label: 'Full Name',
                      value: `${currentUser.data?.firstname} ${currentUser.data?.lastname}`,
                    },
                    { label: 'Email', value: currentUser.data?.email },
                    { label: 'Phone', value: '(097) 234-5678' },
                    { label: 'Mobile', value: '(098) 765-4321' },
                  ].map((item, index) => (
                    <React.Fragment key={index}>
                      <Grid container spacing={1} sx={{ my: '.5rem' }}>
                        <Grid item xs={6}>
                          <Typography
                            variant='body1'
                            sx={{ textAlign: 'center' }}>
                            {item.label}
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography
                            variant='body2'
                            sx={{
                              textAlign: 'center',
                              color: '#757575!important',
                            }}
                            className='text-muted'>
                            {item.value}
                          </Typography>
                        </Grid>
                      </Grid>
                    </React.Fragment>
                  ))}
                </CardContent>
              </Card>

              <Divider />
            </Card>
          </Grid>
        </Grid>
      </Container>
      <EditProfile
        currentUser={currentUser}
        fullScreen={fullScreen}
        open={openModal}
        handleClose={handleModalClose}
        handleChange={handleChange}
        handleDataSubmit={handleDataSubmit}
      />
    </section>
  );
}
