/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react';
import moment from 'moment';

export const ListThoughts = () => {
  const [thoughtsList, setThoughtsList] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchThoughts = () => {
    setLoading(true)
    fetch('https://project-happy-thoughts-api-l8j3.onrender.com/thoughts')
      .then((response) => response.json())
      .then((data) => setThoughtsList(data.response))
      .catch((error) => console.log(error))
      .finally(() => { setLoading(false) })
  }

  useEffect(() => {
    fetchThoughts()
  }, []);

  const handleLikeChange = (thoughtId) => {
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    }
    fetch(`https://project-happy-thoughts-api-l8j3.onrender.com/thoughts/${thoughtId}/like`, options)
      .then((res) => res.json())
      .catch((error) => console.log(error))
      .finally(() => {
        fetchThoughts('');
      })
  }

  const getTimeAgo = (createdAt) => {
    const timeAgo = moment(createdAt).fromNow();
    return timeAgo;
  }

  if (loading) {
    return <h2>Loading...</h2>
  }
  return (
    <section className="listSection">
      {thoughtsList.map((thought) => {
        return (
          <div className="listBox">
            <p className="thought" key={thought._id}>{thought.message}</p>
            <div className="list">
              <button
                className={thought.hearts === 0 ? 'heartBtn' : 'likedBtn'}
                type="submit"
                onClick={() => handleLikeChange(thought._id)}>
                  💛
              </button>
              <p>x {thought.hearts}</p>
              <div>
                <p className="time">{getTimeAgo(thought.createdAt)}</p>
              </div>
            </div>
          </div>
        )
      })}
    </section>
  )
}