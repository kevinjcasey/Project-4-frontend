import axios from 'axios'
import React, { useState, useEffect } from 'react'
import App from '../App'

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
        <form onSubmit={handleSubmit}> 
            <label htmlFor='subject'>subject</label>
            <input type= 'text' name='subject' onChange={handleChange}/>
            <br />
            <label htmlFor='question' >question</label>
            <input type= 'text' name='question' onChange={handleChange}/>
            <br />
            <label htmlFor='answer'>answer</label>
            <input type= 'text' name='answer' onChange={handleChange}/>
            <br />
            <input type='submit' />
        </form>
    </>
    )
}
    export default Add