import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import { Alert, Snackbar, TextField, AppBar, Button, Card, CardActions, CardContent, LinearProgress, Toolbar, Typography } from "@mui/material";

import { makeStyles } from "@mui/styles";
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
        marginRight: 16,
    },
}));

export const Add = () => {
    const classes = useStyles();

    let emptyFlashcard = {
        subject: "",
        question: "",
        answer: "",
    };

    const [flashcards, setFlashcards] = useState([emptyFlashcard]);

    // ========= SnackBar ========== //

    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setOpen(false);
    };

    const handleChange = (event) => {
        setFlashcards({ ...flashcards, [event.target.name]: event.target.value });
    };

    const form = document.getElementById("addForm");

    const handleCreate = (addFlashcard) => {
        axios.post("http://localhost:8000/api/flashcards", addFlashcard).then((response) => {
            setFlashcards([response.data]);
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        handleCreate(flashcards);
        form.reset();
    };

    return (
        <>
            <ThemeProvider theme={theme}>
                <AppBar id="AppBar" position="relative" gutterBottom>
                    <Toolbar>
                        <Typography style={{ textDecoration: "none" }} variant="h6">
                            <Link className={classes.AppBarLinks} to="/">
                                Home
                            </Link>
                        </Typography>
                        <Typography variant="h6">
                            <Link className={classes.AppBarLinks} to="/add">
                                {" "}
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
                <center>
                    <Card className={classes.card}>
                        <br />
                        <h3>Add A New Flash Card</h3>
                        <br />
                        <form onSubmit={handleSubmit} id="addForm">
                            <TextField label="Subject" name="subject" id="outlined-size-small" size="small" type="text" onChange={handleChange} />
                            <br />
                            <br />
                            <TextField label="Question" name="question" id="outlined-size-small" size="small" type="text" onChange={handleChange} />
                            <br />
                            <br />
                            <TextField label="Answer" name="answer" id="outlined-size-small" size="small" type="text" onChange={handleChange} />
                            <br />
                            <br />

                            <Button type="submit" variant="contained" color="success" onClick={handleClick}>
                                Submit
                            </Button>

                            {/* --- SnackBar --- */}
                            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
                                <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
                                    Index Card Created
                                </Alert>
                            </Snackbar>
                        </form>
                    </Card>
                </center>
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

export default Add;
