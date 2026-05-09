import { useState, useEffect } from 'react'
import { BrowserRouter, Outlet, Route, Routes } from "react-router"
import './App.css'

import activities from "./activities"
import Header from "./components/Header"
import Game from "./components/Game"
import Footer from "./components/Footer"

export default function App() {
  const [groupName, setGroupName] = useState("Supergroup")
  const [groupNumber, setGroupNumber] = useState(100)
  const [location, setLocation] = useState(["indoor", "outdoor"])
  const [cost, setCost] = useState("$$$")

  const handleFormSubmit = (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)

    const newGroupName = data.get("group-name")
    const newGroupNumber = data.get("group-number")
    const newlocation = data.get("activity-location")
    const newCost = data.get("group-spend")

    newGroupName ? setGroupName(newGroupName) : null
    newGroupNumber ? setGroupNumber(newGroupNumber) : null
    newlocation ? setLocation(newlocation) : null
    newCost ? setCost(newCost) : null
    console.log(groupName, groupNumber, location, cost)
  }

  return (
    <>
      <Header />
      <main>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={
              <>
                <section>
                  <form id="setup-form" onSubmit={handleFormSubmit}>
                    <label htmlFor="group-name-field">What is your group's name?</label>
                    <input id="group-name-field" name="group-name"></input>
                    <label htmlFor="group-number-field">How many members are in your group?</label>
                    <input id="group-number-field" type="number" name="group-number"></input>
                    <label htmlFor="activity-location-field">Are you looking for an indoor or outdoor activity?</label>
                    <select id="activity-location-field" name="activity-location">
                      <option value={["indoor", "outdoor"]}>Indoor or outdoor</option>
                      <option>Indoor</option>
                      <option>Outdoor</option>
                    </select>
                    <label htmlFor="group-spend-field">How much do you want to spend?</label>
                    <select id="group-spend-field" name="group-spend">
                      <option>$$$</option>
                      <option>$$</option>
                      <option>$</option>
                      <option>Free</option>
                    </select>
                    <button type="submit" id="setup-submit">Start</button>
                  </form>
                </section>
              </>
            } />
            {/* <Route path="/game/" element={<Game />}/> */}
          </Routes>
        </BrowserRouter>
      </main>
      <Footer />
    </>
  )
  // const [username, setUsername] = useState('')
  // const [room, setRoom] = useState('')
  // const [start, setStart] = useState(false)

  // function createRoom() {
  //   let result = ''
  //   const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  //   const charactersLength = characters.length
  //   for (let i = 0; i < 4; i++) {
  //     result += characters.charAt(Math.floor(Math.random() * charactersLength))
  //   }
  //   return setRoom(result)
  // }

  // function startToggle() {
  //   setStart(prevStart => !prevStart)
  // }

  // const handleFormSubmit = (event) => {
  //   event.preventDefault()
  //   const data = new FormData(event.currentTarget)
  //   setUsername(data.get('username'))
  //   setRoom(data.get('room'))
  // }


  // return (
  //   <>
  //     <Header />
  //     <main>
  //       {start ? <Slider key={activities.id} activities={activities} username={username} /> :
  //         <section id="setup">
  //           <form id="entry-form" onSubmit={handleFormSubmit}>
  //             <div id="entry-fields">
  //               <label htmlFor="name-field">Enter Name:</label>
  //               <input id="name-field" type="text" name="username" required />
  //               <label htmlFor="room-field">Enter Room:</label>
  //               <input id="room-field" type="text" name="room" />
  //             </div>
  //             <div className="button-group">
  //               <button type="submit" id="join-room">Join Room</button>
  //               <button type="button" id="create-room" onClick={createRoom}>Create New Room</button>
  //             </div>
  //           </form>

  //           <div id="entry-display">
  //             {username ? <p>Name: {username}</p> : null}
  //             {room ? <p>Room ID: {room}</p> : null}
  //           </div>
  //           {username && room ?
  //             <div id="start-container">
  //               <button id="start-button" aria-label="Start" onClick={startToggle}>Start!</button>
  //             </div>
  //             : null}
  //         </section>
  //       }
  //       <p className="credit">Made by <a href="https://mteh.ca" target="_blank" rel="noopener">Michael Teh</a></p>
  //     </main>
  //   </>
  // )
}
