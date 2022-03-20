import React, { useState, useEffect } from 'react'
import axios from 'axios'

import DeleteIcon from '@mui/icons-material/Delete'
import { 
    TextField ,
    Button,
    SendIcon
  } from '@mui/material'

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
