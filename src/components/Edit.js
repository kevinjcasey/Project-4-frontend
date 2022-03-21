import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import { ThemeProvider, createTheme } from '@mui/material/styles'

// ============ MUI components ============ //


import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import PreviewIcon from '@mui/icons-material/Preview'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import GitHubIcon from '@mui/icons-material/GitHub'

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

import { makeStyles } from "@mui/styles";

// ============== MUI Theme ============== //

import { ThemeProvider, createTheme } from "@mui/material/styles";

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


// =========== AllCards stuff ============= //

const useStyles = makeStyles((theme) => ({
    container: {
        // backgroundColor: theme.palette.background.paper,
        // padding: theme.spacing(8, 0, 6),
    },

    cardGrid: {
        padding: "20px 0",
        width: "800px",
    },
    card: {
        height: "100%",
        width: " 400px",
        display: "flex",
        flexDirection: "column",
        padding: "20px",
    },

    CardContent: {
        flexGrow: 1,
    },
    footer: {
        padding: "40px 0",
    },
    AppBarLinks: {
        textDecoration: "none",
        color: "white",
        "&:hover": {
            fontSize: "1.1em",
        },
        marginRight: "16px",
        fontFamily: "Fredoka",
    },
    cardContainer: {
        width: "500px",
    },
}));

// =========== ^^AllCards stuff^^ ============= //

export const Edit = () => {
    let emptyFlashcard = {
        subject: "",
        question: "",
        answer: "",
    };

    const [flashcard, setFlashcard] = useState(emptyFlashcard);

    const [flashcards, setFlashcards] = useState([]);

    const handleChange = (event) => {
        setFlashcard({ ...flashcard, [event.target.name]: event.target.value });
    };

    const handleSubmit = (event, id, index) => {
        event.preventDefault();
        handleUpdate(flashcard, id, index);
    };

    const handleDelete = (event, deletedFlashcards) => {
        axios.delete("http://localhost:8000/api/flashcards/" + event.target.value).then((response) => {
            setFlashcards(flashcards.filter((x) => x.id !== deletedFlashcards.id));
        });
        handleClick();
    };

    // Credit to Doots for this crazy, janky code!
    const handleUpdate = (flashcard, id, index) => {
        if (flashcard.subject === "") {
            flashcard.subject = flashcards[index].subject;
        }
        if (flashcard.question === "") {
            flashcard.question = flashcards[index].question;
        }
        if (flashcard.answer === "") {
            flashcard.answer = flashcards[index].answer;
        }
        axios
            .put(`http://localhost:8000/api/flashcards/` + id, {
                subject: flashcard.subject,
                question: flashcard.question,
                answer: flashcard.answer,
            })
            .then(() => {
                axios.get("http://localhost:8000/api/flashcards").then((response) => {
                    setFlashcards(response.data);
                });
            });
    };

    const clearFlashcard = () => {
        setFlashcard(emptyFlashcard);
        console.log("test");
    };

    // ============ SnackBar ================ //

    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setOpen(false);
    };

    // ============ AllCards stuff ========== //

    const classes = useStyles();

    // ======= Hide/Show Edit form ======== //

    const [displayEditForm, setDisplayEditForm] = useState(false);
    const [selectIndex, setSelectIndex] = useState(0);

    const handleEditDisplay = (index) => {
        setDisplayEditForm(!displayEditForm);
        setSelectIndex(index);
    };

    // ======= Hide/Show Answer field ======== //

    const [displayAnswer, setDisplayAnswer] = useState(false);

    const handleAnswerDisplay = (index) => {
        setDisplayAnswer(!displayAnswer);
        setSelectIndex(index);
    };

    // ============ UseEffect ================ //
    useEffect(() => {
        axios.get("http://localhost:8000/api/flashcards").then((response) => {
            setFlashcards(response.data);
        });
    }, []);

    const flashcardArray = flashcards.map((flashcard, index) => {
        return (
            <div className="flashcard" key={flashcard._id}>
                <Container className={classes.cardGrid}>
                    <Grid container spacing={4}>
                        <div>
                            <Grid item spacing={6} xs={12} sm={6} md={4} key="front">
                                <Card className={classes.card}>
                                    <CardContent className={classes.cardContent}>
                                        <Typography gutterBottom variant="h5">
                                            Subject: {flashcard.subject}
                                        </Typography>
                                        <Typography variant="h6">Question: {flashcard.question}</Typography>
                                        {displayAnswer && selectIndex === index ? <Typography variant="h6">Answer: {flashcard.answer}</Typography> : null}

                                        {displayEditForm && selectIndex === index ? (
                                            <Typography>
                                                <form id="editForm" onSubmit={(event) => handleSubmit(event, flashcard.id, index)}>
                                                    <TextField
                                                        label="Subject"
                                                        id="standard-size-small"
                                                        size="small"
                                                        // variant="standard"
                                                        type="text"
                                                        name="subject"
                                                        defaultValue={flashcard.subject}
                                                        onChange={handleChange}
                                                        multiline
                                                        rows={2}
                                                    />
                                                    <br />
                                                    <br />

                                                    <TextField
                                                        label="Question"
                                                        id="standard-size-small"
                                                        size="small"
                                                        // variant="standard"
                                                        type="text"
                                                        name="question"
                                                        defaultValue={flashcard.question}
                                                        onChange={handleChange}
                                                        multiline
                                                        rows={2}
                                                    />
                                                    <br />
                                                    <br />

                                                    <TextField
                                                        label="Answer"
                                                        id="filled-size-small"
                                                        size="small"
                                                        // variant="standard"
                                                        type="text"
                                                        name="answer"
                                                        defaultValue={flashcard.answer}
                                                        onChange={handleChange}
                                                        multiline
                                                        rows={2}
                                                    />
                                                    <br />
                                                    <br />
                                                    <Button type="submit" onclick={clearFlashcard} variant="contained" color="primary">
                                                        Submit
                                                    </Button>
                                                </form>
                                            </Typography>
                                        ) : null}
                                    </CardContent>
                                    <CardActions>
                                        <IconButton 
                                          // onClick={(event) => {handleDelete(event, flashcard)}} 
                                          value={flashcard.id}
                                          // variant="contained"
                                          color="error"
                                        >
                                          <DeleteIcon onClick={(event) => {handleDelete(event, flashcard)}} />
                                        </IconButton>
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
                                    </CardActions>
                                </Card>
                            </Grid>
                        </div>
                    </Grid>

                </Container>
                {/* ----- SnackBar alert ----- */}
                <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
                        Index Card Deleted
                    </Alert>
                </Snackbar>
            </div>
        );
    });

    return (
      <ThemeProvider theme={theme}>
        <AppBar id="AppBar" position="relative" gutterBottom>
                    <Toolbar className="toolbar">
                        <Typography variant="h6">
                            <Link className={classes.AppBarLinks} to="/">
                                Home
                            </Link>
                        </Typography>
                        <Typography variant="h6">
                            <Link className={classes.AppBarLinks} to="/add">
                                Add Flashcard
                            </Link>
                        </Typography>
                        <Typography variant="h6">
                            <Link className={classes.AppBarLinks} to="/edit">
                                View All Flashcards
                            </Link>
                        </Typography>
                    </Toolbar>
                </AppBar>
        {/* ----- App Name and Slogan ----- */}
                <Typography variant="h2" align="center" color="textPrimary" gutterBottom>
                    FlashPrep
                </Typography>
                <Typography variant="h5" align="center" color="textSecondary" paragraph>
                    Index Cards On the Flash
                </Typography>

                <Typography variant="h5" align="center">
                    Index Card Gallery:
                </Typography>
        
        <Container className={classes.cardGrid} maxWidth="md">
                    <Grid className={classes.cardContainer} container justifyContent="center" gap="20px">
                        {flashcardArray}
                    </Grid>
                </Container>
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

export default Edit;

{
    /* <div>
This is the back of the card.
<CardBack key="back" />
<button onClick={handleClick}>
    Click to flip
</button>
</div> */
}

{
    /* <button >
Click to flip
</button> */
}
