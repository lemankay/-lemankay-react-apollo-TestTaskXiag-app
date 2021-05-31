import React from 'react'
import { Route } from 'react-router-dom';
import AuthRoute from './AuthRoute';
import Home from './Home';
import Login from './Login';
import Post from './Post';
import Register from './Register';

const Routes = () => {
    return (
        <>
            <Route exact path="/" render={()=> <Home/> }    />
            <Route path="/movies"  render={()=> <Post />}  />  
            <AuthRoute exact path="/login"  component={ Login }  />  
            <AuthRoute exact path="/register" component={ Register }  />  
            
        </>
    )
}

export default Routes
