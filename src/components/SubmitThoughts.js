/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import React, { useState } from 'react';

export const SubmitThoughts = () => {
  const [thoughtsList, setThoughtsList] = useState([]);
  const [errorAlert, setErrorAlert] = useState('');
  const [submitThoughts, setSubmitThoughts] = useState('');
  const [loading, setLoading] = useState(false);

  const handleThoughtChange = (event) => {
    setSubmitThoughts(event.target.value)
  }

  const turnCounterRed = submitThoughts.length > 140 ? 'counter-red' : 'counter';

  const handleLengthError = (event) => {
    const textLength = event.target.value.length
    if (textLength < 5) {
      setErrorAlert('Your message needs to be at least 5 characters long. 😊')
    } else if (textLength > 140) {
      setErrorAlert('Whoa Nelly! Save the essay for your portfolio. 😄')
    } else {
      setErrorAlert('')
    }
    handleThoughtChange(event)
  }

  const handleFormSubmit = (event) => {
    event.preventDefault()
    setLoading(true)

    const options = {
      method: 'POST',
      body: JSON.stringify({ message: submitThoughts }),
      headers: { 'Content-Type': 'application/json' }
    }
    fetch('https://project-happy-thoughts-api-l8j3.onrender.com/thoughts', options)
      .then((response) => response.json())
      .then((data) => { setThoughtsList([data.response, ...thoughtsList]) })
      .catch((error) => console.log(error))
      .finally(() => { setLoading(false); setSubmitThoughts('') })
  }

  return (
    <section className="submitBox">
      <h1>What's making you happy right now?</h1>
      <form onSubmit={handleFormSubmit}>
        <textarea type="text" value={submitThoughts} onChange={handleLengthError} />
        <div>
          <p className={turnCounterRed}>{submitThoughts.length} / 140</p>
        </div>
        <div className="errorAlert">{errorAlert}</div>
        <button
          type="submit">
            💛 Send happy thought 💛
        </button>
      </form>
    </section>
  )
}