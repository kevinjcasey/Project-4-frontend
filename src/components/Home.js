import React, { useState, useEffect } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import axios from 'axios'
import Add from './Add'
import Edit from './Edit'
import { 
  Button, 
  LinearProgress,
  Container,
  Typography
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'

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

export const Home = (props) => {

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

  // ========== Progress Bar stuff ========== //

  const [progress, setProgress] = useState(80)

  useEffect(() => {
    getFlashcard()
  }, [])

    return (
        <>
        <Link to="/add">Add Flashcard</Link>
        <br/>
        <br/>
        <Link to="/edit" >View All Flashcards</Link>
        <ThemeProvider theme={theme}>
            <Container >
                <h1>App</h1>
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
                            navButtonsAlwaysVisible={true}
                        >
                            {flashcards.map((flashcard)=>{
                            return (
                                <div className='flashcard' key={flashcard.id}>
                                    <h4>-{flashcard.subject}-</h4>
                                    <h4>{flashcard.question}</h4>
                                    <h4>Answer: {flashcard.answer}</h4>
                                    <Button 
                                    onClick={(event) =>{handleDelete(event,flashcard)}} 
                                    value={flashcard.id}
                                    variant="contained"
                                    color="error"
                                    startIcon={<DeleteIcon />}
                                    >
                                    Delete 
                                    </Button>
                                    <Link to="/edit">Edit Flashcard</Link>
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
        </ThemeProvider>
        </>
    )
}

export default Home