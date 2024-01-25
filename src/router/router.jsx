import React from 'react';
import { Route, Routes } from 'react-router-dom';
import SignIn from '../pages/SignIn';
import Home from '../pages/Home';
import Profile from '../pages/Profile';
import SignUp from '../pages/SignUp';
import Navbar from '../components/Navbar';

const Router = () => {
  return (
    // <Routes>
    //   <Route path='/signin' element={<SignIn />} />
    //   <Route path='/signup' element={<SignUp />} />
    //   <Route path='/' element={<Home />} />
    //   <Route path='/profile' element={<Profile />} />
    //   <Route path='/nav' element={<Navbar />} />

    // </Routes>
    <Routes>
      <Route path='/' element={<Navbar />}>
        <Route path='/home' element={<Home />} />
        <Route path='/profile' element={<Profile />} />
      </Route>
      <Route path='/signin' element={<SignIn />} />
      <Route path='/signup' element={<SignUp />} />
    </Routes>
  );
};

export default Router;
