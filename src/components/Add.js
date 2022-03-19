import axios from "axios";
import React, { useState, useEffect } from "react";
import App from "../App";
import { Button, TextField } from "@mui/material";

const Add = (props) => {
    let emptyFlashcard = {
        subject: "",
        question: "",
        answer: "",
    };

    const [flashcards, setFlashcards] = useState([emptyFlashcard]);

    const handleChange = (event) => {
        setFlashcards({ ...flashcards, [event.target.name]: event.target.value });
    };

    const form = document.getElementById("addForm");

    const handleSubmit = (event) => {
        event.preventDefault();
        props.handleCreate(flashcards);
        form.reset();
    };

    return (
        <center>
            <h3>Add New Index Card</h3>
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

                <Button type="submit" variant="contained" color="success">
                    Submit
                </Button>
            </form>
            <br />
        </center>
    );
};

export default Add;
