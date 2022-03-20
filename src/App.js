import { Routes, Route } from 'react-router-dom'
import { Home } from './components/Home'
import { Add } from './components/Add'
import { Edit } from './components/Edit'

function App(props) {

return (
    <Routes>
      <Route path='/' element={<Home />}/>
      <Route path='add' element={<Add />}/>
      <Route path='edit' element={<Edit />}/>
    </Routes>
  )
  
// ============= Everything below is Kris branch ============== //

import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Add from './components/Add'
import Edit from './components/Edit'

import { 
  Button, 
  LinearProgress,
  Container,
  Typography,
  AppBar,
  Toolbar,
  Snackbar,
  IconButton,
  Alert

} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';

// ========== MUI Carousel =========== //

import Carousel from 'react-material-ui-carousel'

// ============ MUI Theme stuff =========== //
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
// ========== ^^MUI Theme stuff^^ ========= //







function App(props) {


  const [flashcards, setFlashcards] = useState([])

  const getFlashcard = () => {
    axios
         .get('http://localhost:8000/api/flashcards')
         .then(
           (response) => setFlashcards(response.data),
           (err) => console.error(err)
         )
         .catch((error) => console.error(error))
  }

  const handleCreate = (addFlashcard) => {
    axios
         .post('http://localhost:8000/api/flashcards', addFlashcard)
         .then((response)=> {
            console.log(response);
            getFlashcard()
         })
}

  const handleDelete = (event, deletedFlashcards) => {
    axios
        .delete('http://localhost:8000/api/flashcards/' + event.target.value)
        .then((response) => {
          setFlashcards(
            flashcards.filter(x => x.id !== deletedFlashcards.id)
          )
            handleClick()

        })
  }

  const handleUpdate = (editFlashcard) => {
    console.log(editFlashcard);
    axios 
        .put('http://localhost:8000/api/flashcards/' + editFlashcard.id, editFlashcard )
        .then((respose) => {
          getFlashcard()
        })
  }

  // ========== Progress Bar stuff ========== //

  const [progress, setProgress] = useState(80)
  // ======================================== //
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };
  
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
  
    setOpen(false);
  };
  
  // ========== ^^SnackBar^^================= //


  useEffect(() => {
    getFlashcard()
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <AppBar id="AppBar" position="relative" gutterBottom>
                <Toolbar>
                    <Typography variant="h6">Home</Typography>
                </Toolbar>
            </AppBar>
            <Typography variant="h2" align="center" color="textPrimary" gutterBottom>
                FlashPrep
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
                Index Cards On the Flash
            </Typography>
      <Container >
        <div className='flashcards'>
          <Typography 
            variant="h6"
            color="primary"
            align="center"
          >
          <Carousel 
            className="carousel" 
            autoPlay={false}
            indicators={false}
            navButtonsWrapperProps={{
              style: {
                  bottom: '0',
                  top: 'unset'
              }
          }}
          >
            {flashcards.map((flashcard)=>{
              return(
                
                <div className='flashcard' key={flashcard.id}>
                <h4>-{flashcard.subject}-</h4>
                <h4>{flashcard.question}</h4>
                <h4>Answer: {flashcard.answer}</h4>
                <Edit handleUpdate={handleUpdate} flashcard={flashcard} />
                <Button 
                  onClick={(event) =>{handleDelete(event,flashcard)}}
                  value={flashcard.id}
                  variant="contained"
                  color="error"
                  startIcon={<DeleteIcon />}
                >
                Delete 
                </Button>
                <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
                  <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                    Index Card Deleted
                  </Alert>
                </Snackbar>
                </div>
              )
            })}
          </Carousel>
          <LinearProgress 
            variant="determinate"
            value={progress}
          />
          </Typography>
        </div>
      </Container>
      <Add handleCreate={handleCreate} />

    </ThemeProvider>

  );

}

export default App;