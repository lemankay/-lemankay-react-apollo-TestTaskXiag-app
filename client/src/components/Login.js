/* eslint-disable no-unused-vars */
import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, TextField } from '@material-ui/core';
import {  gql } from '@apollo/client';
import { withRouter } from 'react-router-dom';
import { AuthContext } from './contex/auth';
import  { useMutation } from '@apollo/client';


const useStyles = makeStyles((theme) => ({
    error: {
        fontSize: 14,
        marginBottom: 10,
        color: "red"
    },
    form: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: 400,
        textAlign: "center"
      },
    },
    image: {
        textAlign: "center",
        margin: "20px auto"
       },
   textField: {
         width: "100%",
         marginBottom: 25
       },
       title: {
        textAlign: "center",
       },
       button:{
        background:"gold" , 
        width:"80px"}
  }));
const Login = (props) => {
   const context = useContext(AuthContext)
    const classes = useStyles();
    const [errors, setErrors] = React.useState({})
    const [values, setValues] = React.useState({
      username: '',
      password: '', 
    });

    const [addUser, {  loading }] = useMutation (REGISTER_USER, {
      update( _, {data:{login:userData}}){
        context.login(userData)
        props.history.push('/');
      },
      onError(err) {
        setErrors(err.graphQLErrors[0].extensions.exception.errors)
      },
      variables:values
    });
    let formSubmit = e => {
        e.preventDefault();   
        addUser();         
      } 
    let handleChange = e => {
      setValues({ ...values, [e.target.name]: e.target.value });
      }     
return(
    <>
       <h2 className={classes.title}>Log In</h2>
    <form onSubmit={formSubmit} className={classes.form}>
      
    <TextField 
          error={errors.username ? true : false}
          variant="outlined"
          label="Username"
          helperText={ errors.username ? errors.username : "Enter your best username"}
          type="text"
          name="username"
          className={classes.textField}
          value={values.username}
          onChange={handleChange}
        />
            <TextField
        error={errors.password ? true : false}
           variant="outlined"
           label="Password"  
           helperText={errors.password  ? errors.password : "Enter your best password"}   
           type="password"
           name="password"
           className={classes.textField}
           value={values.password}
           onChange={handleChange}
        />
     
     {errors.general && <div className={classes.error}>{errors.general}</div>}
     
        <Button type="submit" className={classes.button}>
          Submit
        </Button>
     
    </form>
    </>
)
};
export default withRouter(Login);

const REGISTER_USER = gql`
  mutation login(  $username: String!,$password: String!,) {
        login(  username:$username, password:$password, ){
        id
        username
        token 
      }     
      }
`;



