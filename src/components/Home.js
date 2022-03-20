import React, { useState, useEffect } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import axios from 'axios'
import Add from './Add'
import Edit from './Edit'

// ============ MUI components ============ //

import '/Users/kevinjcasey/Desktop/Project-4-frontend/Project-4-frontend/src/App.css'
import { 
  Alert,
  AppBar, 
  Button, 
  Card, 
  CardActions, 
  CardContent, 
  Container, 
  IconButton,
  LinearProgress, 
  Snackbar,
  Toolbar, 
  Typography,
   } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete'

// =========== Card Flip ============ //

import AllCards from './AllCards'
import ReactCardFlip from "react-card-flip";

// ============= MUI Carousel ============= //

import Carousel from 'react-material-ui-carousel'

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


export const Home = (props) => {

  // ============= CRUD functions ============= //

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

  // =========== Progress Bar =========== //

  const [progress, setProgress] = useState(30)

  const progressFunction = () => {
    console.log('test');
  }

  // ============ SnackBar ================ //

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

  // ============ Card Flip  =============== //

  const [isFlipped, setIsFlipped] = useState(false);

  const closeDetails = () => {
      document.getElementById("details").removeAttribute("open");
  };

  const handleFlip= (e) => {
      e.preventDefault();
      setIsFlipped(!isFlipped);
      closeDetails();
  };

  // =========== UseEffect ========== //

  useEffect(() => {
    getFlashcard()
  }, [])

  // ============ Browser =========== //

  return (
    <ThemeProvider theme={theme}>
    {/* ----- Nav Bar ----- */}
      <AppBar 
        id="AppBar" 
        position="relative" 
        gutterBottom
      >
        <Toolbar>
            <Typography variant="h6">
              <Link to='/'>Home</Link>
            </Typography>
            <Typography variant="h6">
              <Link to="/add">Add Flashcard</Link>
            </Typography>
            <Typography variant="h6">
              <Link to="/edit" >View All Flashcards</Link>
            </Typography>
        </Toolbar>
      </AppBar>
    {/* ----- App Name and Slogan ----- */}
      <Typography 
        variant="h2" 
        align="center" 
        color="textPrimary" 
        gutterBottom
      >
      FlashPrep
      </Typography>
      <Typography 
        variant="h5" 
        align="center" 
        color="textSecondary" 
        paragraph
      >
      Index Cards On the Flash
      </Typography>
    {/* -------- Carousel ------- */}
      <div className="flashcards">
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
              animation="slide"
              duration="400"
              swipe="true"
              NavButton={({ onClick, className, style, next, prev }) => {
                return (
                  <Button 
                    onClick={onClick} 
                    className={className} 
                    style={style}>
                    {next && "Next"}
                    {prev && "Previous"}
                  </Button>
                );
              }}
            >
              {flashcards.map((flashcard) => {
                return (
                  <div className="flashcard" key={flashcard.id}>
                    <ReactCardFlip 
                      isFlipped={isFlipped} 
                      flipDirection="vertical" 
                      spacing={4}
                    >
                      {/* --- Front of card --- */ }
                      <div>
                        <Card className="Card1">
                          <Typography 
                            gutterBottom padding="30px" 
                            variant="h3"
                          >
                          Subject: {flashcard.subject}
                          </Typography>
                          <Typography 
                          padding="50px" 
                          variant="h4"
                          >
                          {flashcard.question}
                          </Typography>
                          <div className="CardAction">
                            <Button
                              onClick={ (event) => { handleDelete(event, flashcard) } }
                              value={flashcard.id}
                              variant="contained"
                              color="error"
                              size="large"
                              startIcon={<DeleteIcon />}
                            >
                            Delete
                            </Button>
                            {/* ----- SnackBar alert ----- */}
                            <Snackbar 
                              open={open} 
                              autoHideDuration={2000} 
                              onClose={handleClose}
                            >
                            <Alert 
                              onClose={handleClose} 
                              severity="error" 
                              sx={{ width: '100%' }}
                            >
                            Index Card Deleted
                            </Alert>
                            </Snackbar>
                            {/* ---- Flip button ---- */}
                            <Button 
                              variant="contained" 
                              size="large" 
                              color="primary" 
                              onClick={handleFlip}
                            >
                            Flip
                            </Button>
                          </div>
                        </Card>
                      </div>
                      {/* --- Back of card --- */}
                      <div>
                        <Card className="Card1">
                          <CardContent>
                            <Typography 
                              gutterBottom 
                              paddingTop="20px" 
                              marginBottom="80px" 
                              variant="h3"
                            >
                            Answer
                            </Typography>
                            <Typography 
                              variant="h4" 
                              marginBottom="30px" 
                              padding="50px"
                            >
                            {flashcard.answer}
                            </Typography>
                          </CardContent>
                          <CardActions className="CardAction">
                            <Button 
                              variant="contained" 
                              size="medium" 
                              color="primary" 
                              onClick={handleFlip}
                            >
                            Flip
                            </Button>
                          </CardActions>
                        </Card>
                      </div>
                    </ReactCardFlip>
                  </div>
                );
              })}
            </Carousel>
                  {/* <LinearProgress 
                      sx={{ "paddingTop": "20px", "margin": "20px" }}
                      variant="determinate"
                      value={progress}
                  /> */}
        </Typography>
        {/* <Add handleCreate={handleCreate} /> */}
        {/* <AllCards /> */}
      </div>
    </ThemeProvider>
  )
}

export default Home