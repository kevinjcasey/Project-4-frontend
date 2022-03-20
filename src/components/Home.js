import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

// ============ MUI components ============ //

import '/Users/kevinjcasey/Desktop/Project-4-frontend/Project-4-frontend/src/App.css'
import { 
  AppBar, 
  Button, 
  Card, 
  CardActions, 
  CardContent,
  LinearProgress, 
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

  // =========== Progress Bar =========== //

  const [progress, setProgress] = useState(0)

  const progressFunction = () => {
    if (flashcards.question == flashcards[1]) {
      setProgress(progress + 10)
    } else if (flashcards.question == flashcards[1]) {
      setProgress(progress + 10)
    }
  }

  // Need to grab the index of the card displayed --
    // then show a number based on that index
    // if children.index = 2
    // display "in" progress bar '2 out of <children.length>'

  // ============ Card Flip  =============== //

  const [isFlipped, setIsFlipped] = useState(false);

  const closeDetails = () => {
      document.getElementById("details")
      // .removeAttribute("open"); // This was throwing a warning
  };

  const handleFlip= (e) => {
      e.preventDefault();
      setIsFlipped(!isFlipped);
      closeDetails();
  }
  
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
              indicators={true}
              navButtonsAlwaysVisible={true}
              animation="slide"
              duration="400"
              swipe="true"
              onChange={progressFunction}
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
              {flashcards.map((flashcard, index) => {
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
                              size="large" 
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
                  <LinearProgress 
                      sx={{ "paddingTop": "20px", "margin": "20px" }}
                      variant="determinate"
                      value={progress}
                  />
        </Typography>
        {/* <Add handleCreate={handleCreate} /> */}
        {/* <AllCards /> */}
      </div>
    </ThemeProvider>
  )
}

export default Home