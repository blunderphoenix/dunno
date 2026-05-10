import { useState, useEffect } from 'react'
import { BrowserRouter, Outlet, Route, Routes, Navigate } from "react-router"
import './App.css'

import activities from "./activities"
import Header from "./components/Header"
import Game from "./components/Game"
import Results from "./components/Results"
import Footer from "./components/Footer"

export default function App() {
  const [groupName, setGroupName] = useState("Supergroup")
  const [location, setLocation] = useState([])
  const [cost, setCost] = useState("$$$")
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleFormSubmit = (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)

    const newGroupName = data.get("group-name")
    const newLocation = data.get("activity-location")
    const newCost = data.get("group-spend")

    newGroupName ? setGroupName(newGroupName) : null
    if (newLocation == "indoor or outdoor") {
      setLocation(["indoor", "outdoor"])
    } else {
      setLocation([newLocation])
    }
    newCost ? setCost(newCost) : null

    setIsSubmitted(true)
  }

  return (
    <>
      <Header />
      <main>
        {isSubmitted && <Navigate to="/game/" replace={true} />}
        <Routes>
          <Route path="/" element={
            <>
              <section>
                <form id="setup-form" onSubmit={handleFormSubmit}>
                  <label htmlFor="group-name-field">What is your group's name?</label>
                  <input id="group-name-field" name="group-name"></input>
                  <label htmlFor="activity-location-field">Are you looking for an indoor or outdoor activity?</label>
                  <select id="activity-location-field" name="activity-location">
                    <option>indoor or outdoor</option>
                    <option>indoor</option>
                    <option>outdoor</option>
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
          <Route path="/game/*" element={<Game
            groupName={groupName}
            location={location}
            cost={cost}
          />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}
