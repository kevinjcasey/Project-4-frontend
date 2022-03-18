import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Add from './components/Add'
import Edit from './components/Edit'
import {Button} from '@mui/material'




function App() {

  const [flashcards, setFlashcards] = useState([])
  const [showAns, setShowAns] = useState(false)

  const getFlashcard = () => {
    axios
         .get('http://localhost:8000/api/flashcards')
         .then(
           (response) => setFlashcards(response.data),
           (err) => console.error(err)
         )
         .catch((error) => console.error(error))
  }

  const handleCreate = (addFlashcard) => {
    axios
         .post('http://localhost:8000/api/flashcards', addFlashcard)
         .then((response)=> {
            console.log(response);
            getFlashcard()
         })
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

  const handleUpdate = (editFlashcard) => {
    console.log(editFlashcard);
    axios 
        .put('http://localhost:8000/api/flashcards/' + editFlashcard.id, editFlashcard )
        .then((respose) => {
          getFlashcard()
        })
  }




  useEffect(() => {
    getFlashcard()
  }, [])

  return (
    <>
    <center><h1>FlashPrep</h1></center>
    <Add handleCreate={handleCreate} />
    <div className='flashcards'>
     {flashcards.map((flashcard)=>{
       return(
         
         <div className='flashcard' key={flashcard.id}>
         <h4>Subject: {flashcard.subject}</h4>
         <h4>Question: {flashcard.question}</h4>
         <h4>answer: {flashcard.answer}</h4>
         <Edit handleUpdate={handleUpdate} flashcard={flashcard} />
         <Button onClick={(event) =>{handleDelete(event,flashcard)}} value={flashcard.id}>X</Button>
         </div>
       )
       

     })}


    </div>
    </>
  );
}




export default App;