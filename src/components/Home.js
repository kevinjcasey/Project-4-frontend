import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import FlashPrep from "../images/FlashPrep.png";

// ============ MUI components ============ //

import "../App.css";

import { AppBar, Button, Card, CardActions, CardContent, Checkbox, LinearProgress, Toolbar, Typography } from "@mui/material";

import PreviewIcon from "@mui/icons-material/Preview";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import StarIcon from "@mui/icons-material/Star";

import { makeStyles } from "@mui/styles";

// =========== Card Flip ============ //

import ReactCardFlip from "react-card-flip";

// ============= MUI Carousel ============= //

import Carousel from "react-material-ui-carousel";

// ============== MUI Theme ============== //

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
        "&:hover": {
            fontSize: "1.1em",
        },
        marginRight: 16,
        "@media (max-width:600px)": {
            fontSize: ".9em",
        },
    },
    CardAction: {
        marginTop: "50px",
    },
    QuestionStyle: {
        padding: "50px",
        marginTop: "13px",

        // marginBottom: "80px !important",
        "@media (max-width:600px)": {
            padding: "30px",
            marginBottom: "0px !important",
            fontSize: "1.5em !important",
        },
    },
    AnswerStyle: {
        padding: "50px",
        // marginBottom: "80px !important",
        "@media (max-width:600px)": {
            padding: "30px",
            marginBottom: "50px !important",
            fontSize: ".7em",
        },
    },
}));
// =========== ^^MUI Theme^^ ============= //

export const Home = (props) => {
    // ============= CRUD functions ============= //

    const classes = useStyles();

    const [flashcards, setFlashcards] = useState([]);

    const getFlashcard = () => {
        axios
            .get("https://flashcards-backend-ga.herokuapp.com/api/flashcards")
            .then(
                (response) => setFlashcards(response.data),
                (err) => console.error(err)
            )
            .catch((error) => console.error(error));
    };

    // =========== Progress Bar =========== //

    const [progress, setProgress] = useState(0);

    const [checked, setChecked] = useState(true);

    const [selectIndex, setSelectIndex] = useState(0);

    // const progressFunction = () => {
    //   if (checked) {
    //     setProgress(progress + 10)
    //   } else if (!checked) {
    //     setProgress(progress - 10)
    //   }
    // }

    const starCheck = (index) => {
        // if (checked) {
        // setSelectIndex(index)
        // setChecked(!checked)
        setProgress(progress + 10);
        // } else if (!checked) {
        //   setSelectIndex(index)
        //   setChecked(checked)
        //   setProgress(progress - 10)
        // }
    };

    // console.log(progress);
    // console.log(checked);

    // Need to grab the index of the card displayed --
    // then show a number based on that index
    // if children.index = 2
    // display "in" progress bar '2 out of <children.length>'

    // Maybe make a checkbox (star) button on each card that when checked, increases the progress bar?

    // Try messing around with props inside LinearProgress componenet?

    // ============ Card Flip  =============== //

    const [isFlipped, setIsFlipped] = useState(false);

    const closeDetails = () => {
        document.getElementById("details");
        // .removeAttribute("open"); // This was throwing a warning
    };

    const handleFlip = (e) => {
        e.preventDefault();
        setIsFlipped(!isFlipped);
        closeDetails();
    };

    // =========== UseEffect ========== //

    useEffect(() => {
        getFlashcard();
    }, []);

    // ============ Browser =========== //

    return (
        <ThemeProvider theme={theme}>
            {/* ----- Nav Bar ----- */}
            <AppBar id="AppBar" position="relative">
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
            <img src={FlashPrep} className="logo" />
            {/* -------- Carousel ------- */}
            <div className="flashcards">
                <Typography variant="h6" color="primary" align="center">
                    <div id="carouselContainer">
                        <Carousel
                            className="carousel"
                            autoPlay={false}
                            indicators={true}
                            navButtonsAlwaysVisible={true}
                            animation="slide"
                            duration="400"
                            swipe="true"
                            // index={2}
                            // onChange={progressFunction}
                            // IndicatorIcon={arrayOfNumbers}
                            NavButton={({ onClick, className, style, next, prev }) => {
                                return (
                                    <Button onClick={onClick} className={className} style={style}>
                                        {next && "Next"}
                                        {prev && "Previous"}
                                    </Button>
                                );
                            }}
                        >
                            {flashcards.map((flashcard, index) => {
                                return (
                                    <div className="flashcard" key={flashcard.id}>
                                        <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical" spacing={4}>
                                            {/* --- Front of card --- */}
                                            <div>
                                                <Card className="Card1">
                                                    <Typography padding="30px" variant="h4">
                                                        Subject: {flashcard.subject}
                                                    </Typography>

                                                    <Typography className={classes.QuestionStyle} variant="h4">
                                                        {flashcard.question}
                                                    </Typography>

                                                    <div className="CardAction">
                                                        {/* ---- Flip button ---- */}
                                                        <Button variant="contained" size="large" color="primary" onClick={handleFlip} startIcon={<PreviewIcon />}>
                                                            Show Answer
                                                        </Button>
                                                    </div>
                                                    {/* {selectIndex === index ?  */}
                                                    <Checkbox
                                                        onClick={() => {
                                                            starCheck(index);
                                                        }}
                                                        icon={<StarOutlineIcon fontSize="large" />}
                                                        checkedIcon={<StarIcon fontSize="large" />}
                                                        // checked={!checked}
                                                        // required
                                                        // need value?
                                                    />
                                                    {/* : null } */}
                                                </Card>
                                            </div>
                                            {/* --- Back of card --- */}
                                            <div>
                                                <Card className="Card1">
                                                    <CardContent>
                                                        <Typography paddingTop="20px" marginBottom="60px" variant="h3"></Typography>
                                                        <Typography className={classes.QuestionStyle} variant="h4">
                                                            {flashcard.answer}
                                                        </Typography>
                                                    </CardContent>
                                                    <CardActions className="CardAction">
                                                        <Button variant="contained" size="large" color="primary" onClick={handleFlip}>
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
                    </div>
                    <div className="progressBarContainer">
                        <LinearProgress id="progressBar" sx={{ paddingTop: "20px", margin: "20px" }} variant="determinate" value={progress} />
                    </div>
                </Typography>
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

export default Home;
