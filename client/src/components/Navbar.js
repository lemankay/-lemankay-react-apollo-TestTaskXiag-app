import React from 'react';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import MovieIcon from '@material-ui/icons/Movie';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import PersonIcon from '@material-ui/icons/Person';
import AdbIcon from '@material-ui/icons/Adb';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { AuthContext } from './contex/auth';
import { useContext } from 'react';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';


const useStyles = makeStyles({
    root: {
      width: '95%',
      backgroundColor: "#f5f6c1",
      justifyContent: "flex start",
      alignItems: "center",
      marginLeft:25
    },
    login: {
        marginLeft: "auto",
        marginRight: 25,
        height: 45,
        color: "#fff",
        backgroundColor: "blue",
        borderRadius: 5,
        maxWidth: 100, 
    },
    icon: {
        color: "red",
        maxWidth: 100
    },
    logo: {
      minWidth: 65,
      maxWidth: 35,
      marginLeft: 25,
      marginRight: 40
    },
    button:{
      maxWidth: 80,
      height: 40,
    }
  });
const Navbar = () => {
  const { user, logout } = useContext(AuthContext)
    const classes = useStyles();
    
const navbarLayout = !user ? (
  <BottomNavigation   className={classes.root}>
      <BottomNavigationAction 
                            label="Question"
                            value="movies"
                            icon={<AdbIcon />}
                            className={classes.logo} 
                            showLabel={true} />
      <BottomNavigationAction 
                            label="Movies" 
                            icon={<MovieIcon />} 
                            className={classes.icon}
                            component={Link}
                             to="/"
    />

  
  <BottomNavigationAction  
                            icon={<PersonIcon/>}
                            className={classes.login}
                            component={Link}
                            to="/login" 
                            label={<span>Login</span>}
                            showLabel={true}/>
      <BottomNavigationAction     
                            icon={<PersonAddIcon/>}
                            className={classes.register}  
                            component={Link}
                            to="/register" 
                            label={<span>Rwgister</span>}
                            showLabel={true} />
  </BottomNavigation>
  ) : (
    <BottomNavigation  
                        className={classes.root}>
    <BottomNavigationAction 
                          label="Movies" 
                          value="movies" 
                          icon={<AdbIcon />}
                          className={classes.logo}/>
    <BottomNavigationAction 
                          label="Movies" 
                          icon={<MovieIcon />} 
                          className={classes.icon}
                          component={Link}
                           to="/"
  />
<BottomNavigationAction 
                          label="Ask"
                          icon={<AddIcon />}
                          className={classes.icon}
                          component={Link}
                          to="/movies" />
                        
                         
<BottomNavigationAction  
                    
                          className={classes.login}
                          label={<span>{user.username}</span>}
                          showLabel={true}
                          />
    <BottomNavigationAction     
                          icon={<ExitToAppIcon />}
                          className={classes.register}  
                          label={<span>Logout</span>}
                          showLabel={true}
                          onClick={logout}
                          />
</BottomNavigation>
  )
return navbarLayout;
}

export default Navbar
