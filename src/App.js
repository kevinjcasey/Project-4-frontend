import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Add from './components/Add'
import Edit from './components/Edit'
import { 
  Typography, 
  Button, 
  Container,
  Paper
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

  useEffect(() => {
    getFlashcard()
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <Container >
        <h1>App</h1>
        <Add handleCreate={handleCreate} />
        <div className='flashcards'>
          <Typography 
            variant="h6"
            color="primary"
            align="center"
          >
          <Carousel 
            className="carousel" 
            autoPlay="undefined"
            stopAutoPlayOnHover="false"
            indicators="false"
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
                </div>
              )
            })}
          </Carousel>
          </Typography>
        </div>
      </Container>
    </ThemeProvider>
  );
}

export default App;