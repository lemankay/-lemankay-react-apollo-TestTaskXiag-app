
import React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import cat from './images/cat.png'
import { Button } from '@material-ui/core';
import { gql, useMutation } from '@apollo/client';
import { withRouter } from 'react-router-dom';
import { AuthContext } from './contex/auth';
import { useContext } from 'react';
import Loading from './Loading';



const useStyles = makeStyles((theme) => ({
  form: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: 400,
      textAlign: "center",
     
    },
  },
  image: {
 textAlign: "center",
 margin: "10px auto"
     },
 textField: {
       width: "100%",
       marginBottom: 20
     },
  title: {
      textAlign: "center",
     },
  button:{
    background:"gold" , 
    width:"80px"}
}));

const Register = (props) => {
  const context = useContext(AuthContext )
  const classes = useStyles();
  const [errors, setErrors] = React.useState({})
  const [values, setValues] = React.useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [addUser, { loading }] = useMutation(REGISTER_USER, {
  
    update( _, {data:{register:user}}){
      console.log(user);
      context.login(user)
      props.history.push('/');
    },
    onError(error) {
       setErrors(error.graphQLErrors[0].extensions.exception.errors)
       console.log(error)
    },
    variables: values
  });
  console.log(addUser);
  if (loading) return <div> <Loading /> </div>;
  let handleChange = e => {
  setValues({ ...values, [e.target.name]: e.target.value });
  } 
  
  let formSubmit = e => {
    e.preventDefault();   
    addUser();         
  }
  return (
      <>
      <div className={classes.image}>
        <img src={cat} alt="Cat"/>
      </div>
      <h2 className={classes.title}>Register</h2>
    <form className={classes.form}  onSubmit={formSubmit} >
      <div>
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
        error={errors.email ? true : false}
           variant="outlined"
           label="Email"
           helperText={ errors.email ? errors.email : "Enter your best email"}
           type="email"
           name="email"
           className={classes.textField}
           value={values.email}
           onChange={handleChange}
        />
           <TextField
        error={errors.password ? true : false}
           variant="outlined"
           label="Password"  
           helperText={ errors.password  ? errors.password : "Enter your best password"}   
           type="password"
           name="password"
           className={classes.textField}
           value={values.password}
           onChange={handleChange}
        />

        <TextField
        error={errors.confirmPassword ? true : false}
           variant="outlined"
           label="Confirm Password"   
           helperText={ errors.confirmPassword ?errors.confirmPassword : "Please confirm password"}         
           type="password"
           name="confirmPassword"
           className={classes.textField}
           value={values.confirmPassword}
           onChange={handleChange}
        />  
        <Button type="submit" className={classes.button} >
          Submit
        </Button>  
        </div>
    </form>
    </>
  );
}
export default withRouter(Register);

const REGISTER_USER = gql`
  mutation register(
       $email: String!
       $password: String! 
       $confirmPassword: String!  
       $username: String!  
      ) {
        register(
           email:$email
           password:$password
           confirmPassword:$confirmPassword  
           username:$username 
        ){
        id 
        email 
        username 
        token 
      }     
      }
`;