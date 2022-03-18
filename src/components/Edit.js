import React, { useState } from "react";
import { Button, TextField } from "@mui/material";

const Edit = (props) => {
    let emptyflashcard = { ...props.flashcard };
    const [flashcards, setFlashcards] = useState(emptyflashcard);

    const handleChange = (event) => {
        setFlashcards({ ...flashcards, [event.target.name]: event.target.value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        props.handleUpdate(flashcards);
    };

    const closeDetails = () => {
        document.getElementById("details").removeAttribute("open");
    };

    return (
        <>
            <details id="details">
                <summary>Edit flashcard</summary>
                <center>
                    <form onSubmit={handleSubmit}>
                        <TextField label="Subject" id="standard-size-small" defaultValue="Small" size="small" variant="standard" type="text" name="subject" value={flashcards.subject} onChange={handleChange} />
                        <TextField label="Question" id="standard-size-small" defaultValue="Small" size="small" variant="standard" type="text" name="question" value={flashcards.question} onChange={handleChange} />
                        <TextField label="Answer" id="filled-size-small" defaultValue="Small" size="small" variant="standard" type="text" name="answer" value={flashcards.answer} onChange={handleChange} />
                        <br />
                        <br />

                        <Button
                            variant="contained"
                            //  endIcon={<SendIcon />}
                            color="success"
                            type="submit"
                            onClick={closeDetails}
                        >
                            Edit
                        </Button>
                    </form>
                </center>
            </details>
        </>
    );
};
export default Edit;
