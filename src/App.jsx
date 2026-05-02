import { useState, useEffect } from 'react'
import './App.css'

import activities from "./activities"
import Header from "./components/Header"
import Slider from "./components/Slider"

export default function App() {
  const [username, setUsername] = useState('')
  const [room, setRoom] = useState('')
  const [start, setStart] = useState(false)

  function createRoom() {
    let result = ''
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const charactersLength = characters.length
    for (let i = 0; i < 4; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength))
    }
    return setRoom(result)
  }

  function startToggle() {
    setStart(prevStart => !prevStart)
  }

  const handleFormSubmit = (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    setUsername(data.get('username'))
    setRoom(data.get('room'))
  }


  return (
    <>
      <Header />
      <main>
        {start ? <Slider key={activities.id} activities={activities} username={username} /> :
          <section id="setup">
            <form id="entry-form" onSubmit={handleFormSubmit}>
              <div id="entry-fields">
                <label htmlFor="name-field">Enter Name:</label>
                <input id="name-field" type="text" name="username" required />
                <label htmlFor="room-field">Enter Room:</label>
                <input id="room-field" type="text" name="room" />
              </div>
              <div className="button-group">
                <button type="submit" id="join-room">Join Room</button>
                <button type="button" id="create-room" onClick={createRoom}>Create New Room</button>
              </div>
            </form>

            <div id="entry-display">
              {username ? <p>Name: {username}</p> : null}
              {room ? <p>Room ID: {room}</p> : null}
            </div>
            {username && room ?
              <div id="start-container">
                <button id="start-button" aria-label="Start" onClick={startToggle}>Start!</button>
              </div>
              : null}
          </section>
        }
        <p className="credit">Made by <a href="https://mteh.ca" target="_blank" rel="noopener">Michael Teh</a></p>
      </main>
    </>
  )
}
