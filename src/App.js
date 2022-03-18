import React, { useState, useEffect } from "react";
import "/Users/angelvalentin/dev/Unit Projects/unit-4-frontend/Project-4-frontend/src/App.css";
import axios from "axios";
import Add from "./components/Add";
import Edit from "./components/Edit";
import { Button, LinearProgress, Container, Typography, AppBar, Card, CardActions, CardContent, CardMedia, CssBaseline, Grid, Toolbar } from "@mui/material";
import ReactCardFlip from "react-card-flip";

import DeleteIcon from "@mui/icons-material/Delete";

// ========== MUI Carousel =========== //

import Carousel from "react-material-ui-carousel";

// ============ MUI Theme stuff =========== //
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
    Carousel: {
        padding: 0,
    },
});
// ========== ^^MUI Theme stuff^^ ========= //

function App(props) {
    const [flashcards, setFlashcards] = useState([]);

    const getFlashcard = () => {
        axios
            .get("http://localhost:8000/api/flashcards")
            .then(
                (response) => setFlashcards(response.data),
                (err) => console.error(err)
            )
            .catch((error) => console.error(error));
    };

    const handleCreate = (addFlashcard) => {
        axios.post("http://localhost:8000/api/flashcards", addFlashcard).then((response) => {
            console.log(response);
            getFlashcard();
        });
    };

    const handleDelete = (event, deletedFlashcards) => {
        axios.delete("http://localhost:8000/api/flashcards/" + event.target.value).then((response) => {
            setFlashcards(flashcards.filter((x) => x.id !== deletedFlashcards.id));
            // getFlashcard();
        });
    };

    const handleUpdate = (editFlashcard) => {
        console.log(editFlashcard);
        axios.put("http://localhost:8000/api/flashcards/" + editFlashcard.id, editFlashcard).then((respose) => {
            getFlashcard();
        });
    };

    // ========== Progress Bar stuff ========== //

    const [progress, setProgress] = useState(80);

    useEffect(() => {
        getFlashcard();
    }, []);

    const [isFlipped, setIsFlipped] = useState(false);

    const handleClick = (e) => {
        e.preventDefault();
        setIsFlipped(!isFlipped);
    };

    return (
        <ThemeProvider theme={theme}>
            <AppBar id="AppBar" position="relative" gutterBottom>
                <Toolbar>
                    <Typography variant="h6">FlashPrep </Typography>
                </Toolbar>
            </AppBar>
            <Typography variant="h2" align="center" color="textPrimary" gutterBottom>
                FlashPrep
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
                Index Cards On the Flash
            </Typography>
            <Container>
                <div className="flashcards">
                    <Typography variant="h6" color="primary" align="center">
                        <Carousel
                            className="carousel"
                            autoPlay={false}
                            indicators={false}
                            navButtonsWrapperProps={{
                                style: {
                                    bottom: "0",
                                    top: "unset",
                                },
                            }}
                        >
                            {flashcards.map((flashcard) => {
                                return (
                                    <div className="flashcard" key={flashcard.id}>
                                        <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical" spacing={4}>
                                            <div /* Front of card */>
                                                <Card className="Card1">
                                                    <Typography gutterBottom padding="30px" variant="h3">
                                                        Subject: {flashcard.subject}
                                                    </Typography>
                                                    <Typography padding="50px" variant="h4">
                                                        {flashcard.question}
                                                    </Typography>
                                                    <div className="CardAction">
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
                                                        <Edit handleUpdate={handleUpdate} flashcard={flashcard} />
                                                        <Button variant="contained" size="small" color="primary" onClick={handleClick}>
                                                            Flip
                                                        </Button>
                                                    </div>
                                                </Card>
                                            </div>

                                            <div /*Back of card*/>
                                                <Card className="Card1">
                                                    <CardContent>
                                                        <Typography gutterBottom variant="h3">
                                                            Answer
                                                        </Typography>
                                                        <Typography variant="h4" padding="50px">
                                                            {flashcard.answer}
                                                        </Typography>
                                                    </CardContent>
                                                    <CardActions className="CardAction">
                                                        <Button variant="contained" size="small" color="primary" onClick={handleClick}>
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
                        <LinearProgress variant="determinate" value={progress} />
                    </Typography>
                    <Add handleCreate={handleCreate} />
                </div>
            </Container>
        </ThemeProvider>
    );
}

export default App;
