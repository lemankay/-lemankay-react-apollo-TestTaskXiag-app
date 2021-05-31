import React, { useContext } from 'react';
import { AuthContext } from './contex/auth';
import { Redirect } from 'react-router-dom';
import Movies from './Movies'

const Home = () => {        
     const { user } = useContext(AuthContext);
     return !user ?  <Redirect to="/login" /> :  <Movies /> 
}

export default Home
