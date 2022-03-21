import React, { useState } from 'react'
import axios from 'axios'

import {
  Alert,
  Button, 
  Snackbar, 
  TextField,
  } from '@mui/material'

// ============== MUI Theme ============== //

import { ThemeProvider, createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    secondary: {
      main: '#fefefe'
    }
  },
  typography: {
    fontFamily: 'Fredoka',
    fontWeightLight: '400',
    fontWeightLight: '500',
    fontWeightLight: '600',
    fontWeightLight: '700',
  }
})
// =========== ^^MUI Theme^^ ============= //

export const Add = () => {

  let emptyFlashcard = {
    subject: "",
    question: "",
    answer: "",
  };

  const [flashcards, setFlashcards] = useState([emptyFlashcard])

  // ========= SnackBar ========== // 

  const [open, setOpen] = React.useState(false)

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false)
  };

  const handleChange = (event) => {
    setFlashcards({ ...flashcards, [event.target.name]: event.target.value })
  };

  const form = document.getElementById("addForm")

  const handleCreate = (addFlashcard)  => {
    axios
      .post('http://localhost:8000/api/flashcards', addFlashcard)
      .then((response)=> {
        setFlashcards([response.data])
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    handleCreate(flashcards)
    form.reset()
  }

  return (
    <ThemeProvider theme={theme}>
      <center>
        <br/>
        <h3>Add A New Flash Card</h3>
        <br/>
        <form onSubmit={handleSubmit}  id="addForm">

          <TextField
            label='Subject'
            name='subject'
            id="outlined-size-small"
            size="small"
            type='text'
            onChange={handleChange}
          />
          <br/>
          <br/>
          <TextField
            label='Question'
            name='question'
            id="outlined-size-small"
            size="small"
            type='text'
            onChange={handleChange}
          />
          <br/>
          <br/>
          <TextField
            label='Answer'
            name='answer'
            id="outlined-size-small"
            size="small"
            type='text'
            onChange={handleChange}
          />
          <br/>
          <br/>
          
        <Button
          type='submit'
          variant="contained"
          color="success"
          onClick={handleClick}
        >
        Submit
        </Button>

        {/* --- SnackBar --- */}
        <Snackbar 
          open={open} 
          autoHideDuration={3000} 
          onClose={handleClose}
        >
          <Alert 
            onClose={handleClose} 
            severity="success" 
            sx={{ width: '100%' }}
          >
          Index Card Created
          </Alert>
        </Snackbar>
        </form>
      </center>
    </ThemeProvider>
  )
}

export default Add;
