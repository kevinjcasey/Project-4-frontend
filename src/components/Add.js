import React, { useState } from 'react'
import axios from 'axios'

import {
  Alert,
  AppBar,
  Button, 
  Snackbar, 
  TextField,
  Toolbar
  } from '@mui/material'

import LinkedInIcon from '@mui/icons-material/LinkedIn'
import GitHubIcon from '@mui/icons-material/GitHub'

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
    <AppBar
        id="AppBar"
        position="fixed"
        gutterBottom
        className='app'
        sx={{ top: 'auto', bottom: -40 }}
      >
        <Toolbar className='footer'>
          <div>
            <a  className='link'href='https://www.linkedin.com/in/kris-garcia-3b7292146/'><LinkedInIcon/></a>
            <a className='git' href='https://github.com/Weeechi'><GitHubIcon className='gitKris'/></a>
            <h4>Kris Garcia</h4>
          </div>
          <div className='div'>
            <a  className='link'href='https://www.linkedin.com/in/kevin-j-casey/'><LinkedInIcon/></a>
            <a  href='https://github.com/kevinjcasey'><GitHubIcon className='gitKev'/></a>
            <h4 className='namekev'>Kevin J Casey</h4>
          </div>
          <div className='div'>
            <a  className='link'href='https://www.linkedin.com/in/angelvalentin1/'><LinkedInIcon/></a>
            <a className='gitAngel' href='https://github.com/angelgvalentin'><GitHubIcon className='gitAngel'/></a>
          <h4 className='namekev'>Angel Valentin</h4>
          </div>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
    
  )
}

export default Add;
