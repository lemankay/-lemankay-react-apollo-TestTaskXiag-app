import React, { useContext } from 'react'
import { useQuery } from '@apollo/client';
import { AuthContext } from './contex/auth';
import { Button, CardActionArea, CardActions, CardMedia, FormControl, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import DeleteIcon from '@material-ui/icons/Delete';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Loading from './Loading';
import { Grid } from '@material-ui/core';
import FETCH_MOVIES from './util/gql';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

import cat from './images/cat.png'
//////////////////

import FormLabel from '@material-ui/core/FormLabel';


import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import Checkbox from '@material-ui/core/Checkbox';
import { Alert, AlertTitle } from '@material-ui/lab';
////////////////////////////
const columns = [
  { id: 'name', label: 'Name', minWidth: 170 },
 
  {
    id: 'yes',
    label: 'Yes',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'no',
    label: 'No',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },

];

const useStyles = makeStyles((theme) => ({
    root: {
      margin: 20,
      backgroundColor: "#f1f5c1",
    },
    title: {
      
    },  
    icon: {
  
      height: 60, 
  },
  formControl: {
    margin: theme.spacing(3),
  },
  container: {
    maxHeight: 440,
  },
  media: {
    width:100,
    height: 100,
    
  },
  }));
  
const Movies = () => {
 
   )
}
export default Movies

const Movie = ({ title, date,username,yes,no}) => {

    )
}
