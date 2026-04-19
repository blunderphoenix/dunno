import { useState, useEffect } from 'react'
import './App.css'

import Header from "./components/Header"
import Slider from "./components/Slider"
import Results from "./components/Results"

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

  function enterName(formData) {
    const addName = formData.get('username')
    if (addName) {
      setUsername(addName)
    }
  }

  function enterRoom(formData) {
    const addRoomId = formData.get('room')
    if (addRoomId) {
      setRoom(addRoomId.toUpperCase())
    }
  }

  function startToggle() {
    setStart(prevStart => !prevStart)
  }

  return (
    <>
      <Header />
      <main>
        {start ? <Slider /> :
          <section id="setup">
            <div id="entry-forms">
              <form id="name-entry" action={enterName}>
                <label htmlFor="name-field">
                  Enter Name:
                </label>
                <input
                  id="name-field"
                  type="text"
                  aria-label="Enter name"
                  name="username"
                />
                <button id="name-submit" aria-label="Submit name">Submit</button>
              </form>
              <form id="room-entry" action={enterRoom}>
                <label htmlFor="room-field">
                  Enter Room:
                </label>
                <input
                  id="room-field"
                  type="text"
                  aria-label="Enter room"
                  name="room"
                />
                <button id="room-submit" aria-label="Submit room">Submit</button>
              </form>
              <button id="create-room" aria-label="Create Room" onClick={createRoom}>Create Room</button>
            </div>
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
      </main>
    </>
  )
}
