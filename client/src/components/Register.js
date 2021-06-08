
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
