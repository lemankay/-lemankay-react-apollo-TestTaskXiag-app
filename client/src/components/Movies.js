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
    const { loading, error, data } = useQuery(FETCH_MOVIES);
    console.log(data);
    if (loading) return <div> <Loading /> </div>;
    if (error) return <div>Error :</div>; 

   return ( 
      <Grid container justify="center"  spacing={2}>
          {data.getMovies.map( (movie,index)  =>  
                  <Grid key={index} item xs={12}>
                    <Movie title={movie.title}date={movie.date}username={movie.username}yes={movie.yes}no={movie.no} />  
                  </Grid>
                  )
          }
     </Grid>       
   )
}
export default Movies

const Movie = ({ title, date,username,yes,no}) => {
    const classes = useStyles();
  const [name, setName] = React.useState(username);
  // const [yesTo, setYes] = React.useState(yes);
  // const [noTo, setNo] = React.useState(no);
  
////////////////////////////////////////////////
  const createData = (name, yes, no) => {  return { name,  yes, no }; }

  const [rows, setRows] = React.useState([ createData(name, yes, no)  ] );
//////////////////////////////////////
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };
    ///////////////////////////////
      const [state, setState] = React.useState({
      yesOk: false,
      noOk: false,
    });
    const handleChangeCheckbox = (event) => {
      setState({ ...state, [event.target.name]: event.target.checked });
    };
  /////////////////////////////////////////////////////
  const [open, setOpen] = React.useState(false);
  const { user } = useContext(AuthContext)
  const [values, setValues] = React.useState({
    username: '',
  });
const yesFunc = () => { if(!state.yesOk){return "No"}}
const noFunc = () => { if(!state.noOk){return "Yes"}}

  let formSubmit = e => {
      e.preventDefault();   
      setRows([...rows, createData(user.username, noFunc(), yesFunc()) ]  )
      setOpen(true)      
    } 
  let handleChange = e => { setValues({ ...values, [e.target.name]: e.target.value }); } 
  let handleClose = () => {setOpen(false)}
    return (
      <Card className={classes.root} variant="elevation">
            <CardActionArea>
              <CardMedia image={cat} title={title} className={classes.media} />
            </CardActionArea>         
        <CardContent>
        <Grid container >
          <Grid item xs>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    {date}
                </Typography>
                <Typography variant="h5" component="h2" >
                    {title}
                </Typography>
              
     <form onSubmit={formSubmit} className={classes.form}>
      
      <TextField 
           
            variant="outlined"
           
       
            type="text"
            name="username"
            className={classes.textField}
            value={user.username}
            onChange={handleChange}
          />
       
   
      <Button type="submit" variant="contained" className={classes.button} >
        SUBMIT
      </Button>
      {open && (
        <Alert onClose={handleClose} severity="success">
        <AlertTitle>Success</AlertTitle>
        Thanks for voting
      </Alert>
      )}
    
     
         <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend">Assign responsibility</FormLabel>
        <FormGroup>
          
          <FormControlLabel
            control={<Checkbox checked={state.yesOk} onChange={!state.noOk && handleChangeCheckbox} name="yesOk" />}
            label="Yes"
          />

          <FormControlLabel
            control={<Checkbox checked={state.noOk} onChange={!state.yesOk && handleChangeCheckbox} name="noOk" />}
            label="No"
          />
        
        </FormGroup>
  
     </FormControl>
      </form>
  
  
   

           
                <FormLabel component="legend">Results</FormLabel>

    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === 'number' ? column.format(value) : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
                  
            
          </Grid>
          <Grid item>
                <BottomNavigationAction icon={<DeleteIcon />} className={classes.icon}  />
           </Grid>
       </Grid>     
    
         </CardContent>  
         <CardActions className={classes.buttons}> 
           <Button size="small" color="secondary" className={classes.button}>
              {user.username}
              </Button>
           <Button size="small" color="primary" className={classes.button}>
             Learn more
             </Button>
         </CardActions> 
      </Card>
    )
}
