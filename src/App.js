import React, { useState, useEffect } from "react";
import "./App.css";
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
                <h1>App</h1>
                <Add handleCreate={handleCreate} />
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
                                    <Grid container justifyContent="center" gap="20px">
                                        {cards.map((card) => (
                                            <>
                                                <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical" spacing={4}>
                                                    <div>
                                                        <Grid item spacing={4} xs={12} sm={6} md={4} key="front">
                                                            <Card className={classes.card}>
                                                                <CardMedia className={classes.cardMedia} image="https://source.unsplash.com/random" title="Image tite" />
                                                                <CardContent className={classes.cardContent}>
                                                                    <Typography gutterBottom variant="h5">
                                                                        Heading
                                                                    </Typography>
                                                                    <Typography>This is a media card. Lorem ipsum dolor sit amet</Typography>
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
                                                                        Heading
                                                                    </Typography>
                                                                    <Typography>This is a media card. Lorem ipsum dolor sit amet</Typography>
                                                                </CardContent>
                                                                <CardActions>
                                                                    <Button size="small" color="primary">
                                                                        View
                                                                    </Button>
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
                                    // <div className="flashcard" key={flashcard.id}>
                                    //     <h4>-{flashcard.subject}-</h4>
                                    //     <h4>{flashcard.question}</h4>
                                    //     <h4>Answer: {flashcard.answer}</h4>
                                    //     <Edit handleUpdate={handleUpdate} flashcard={flashcard} />
                                    //     <Button
                                    //         onClick={(event) => {
                                    //             handleDelete(event, flashcard);
                                    //         }}
                                    //         value={flashcard.id}
                                    //         variant="contained"
                                    //         color="error"
                                    //         startIcon={<DeleteIcon />}
                                    //     >
                                    //         Delete
                                    //     </Button>
                                    // </div>
                                );
                            })}
                        </Carousel>
                        <LinearProgress variant="determinate" value={progress} />
                    </Typography>
                </div>
            </Container>
        </ThemeProvider>
    );
}

export default App;
