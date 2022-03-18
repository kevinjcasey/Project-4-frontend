import axios from 'axios'
import React, { useState, useEffect } from 'react'
import App from '../App'
import {
    Button,
    TextField
  } from '@mui/material'

const Add = (props) => {
    let emptyflashcard = {subject: '' , question: '', answer: '' }

    const [flashcards, setFlashcards] = useState([emptyflashcard])

    const handleChange = (event) => {
        setFlashcards({...flashcards, [event.target.name]: event.target.value})
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        props.handleCreate(flashcards)
    }

    

    

    return(
    <>
        <center>
           <h3>Index Cards On the Flash</h3>
           <form onSubmit={handleSubmit}>
            <label htmlFor='subject'></label>
            <TextField
             label="Subject"
             id="outlined-size-small"
             size="small"
             name='subject'
            onChange={handleChange}/>
            <br />
            <br />
            <label htmlFor='question' ></label>
            <TextField
            label="Question"
            id="outlined-size-small"
            size="small"
            type='text'
            name='question'
            onChange={handleChange}/>
            <br />
            <br />
            <label htmlFor='answer'></label>
            <TextField
            label="Answer"
            id="outlined-size-small"
            size="small"
            type='text'
            name='answer'
            onChange={handleChange}/>
            <br />
            <br />
            <Button
            type='submit'
            variant="contained"
            color="success"
            >submit
            </Button>
        </form></center>
    </>
    )
}
    export default Add