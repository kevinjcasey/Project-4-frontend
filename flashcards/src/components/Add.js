
import App from "../App";
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Home } from './Home'
import { 
    Button, 
    IconButton, 
    Snackbar, 
    TextField,
    Alert
  } from '@mui/material'

export const Add = () => {

    let emptyFlashcard = {
        subject: "",
        question: "",
        answer: "",
    };

    const [flashcards, setFlashcards] = useState([emptyFlashcard]);

    const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };


    const handleChange = (event) => {
        setFlashcards({ ...flashcards, [event.target.name]: event.target.value });
    };

    const form = document.getElementById("addForm");

    const handleCreate = (addFlashcard)  => {
        axios
             .post('http://localhost:8000/api/flashcards', addFlashcard)
             .then((response)=> {
                setFlashcards([response.data])
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        handleCreate(flashcards);
        form.reset();
    };

    return (
        <center>
            <br  />
            <h3>Add New Index Card</h3>
            <br  />
            <form onSubmit={handleSubmit}  id="addForm">
            
                <TextField
                label='Subject'
                name='subject'
                id="outlined-size-small"
                size="small"
                type='text'
                onChange={handleChange}/>
                <br />
                <br />
                
                <TextField
                label='Question'
                name='question'
                id="outlined-size-small"
                size="small"
                type='text'
                onChange={handleChange}/>
                <br />
                <br />
                
                <TextField
                label='Answer'
                name='answer'
                id="outlined-size-small"
                size="small"
                type='text'
                onChange={handleChange}/>
                <br />
                <br />


            <Button
            type='submit'
            variant="contained"
            color="success"
            onClick={handleClick}
            >Submit
            </Button>
            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Index Card Created
        </Alert>
      </Snackbar>
            </form>
            <br />
        </center>
    );
};

export default Add;