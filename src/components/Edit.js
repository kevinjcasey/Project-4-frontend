import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

import { ThemeProvider, createTheme } from '@mui/material/styles'

// ============ MUI components ============ //

import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import PreviewIcon from '@mui/icons-material/Preview'

import {
    Alert,
    AppBar,
    Button,
    Card,
    CardActions,
    CardContent,
    Container,
    Grid,
    IconButton,
    Snackbar,
    TextField,
    Toolbar,
    Typography
} from '@mui/material'

  // =========== AllCards stuff ============= //

  import { makeStyles } from "@mui/styles";

  const useStyles = makeStyles((theme) => ({
    container: {
        // backgroundColor: theme.palette.background.paper,
        // padding: theme.spacing(8, 0, 6),
    },

    cardGrid: {
        padding: "20px 0",
    },
    card: {
        height: "100%",
        width: " 600px",
        display: "flex",
        flexDirection: "column",
    },

    CardContent: {
        flexGrow: 1,
    },
    footer: {
        padding: "40px 0",
    },
  }));

  // ============== MUI Theme ============== //

  const theme = createTheme({
    palette: {
      secondary: {
        main: '#9932cc'
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



// =========== ^^AllCards stuff^^ ============= //

export const Edit = () => {

    let emptyFlashcard = {
        subject: '', 
        question: '', 
        answer: ''
    }

    const [flashcard, setFlashcard] = useState(emptyFlashcard)

    const [flashcards, setFlashcards] = useState([])

    const handleChange = (event) => {
        setFlashcard({...flashcard, [event.target.name]: event.target.value})
    }

    const handleSubmit = (event, id, index) => {
        event.preventDefault()
        handleUpdate(flashcard, id, index)
    }

    const handleDelete = (event, deletedFlashcards) => {
        axios
            .delete('http://localhost:8000/api/flashcards/' + event.target.value)
            .then((response) => {
              setFlashcards(
                flashcards.filter(x => x.id !== deletedFlashcards.id)
              )
            })
        handleClick()
      }

    // Credit to Doots for this crazy, janky code!
    const handleUpdate = (flashcard, id, index) => {
        if (flashcard.subject === '') {
            flashcard.subject = flashcards[index].subject
        }
        if (flashcard.question === '') {
            flashcard.question = flashcards[index].question
        } 
        if (flashcard.answer === '') {
            flashcard.answer = flashcards[index].answer
        } 
        axios 
            .put(`http://localhost:8000/api/flashcards/` + id, {
                subject: flashcard.subject, 
                question: flashcard.question, 
                answer: flashcard.answer
            })
            .then(() => {
                axios.get('http://localhost:8000/api/flashcards')
                .then((response) => {
                    setFlashcards(response.data)
            })
      })
    }

    const clearFlashcard = () => {
        setFlashcard(emptyFlashcard)
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

    // ============ AllCards stuff ========== //

    const classes = useStyles();

    // ======= Hide/Show Edit form ======== //

    const [displayEditForm, setDisplayEditForm] = useState(false)
    const [selectIndex, setSelectIndex] = useState(0)

    const handleEditDisplay = (index) => {
      setDisplayEditForm(!displayEditForm)
      setSelectIndex(index)
    }

    // ======= Hide/Show Answer field ======== //

    const [displayAnswer, setDisplayAnswer] = useState(false)

    const handleAnswerDisplay = (index) => {
      setDisplayAnswer(!displayAnswer)
      setSelectIndex(index)
    }

    // ============ UseEffect ================ //
    useEffect(() => {
        axios.get('http://localhost:8000/api/flashcards')
        .then((response) => {
            setFlashcards(response.data)
        })
    }, [])

    
    const flashcardArray = flashcards.map((flashcard, index) => {
      return (
          <div className='flashcard' key={flashcard._id}>
            <Container className={classes.cardGrid} maxWidth="md">
              <Grid container>
                <Container className={classes.cardGrid} maxWidth="md">
                  <Grid container justifyContent="center" gap="20px" >
                    <div>
                      <Grid item spacing={6} xs={12} sm={6} md={4} key="front">
                        <Card className={classes.card}>
                          <CardContent className={classes.cardContent}>
                            <Typography gutterBottom variant="h5">
                              Subject: {flashcard.subject}
                            </Typography>
                            <Typography>
                              Question: {flashcard.question}
                            </Typography>
                            { displayAnswer && selectIndex === index ? 
                            <Typography>
                              Answer: {flashcard.answer}
                            </Typography>
                            : null }
                            {/* --- Edit Button --- */}
                            <IconButton 
                              variant="contained" 
                              size="small" 
                              color="primary"
                              onClick={(event) => {handleEditDisplay(index)}}
                            >
                            <EditIcon />
                            </IconButton>
                            <IconButton 
                              variant="contained" 
                              size="small" 
                              color="secondary"
                              onClick={(event) => {handleAnswerDisplay(index)}}
                            >
                            <PreviewIcon />
                            </IconButton>
                            { displayEditForm && selectIndex === index ? 
                            <Typography>
                            <center>
                              <form id='editForm' onSubmit={(event) => handleSubmit(event, flashcard.id, index)}>
                              
                                <TextField
                                  label="Subject"
                                  id="standard-size-small"
                                  size="small"
                                  // variant="standard"
                                  type="text" 
                                  name="subject" 
                                  defaultValue={flashcard.subject} 
                                  onChange={handleChange}
                                />

                                <TextField
                                  label="Question"
                                  id="standard-size-small"
                                  size="small"
                                  // variant="standard"
                                  type="text" 
                                  name="question" 
                                  defaultValue={flashcard.question} 
                                  onChange={handleChange}
                                />

                                <TextField 
                                  label="Answer"
                                  id="filled-size-small"
                                  size="small"
                                  // variant="standard"
                                  type="text" 
                                  name="answer" 
                                  defaultValue={flashcard.answer} 
                                  onChange={handleChange}
                                />
                                <br />  
                                <br />
                                <Button 
                                type='submit' 
                                onclick={clearFlashcard}
                                variant="contained"
                                color="success"
                                >Submit</Button>
                            </form>
                          </center>
                            </Typography>
                          : null }
                          </CardContent>
                          <CardActions>
                            <IconButton 
                                onClick={(event) =>{handleDelete(event, flashcard)}} 
                                value={flashcard.id}
                                variant="contained"
                                color="error"
                                startIcon={<DeleteIcon />}
                            >
                            <DeleteIcon />
                            </IconButton>
                          </CardActions>
                        </Card>
                      </Grid>
                    </div>
                  </Grid>
                </Container>
              </Grid>
            </Container>
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
          </div>
        )
    })

    return (
      <ThemeProvider theme={theme}>
        <AppBar
        id="AppBar"
        position="relative"
        gutterBottom
        >
          <Toolbar className='toolbar'>
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
        {flashcardArray}
        <footer className={classes.footer}>
          <Typography 
            variant="h6" 
            align="center" 
            gutterBottom
          >
          Footer
          </Typography>
          <Typography 
            variant="subtitle1" 
            align="center" 
            color="textSecondary"
          >
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maxime
          </Typography>
        </footer>
      </ThemeProvider>
    )   
}

export default Edit


{/* <div>
This is the back of the card.
<CardBack key="back" />
<button onClick={handleClick}>
    Click to flip
</button>
</div> */}

                        {/* <button >
Click to flip
</button> */}
