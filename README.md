# Project-4-frontend
GA Project 4 frontend
testing the git repo

--- MUI notes ---

For Typography:
-use color="textSecondary" for a grayed-out text
    -Maybe apply this to the subject on each card?


--- General Notes / To-dos ---

-Add page: 
    -Back button -> (or just use navBar?)
    -Clear the form on add


-- Edit and AllCard merge -- this is the old Edit.js page --

import React, { useState, useEffect } from 'react'
import axios from 'axios'

// ============ MUI components ============ //

import DeleteIcon from '@mui/icons-material/Delete'
import {
    Alert,
    Button,
    SendIcon,
    Snackbar,
    TextField
  } from '@mui/material'

export const Edit = () => {

    let emptyFlashcard = {
        subject: '', 
        question: '', 
        answer: '' 
    }

    const [flashcard, setFlashcard] = useState(emptyFlashcard)

    const [flashcards, setFlashcards] = useState([])

    const handleChange = (event) => {
        setFlashcard({...flashcard, [event.target.name]: event.target.value})
    }

    const handleSubmit = (event, id, index) => {
        event.preventDefault()
        handleUpdate(flashcard, id, index)
    }

    const handleDelete = (event, deletedFlashcards) => {
        axios
            .delete('http://localhost:8000/api/flashcards/' + event.target.value)
            .then((response) => {
              setFlashcards(
                flashcards.filter(x => x.id !== deletedFlashcards.id)
              )
            })
        handleClick()
      }

    // Credit to Doots for this crazy, janky code!
    const handleUpdate = (flashcard, id, index) => {
        if (flashcard.subject === '') {
            flashcard.subject = flashcards[index].subject
        }
        if (flashcard.question === '') {
            flashcard.question = flashcards[index].question
        } 
        if (flashcard.answer === '') {
            flashcard.answer = flashcards[index].answer
        } 
        axios 
            .put(`http://localhost:8000/api/flashcards/` + id, {
                subject: flashcard.subject, 
                question: flashcard.question, 
                answer: flashcard.answer
            })
            .then(() => {
                axios.get('http://localhost:8000/api/flashcards')
                .then((response) => {
                    setFlashcards(response.data)
            })
      })
    }

    const clearFlashcard = () => {
        setFlashcard(emptyFlashcard)
        console.log('test');
    }

    // ============ SnackBar ================ //

    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen(true);
    };
    
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }
        setOpen(false);
    };

    // ============ UseEffect ================ //

    useEffect(() => {
        axios.get('http://localhost:8000/api/flashcards')
        .then((response) => {
            setFlashcards(response.data)
        })
    }, [])

    
    const flashcardArray = flashcards.map((flashcard, index) => {
        return (
            <div className='flashcard' key={flashcard._id}>
                <h4>Id: {flashcard.id}</h4>
                <h4>Subject: {flashcard.subject}</h4>
                <h4>Question: {flashcard.question}</h4>
                <h4>Answer: {flashcard.answer}</h4>
                <Button 
                    onClick={(event) =>{handleDelete(event, flashcard)}} 
                    value={flashcard.id}
                    variant="contained"
                    color="error"
                    startIcon={<DeleteIcon />}
                >
                Delete 
                </Button>
                {/* ----- SnackBar alert ----- */}
                <Snackbar 
                    open={open} 
                    autoHideDuration={2000} 
                    onClose={handleClose}
                >
                <Alert 
                    onClose={handleClose} 
                    severity="error" 
                    sx={{ width: '100%' }}
                >
                Index Card Deleted
                </Alert>
                </Snackbar>
                    <center>
                    <form id='editForm' onSubmit={(event) => handleSubmit(event, flashcard.id, index)}>
                            
                            <TextField
                            label="Subject"
                            id="standard-size-small"
                            size="small"
                            variant="standard"
                            type="text" 
                            name="subject" 
                            value={flashcards.subject} 
                            onChange={handleChange}
                            />

                        <TextField
                            label="Question"
                            id="standard-size-small"
                            size="small"
                            variant="standard"
                            type="text" 
                            name="question" 
                            value={flashcards.question} 
                            onChange={handleChange}
                            />

                            <TextField 
                            label="Answer"
                            id="filled-size-small"
                            size="small"
                            variant="standard"
                            type="text" 
                            name="answer" 
                            value={flashcards.answer} 
                            onChange={handleChange}
                            />
                            <br />  
                            
                        <br />
                        <Button 
                        type='submit' 
                        onclick={clearFlashcard}
                        variant="contained"
                        color="success"
                        >Submit</Button>
                        
                    </form>
                    </center>
            </div>
        )
    })

    return (
        <>
        {flashcardArray}
        </>
    )   
}

export default Edit



