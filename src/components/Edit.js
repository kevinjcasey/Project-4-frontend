import React, { useState } from 'react'

export const Edit = (props) => {
    let emptyflashcard = {...props.flashcard}
    const [flashcards, setFlashcards] = useState(emptyflashcard)

    const handleChange = (event) => {
        setFlashcards({...flashcards, [event.target.name]: event.target.value})
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        props.handleUpdate(flashcards)
    }

    return(
        <>
        <details>
            <summary>Edit flashcard</summary>
            <form onSubmit={handleSubmit}>
                <label htmlFor='subject'>Subject:</label>
                <input type="text" name="subject" value={flashcards.subject} onChange={handleChange}/>
                <br />
                <label htmlFor='question'>Question:</label>
                <input type="text" name="question" value={flashcards.question} onChange={handleChange}/>
                <label htmlFor='answer'>Answer:</label>
                <input type="text" name="answer" value={flashcards.answer} onChange={handleChange}/>
                <br />
                <input type='submit' />
            </form>
        </details>
        </>
    )
}
