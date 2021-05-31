import React from 'react'
import { useContext } from 'react'
import {  Route, Redirect } from 'react-router-dom'
import { AuthContext } from './contex/auth'

const AuthRoute = ({ component: Component, ...args }) => {
    const { user } = useContext(AuthContext)
    return (
      <Route {...args}  render={(props) => !user ? <Component {...props} /> : <Redirect to="/" />} 
       />   
    )
}

export default AuthRoute
