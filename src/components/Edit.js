import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

// ============ MUI components ============ //

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import PreviewIcon from "@mui/icons-material/Preview";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";

import { Alert, AppBar, Button, Card, CardActions, CardContent, Container, Grid, IconButton, Snackbar, TextField, Toolbar, Typography } from "@mui/material";

import { makeStyles } from "@mui/styles";

// ============== MUI Theme ============== //

import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        secondary: {
            main: "#9932cc",
        },
    },
    typography: {
        fontFamily: "Fredoka",
        fontWeightLight: "400",
        fontWeightLight: "500",
        fontWeightLight: "600",
        fontWeightLight: "700",
    },
});
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
        // paddingBottom: "40px",
    },
    card: {
        height: "100%",
        width: " 400px",
        "@media (max-width:600px)": {
            width: "367px",
        },
        display: "flex",
        flexDirection: "column",
        padding: "20px",
    },

    CardContent: {
        height: "300px !important",
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
        "@media (max-width:600px)": {
            fontSize: ".9em",
            "&:hover": {
                fontSize: ".95em",
            },
        },
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
        axios.delete("https://flashcards-backend-ga.herokuapp.com/api/flashcards/" + event.target.value).then((response) => {
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
            .put(`https://flashcards-backend-ga.herokuapp.com/api/flashcards/` + id, {
                subject: flashcard.subject,
                question: flashcard.question,
                answer: flashcard.answer,
            })
            .then(() => {
                axios.get("https://flashcards-backend-ga.herokuapp.com/api/flashcards").then((response) => {
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
        axios.get("https://flashcards-backend-ga.herokuapp.com/api/flashcards").then((response) => {
            setFlashcards(response.data);
        });
    }, []);

    const flashcardArray = flashcards.map((flashcard, index) => {
        return (
            <div className="flashcard" key={flashcard.id}>
                <Container className={classes.cardGrid}>
                    <Grid container spacing={4}>
                        <div>
                            <Grid item key="front">
                                <Card className={classes.card}>
                                    <CardContent id="cardContent" className={classes.cardContent}>
                                        <Typography variant="h5">Subject: {flashcard.subject}</Typography>
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
                                        <Button
                                            value={flashcard.id}
                                            variant="contained"
                                            color="error"
                                            size="medium"
                                            startIcon={<DeleteIcon />}
                                            onClick={(event) => {
                                                handleDelete(event, flashcard);
                                            }}
                                        >
                                            Delete
                                        </Button>
                                        {/* --- Edit Button --- */}
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            size="medium"
                                            startIcon={<EditIcon />}
                                            onClick={(event) => {
                                                handleEditDisplay(index);
                                            }}
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            color="primary"
                                            size="medium"
                                            startIcon={<PreviewIcon />}
                                            onClick={(event) => {
                                                handleAnswerDisplay(index);
                                            }}
                                        >
                                            Answer
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        </div>
                    </Grid>
                </Container>
                {/* ----- SnackBar alert ----- */}
                <Snackbar open={open} autoHideDuration={2000} onClose={handleClose} anchorOrigin={{ vertical: "top", horizontal: "center" }}>
                    <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
                        Index Card Deleted
                    </Alert>
                </Snackbar>
            </div>
        );
    });

    return (
        <ThemeProvider theme={theme}>
            <AppBar id="AppBar" position="relative">
                <Toolbar className="toolbar">
                    <Typography paddingLeft="16px" variant="h6">
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
            <Typography variant="h2" align="center" color="textPrimary">
                FlashPrep
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
                Index Cards On the Flash
            </Typography>

            <Typography variant="h5" align="center">
                Index Card Gallery:
            </Typography>

            <div className="cardsContainer">
                <Container className={classes.cardGrid} maxWidth="md">
                    <Grid className={classes.cardContainer} container justifyContent="center" gap="20px">
                        {flashcardArray}
                    </Grid>
                </Container>
            </div>
            <AppBar id="AppBar" position="fixed" className="app" sx={{ top: "auto", bottom: -40 }}>
                <Toolbar className="footer">
                    <div>
                        <a className="link" href="https://www.linkedin.com/in/kris-garcia-3b7292146/">
                            <LinkedInIcon />
                        </a>
                        <a className="git" href="https://github.com/Weeechi">
                            <GitHubIcon className="gitKris" />
                        </a>
                        <h4>Kris Garcia</h4>
                    </div>
                    <div className="div">
                        <a className="link" href="https://www.linkedin.com/in/kevin-j-casey/">
                            <LinkedInIcon />
                        </a>
                        <a href="https://github.com/kevinjcasey">
                            <GitHubIcon className="gitKev" />
                        </a>
                        <h4 className="namekev">Kevin J Casey</h4>
                    </div>
                    <div className="div">
                        <a className="link" href="https://www.linkedin.com/in/angelvalentin1/">
                            <LinkedInIcon />
                        </a>
                        <a className="gitAngel" href="https://github.com/angelgvalentin">
                            <GitHubIcon className="gitAngel" />
                        </a>
                        <h4 className="namekev">Angel Valentin</h4>
                    </div>
                </Toolbar>
            </AppBar>
        </ThemeProvider>
    );
};

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
