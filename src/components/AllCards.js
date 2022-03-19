import React, { useState, useEffect } from "react";
import ReactCardFlip from "react-card-flip";
import axios from "axios";

// import "./App.css";

import { Typography, AppBar, Card, CardActions, CardContent, CardMedia, CssBaseline, Grid, Toolbar, Container, Button } from "@mui/material";

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
        width: " 300px",
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

const App = () => {
    const [flashcards, setFlashcards] = useState([]);

    const [isFlipped, setIsFlipped] = useState(false);

    const getFlashcard = () => {
        axios
            .get("http://localhost:8000/api/flashcards")
            .then(
                (response) => setFlashcards(response.data),
                (err) => console.error(err)
            )
            .catch((error) => console.error(error));
    };

    useEffect(() => {
        getFlashcard();
    });

    const handleClick = (e) => {
        e.preventDefault();
        setIsFlipped(!isFlipped);
    };

    const classes = useStyles();

    return (
        <>
            <CssBaseline />

            <main>
                <Container className={classes.cardGrid} maxWidth="md">
                    <Grid container>
                        <div>
                            <Container className={classes.cardGrid} maxWidth="md">
                                <Grid container justifyContent="center" gap="20px">
                                    {flashcards.map((flashcard) => (
                                        <>
                                            <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical" spacing={4}>
                                                <div>
                                                    <Grid item spacing={6} xs={12} sm={6} md={4} key="front">
                                                        <Card className={classes.card}>
                                                            <CardContent className={classes.cardContent}>
                                                                <Typography gutterBottom variant="h5">
                                                                    {flashcard.subject}
                                                                </Typography>
                                                                <Typography>{flashcard.question}</Typography>
                                                            </CardContent>
                                                            <CardActions>
                                                                <Button size="small" color="primary">
                                                                    View
                                                                </Button>
                                                                <Button variant="contained" size="small" color="primary">
                                                                    Edit
                                                                </Button>
                                                                <Button variant="contained" size="small" color="primary" onClick={handleClick}>
                                                                    Flip
                                                                </Button>
                                                            </CardActions>
                                                        </Card>
                                                    </Grid>
                                                </div>

                                                <div>
                                                    <Grid item xs={12} sm={6} md={4} key="back">
                                                        <Card className={classes.card}>
                                                            <CardContent className={classes.cardContent}>
                                                                <Typography gutterBottom variant="h5">
                                                                    {flashcard.subject}
                                                                </Typography>
                                                                <Typography>{flashcard.answer}</Typography>
                                                            </CardContent>
                                                            <CardActions>
                                                                <Button variant="contained" size="small" color="primary">
                                                                    Edit
                                                                </Button>
                                                                <Button variant="contained" size="small" color="primary" onClick={handleClick}>
                                                                    Flip Card
                                                                </Button>
                                                            </CardActions>
                                                        </Card>
                                                    </Grid>
                                                    {/* <button >
                                            Click to flip
                                        </button> */}
                                                </div>
                                            </ReactCardFlip>
                                        </>
                                    ))}
                                </Grid>
                            </Container>
                        </div>

                        {/* <div>
                                This is the back of the card.
                                <CardBack key="back" />
                                <button onClick={handleClick}>
                                    Click to flip
                                </button>
                            </div> */}
                    </Grid>
                </Container>
            </main>
            <footer className={classes.footer}>
                <Typography variant="h6" align="center" gutterBottom>
                    Footer
                </Typography>
                <Typography variant="subtitle1" align="center" color="textSecondary">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maxime
                </Typography>
            </footer>
        </>
    );
};

export default App;
