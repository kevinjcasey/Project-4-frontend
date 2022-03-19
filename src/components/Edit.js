import React, { useState, useEffect } from 'react'
import axios from 'axios'

import { Button } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'

export const Edit = (props) => {

    let emptyFlashcard = {
        subject: '', 
        question: '', 
        answer: '' 
    }

    // let emptyFlashcard = {...props.flashcards}

    const [flashcard, setFlashcard] = useState(emptyFlashcard)

    const [flashcards, setFlashcards] = useState([])

    // const getFlashcard = () => {
    //     axios.get('http://localhost:8000/api/flashcards')
    //     .then((response) => {
    //         setFlashcards(response.data)
    //         console.log(response.data);
    //     })
    // }
    
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
      }

    // Credit to Doots for this crazy janky code!
    const handleUpdate = (flashcard, id, index) => {
        // console.log(flashcard);
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

    // onClick={clearFlashcard}

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
                
                        <form id='editForm' onSubmit={(event) => handleSubmit(event, flashcard.id, index)}>
                            <label htmlFor='subject'>Subject:</label>
                            <input 
                            type="text" 
                            name="subject" 
                            defaultValue={flashcard.subject} 
                            onChange={handleChange}/>
                            <br />
                            <label htmlFor='question'>Question:</label>
                            <input 
                            type="text" 
                            name="question" 
                            defaultValue={flashcard.question} 
                            onChange={handleChange}/>
                            <label htmlFor='answer'>Answer:</label>
                            <input 
                            type="text" 
                            name="answer" 
                            defaultValue={flashcard.answer} 
                            onChange={handleChange}/>
                            <br />
                            <Button type='submit' onclick={clearFlashcard}>Submit</Button>
                            {/* <Button
                            type='submit'
                            form='editForm'
                            onClick={(event) => {clearFlashcard(event)}}
                            >
                            Submit
                            </Button> */}
                        </form>
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