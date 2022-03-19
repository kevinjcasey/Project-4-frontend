import axios from 'axios'
import React, { useState, useEffect } from 'react'
import App from '../App'
import { 
    Button, 
    IconButton, 
    Snackbar, 
    TextField,
    Alert
  } from '@mui/material'

const Add = (props) => {

    let emptyFlashcard = {
        subject: '', 
        question: '', 
        answer: '' 
    }

    const [flashcards, setFlashcards] = useState([emptyFlashcard])

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
        setFlashcards({...flashcards, [event.target.name]: event.target.value})
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        props.handleCreate(flashcards)
    }

    return(
        <center>
            <br  />
            <h3>Index Cards On the Flash</h3>
            <br  />
            <form onSubmit={handleSubmit}>
            
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
        </center>
    )
}

export default Add