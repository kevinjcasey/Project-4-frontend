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


-- Old Edit page --

import React, { useState, useEffect } from 'react'
import axios from 'axios'

import { Button } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'

export const Edit = (props) => {

    let emptyflashcard = {...props.flashcard}

    const [flashcards, setFlashcards] = useState([])

    const handleChange = (event) => {
        setFlashcards({...flashcards, [event.target.name]: event.target.value})
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        handleUpdate(flashcards)
    }

    const handleDelete = (event, deletedFlashcards) => {
        console.log('hello');
        axios
            .delete('http://localhost:8000/api/flashcards/' + event.target.value)
            .then((response) => {
              setFlashcards(
                flashcards.filter(x => x.id !== deletedFlashcards.id)
              )
            })
      }

    const handleUpdate = (editFlashcard) => {
        axios 
            .put('http://localhost:8000/api/flashcards/' + editFlashcard.id, editFlashcard )
            .then((response) => {
              setFlashcards(
                  flashcards.map((flashcard) => {
                      return flashcard.id !== editFlashcard.id ? flashcard : response.data
                  })
              )
            })
      }

    useEffect(() => {
        axios.get('http://localhost:8000/api/flashcards')
        .then((response) => setFlashcards(response.data))
    }, [])

    return (
        <>
        {flashcards.map((flashcard) => {
            return (
                <div className='flashcard' key={flashcard.id}>
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
                    <details>
                        <summary>Edit flashcard</summary>
                        <form onSubmit={handleSubmit}>
                            <label htmlFor='subject'>Subject:</label>
                            <input type="text" name="subject" value={flashcard.subject} onChange={handleChange}/>
                            <br />
                            <label htmlFor='question'>Question:</label>
                            <input type="text" name="question" value={flashcard.question} onChange={handleChange}/>
                            <label htmlFor='answer'>Answer:</label>
                            <input type="text" name="answer" value={flashcard.answer} onChange={handleChange}/>
                            <br />
                            <input type='submit' />
                        </form>
                    </details>
                </div>
            )
        })}
        </>
    )
}


