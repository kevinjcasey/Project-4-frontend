import React, { useState, useEffect } from 'react'
import axios from 'axios'

import { Button } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'

export const Edit = (props) => {

    // let emptyFlashcard = {
    //     subject: '', 
    //     question: '', 
    //     answer: '' 
    // }

    // let emptyFlashcard = {...props.flashcards}

    const [flashcard, setFlashcard] = useState([])

    const [flashcards, setFlashcards] = useState({
        subject: '', 
        question: '', 
        answer: '' 
    })

    // const getFlashcard = () => {
    //     axios.get('http://localhost:8000/api/flashcards')
    //     .then((response) => {
    //         setFlashcards(response.data)
    //         console.log(response.data);
    //     })
    // }
    
    const handleChange = (event) => {
        setFlashcards({...flashcards, [event.target.name]: event.target.value})
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        handleUpdate(flashcards)
    }

    const handleDelete = (event, deletedFlashcards) => {
        axios
            .delete('http://localhost:8000/api/flashcards/' + event.target.value)
            .then((response) => {
              setFlashcard(
                flashcards.filter(x => x.id !== deletedFlashcards.id)
              )
            })
      }

    const handleUpdate = (flashcards) => {
        console.log(flashcards);
        axios 
            .put(`http://localhost:8000/api/flashcards/${flashcards.id}`, {
                subject: flashcards.subject, 
                question: flashcards.question, 
                answer: flashcards.answer
            })
            .then(() => {
                axios.get('http://localhost:8000/api/flashcards')
                .then((response) => {
                    setFlashcard(response.data)
            })
      })
    }

    useEffect(() => {
        axios.get('http://localhost:8000/api/flashcards')
        .then((response) => {
            setFlashcards(response.data)
            setFlashcard(response.data)
        })
    }, [])

    
    const flashcardArray = flashcard.map((flashcard) => {
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
                
                    <details>
                        <summary>Edit flashcard</summary>
                        <form onSubmit={handleSubmit}>
                            <label htmlFor='subject'>Subject:</label>
                            <input 
                            type="text" 
                            name="subject" 
                            // value={flashcard.subject} 
                            onChange={handleChange}/>
                            <br />
                            <label htmlFor='question'>Question:</label>
                            <input 
                            type="text" 
                            name="question" 
                            // value={flashcard.question} 
                            onChange={handleChange}/>
                            <label htmlFor='answer'>Answer:</label>
                            <input 
                            type="text" 
                            name="answer" 
                            // value={flashcard.answer} 
                            onChange={handleChange}/>
                            <br />
                            <input type='submit' />
                        </form>
                    </details>
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