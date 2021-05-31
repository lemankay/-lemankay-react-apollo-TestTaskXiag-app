
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, FormControl, InputLabel, MenuItem, Select, TextField, FormLabel, Grid } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import { gql, useMutation } from '@apollo/client';
//import Loading from './Loading';
import FETCH_MOVIES from './util/gql';

 const useStyles = makeStyles((theme)=> ({
    error: {
        fontSize: 14,
        marginBottom: 10,
        color: "red",
        width: "100%",
        marginTop: 10
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
       formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
      },
   textField: {
         width: "100%",
         marginBottom: 25
       },
       title: {
        textAlign: "center",
       },
       button:{
        background:"#e3dddd" , 
        width:"120px",
        height:"50px"
      },
        root: {
          width: "600px",
          margin: 20,
          backgroundColor: "#f1f5c1",
        },
 }))


const AddPost = () => {
    const classes = useStyles();
    const [errors, setErrors] = React.useState('');
    const [open, setOpen] = React.useState(false);
    const [values, setValues] = React.useState({
      title: '',
      date: new Date().getFullYear() 
    });
    const [addPost] = useMutation(ADD_POST, {
      variables:  values,
        update(cache, {data: {addMovie}} ) {
           if(cache.data.data.ROOT_QUERY) {
             const movies = cache.readQuery({
               query: FETCH_MOVIES
             });
             cache.writeQuery({
                query: FETCH_MOVIES,
                data: { getMovies: [addMovie, ...movies.getMovies], },
             });
           }
           setValues({
             title: '',
             date: new Date().getFullYear()
           })
           setErrors('')
          setOpen(true)
        },
        onError(e) {
          setErrors(e.graphQLErrors[0].message);
          
        },          
    });
    console.log(values);

    let handleChange = (event) => {
      setValues({ ...values, [event.target.name]: event.target.value });
      } 
    let formSubmit = e => {
      e.preventDefault();    
      addPost();
    } 
 
  let years = [];
  for(let i = 2000; i <= values.date; i++) { years.push(i); }
let handleClose = () => {setOpen(false)}
    return (
      <>
     
        <form  className={classes.form} onSubmit={formSubmit}>

        <Grid className={classes.root} container justify="center"  spacing={2}>
          <h2 className={classes.title}>Ask a question</h2>
        <Grid container justify="center"  spacing={2}>
        <FormLabel component="legend">Question::</FormLabel>
          <TextField
            variant="outlined"
            label="Ask a question to vote"
             type="text"
               name="title"
            
            error={errors.username ? true : false}
            helperText={ errors.username ? errors.username : "Enter your best question"}
              fullWidth 
            className={classes.textField}
            value={values.title}
            onChange={handleChange}
          />
     </Grid>
     <Grid container justify="center"  spacing={2}>
        <FormLabel component="legend">Answer 1:</FormLabel>
         <TextField
            variant="outlined"
            label="Enter yes"
            type="text"
            name="yes"
            
            error={errors.username ? true : false}
            helperText={ errors.username ? errors.username : "Enter yes"}
            fullWidth 
            className={classes.textField}
            value={values.yes}
            onChange={handleChange}
          />
              </Grid> 
              <Grid container justify="center"  spacing={2}>
        <FormLabel component="legend">Answer 2:</FormLabel>
         <TextField
            variant="outlined"
            label="Enter no"
            type="text"
            name="no"
            
            error={errors.username ? true : false}
            helperText={ errors.username ? errors.username : "Enter no"}
            fullWidth 
            className={classes.textField}
            value={values.no}
            onChange={handleChange}
          />
             </Grid>  
            
        <FormControl  variant="filled" className={classes.formControl}>
              <InputLabel>Year</InputLabel>
              <Select
              className={classes.select}
                    name="date"
                    value={values.date}
                    onChange={handleChange}
                  >
                  {years.map((year, id) =>{return <MenuItem key={id} value={year}>{year}</MenuItem> } )} 
               </Select>
      </FormControl>
 
      <Button type="submit" variant="contained" className={classes.button} >
        START
      </Button>
      {open && (
        <Alert onClose={handleClose} severity="success">
        <AlertTitle>Success</AlertTitle>
        A post added <strong>successfull</strong>
      </Alert>
      )}
         </Grid>
        </form>

        </>
    )
}

const ADD_POST = gql`
  mutation AddMovie($title: String!, $date: Int,$yes:String,$no:String)
   {
    addMovie(title: $title, date: $date, yes:$yes, no:$no) {
      title
      date
      yes
      no
    }
  }
`;

export default AddPost;