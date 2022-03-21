import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

// ============ MUI components ============ //

import DeleteIcon from "@mui/icons-material/Delete";
import { Alert, AppBar, Button, Card, CardActions, CardContent, Container, Grid, Snackbar, TextField, Toolbar, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";

// =========== Setting Theme  ============= //

import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        secondary: {
            main: "#fefefe",
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

// =========== AllCards stuff ============= //

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
                <Container className={classes.cardGrid} maxWidth="md">
                    <Grid container>
                        <Container className={classes.cardGrid} maxWidth="md">
                            <Grid container justifyContent="center" gap="20px">
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
                                                    onClick={(event) => {
                                                        handleDelete(event, flashcard);
                                                    }}
                                                    value={flashcard.id}
                                                    variant="contained"
                                                    color="error"
                                                    startIcon={<DeleteIcon />}
                                                >
                                                    Delete
                                                </Button>
                                                {/* --- Edit Button --- */}
                                                <Button
                                                    variant="contained"
                                                    size="medium"
                                                    color="primary"
                                                    onClick={(event) => {
                                                        handleEditDisplay(index);
                                                    }}
                                                >
                                                    Edit
                                                </Button>
                                                <Button
                                                    variant="outlined"
                                                    size="medium"
                                                    color="primary"
                                                    onClick={(event) => {
                                                        handleAnswerDisplay(index);
                                                    }}
                                                >
                                                    Show Answer
                                                </Button>
                                            </CardActions>
                                        </Card>
                                    </Grid>
                                </div>
                            </Grid>
                        </Container>
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
        <>
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

                {flashcardArray}
                <footer className={classes.footer}>
                    <Typography variant="h6" align="center" gutterBottom>
                        Footer
                    </Typography>
                    <Typography variant="subtitle1" align="center" color="textSecondary">
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maxime
                    </Typography>
                </footer>
            </ThemeProvider>
        </>
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
