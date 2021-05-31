/* eslint-disable no-unused-vars */
import React from 'react';
import './App.css';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { BrowserRouter as Router} from "react-router-dom";
import Routes from './components/Routes';
import Navbar from './components/Navbar';
import { AuthProvider } from './components/contex/auth';


  const App = () => {
    return (
    <AuthProvider>
      <Router>      
        <CssBaseline />
          <Container maxWidth="lg">
            <Typography component="div"style={{ backgroundColor: '#cfe8fc', height: '500vh' }} >
         
                <div style={{textAlign: "center"}}> <h2>Ask a question to vote 🚀</h2></div>
            
                  <Navbar />        
                  <Routes /> 
                 
            </Typography>
        </Container>     
        </Router>   
    </AuthProvider>  
    );
  }

export default App;
