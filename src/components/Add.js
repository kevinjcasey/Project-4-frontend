import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Home } from './Home'
import { 
    Button, 
    TextField
  } from '@mui/material'

export const Add = () => {

    let emptyFlashcard = {
        subject: '', 
        question: '', 
        answer: '' 
    }

    const [flashcards, setFlashcards] = useState([emptyFlashcard])

    const handleChange = (event) => {
        setFlashcards({...flashcards, [event.target.name]: event.target.value})
    }

    const handleCreate = (addFlashcard)  => {
        axios
             .post('http://localhost:8000/api/flashcards', addFlashcard)
             .then((response)=> {
                setFlashcards([response.data])
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        handleCreate(flashcards)
    }

    return (
        <center>
            <h3>Index Cards On the Flash</h3>
            <form onSubmit={handleSubmit}>
            
                <TextField
                label='Subject'
                name='subject'
                id="outlined-size-small"
                size="small"
                type='text'
                onChange={handleChange}/>
                <br />
                <br />
                
                <TextField
                label='Question'
                name='question'
                id="outlined-size-small"
                size="small"
                type='text'
                onChange={handleChange}/>
                <br />
                <br />
                
                <TextField
                label='Answer'
                name='answer'
                id="outlined-size-small"
                size="small"
                type='text'
                onChange={handleChange}/>
                <br />
                <br />

                <Button
                type='submit'
                variant="contained"
                color="success"
                >Submit
                </Button>
            </form>
        </center>
    )
}

export default Add