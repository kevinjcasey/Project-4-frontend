import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import { 
  Alert, 
  AppBar, 
  Button, 
  Card, 
  Snackbar, 
  TextField, 
  Toolbar, 
  Typography 
} from "@mui/material";

import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";

import { makeStyles } from "@mui/styles";

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

// =========== ^^MUI Theme^^ ============= //

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
      "@media (max-width:600px)": {
          width: "90%",
      },
      display: "flex",
      marginTop: "60px",

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
      "@media (max-width:600px)": {
          fontSize: ".9em",
          "&:hover": {
              fontSize: ".95em",
          },
      },
      "&:hover": {
          fontSize: "1.1em",
      },
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

  // ====== ^^ SnackBar ^^ ========= //

  // ======= Create Functions ========== //

  const handleChange = (event) => {
      setFlashcards({ ...flashcards, [event.target.name]: event.target.value });
  };

  const form = document.getElementById("addForm");

  const handleCreate = (addFlashcard) => {
      axios.post("https://flashcards-backend-ga.herokuapp.com/api/flashcards", addFlashcard).then((response) => {
          setFlashcards([response.data]);
      });
  };

  const handleSubmit = (event) => {
      event.preventDefault();
      handleCreate(flashcards);
      form.reset();
  };

  // ========== Browser ======== //

  return (
    <ThemeProvider theme={theme}>
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

      {/* ----- App Name and Slogan ----- */}
      <Typography 
        variant="h2" 
        align="center" 
        color="textPrimary"
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
      <center>
        <Card className={classes.card}>
          <br />
          <h3>Add A New Flash Card</h3>
          <br />
          <form onSubmit={handleSubmit} id="addForm">
            <TextField 
              label="Subject" 
              name="subject" 
              id="outlined-size-small" 
              size="small" 
              type="text" 
              onChange={handleChange} 
              multiline rows={2}
            />
            <br />
            <br />
            <TextField 
              label="Question" 
              name="question" 
              id="outlined-size-small" 
              size="small" type="text" 
              onChange={handleChange} 
              multiline rows={2} 
            />
            <br />
            <br />
            <TextField 
              label="Answer" 
              name="answer" 
              id="outlined-size-small" 
              size="small" 
              type="text" 
              onChange={handleChange} 
              multiline rows={2} 
            />
            <br />
            <br />

            <Button 
              type="submit" 
              variant="contained" 
              color="success" 
              onClick={handleClick}
            >
            Submit
            </Button>

            {/* --- SnackBar --- */}
            <Snackbar 
              open={open} 
              autoHideDuration={3000} 
              onClose={handleClose} 
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
              <Alert 
                onClose={handleClose} 
                severity="success" 
                sx={{ width: "100%" }}
              >
              Index Card Created
              </Alert>
            </Snackbar>
          </form>
        </Card>
      </center>
      {/* --- Footer --- */}
      <AppBar 
        id="AppBar" 
        position="fixed" 
        className="app" 
        sx={{ top: "auto", bottom: -40 }}
      >
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

export default Add;
