import { useState, useRef } from "react"
import activities from "../activities"
import { Routes, Route, Navigate } from "react-router"
import Results from "./Results"

export default function Game(props) {
    const gameLength = 10

    const maxCost = props.cost === "$$$" ?
        ["free", "$", "$$", "$$$"] :
        props.cost === "$$" ? ["free", "$", "$$"] :
            props.cost === "$" ? ["free", "$"] :
                ["free"]

    const activityWithCostAndLocation = activities.filter(activity =>
        maxCost.includes(activity.cost) && props.location.includes(activity.location)
    )

    const [initialIndex, firstActivity] = (() => {
        if (activityWithCostAndLocation.length === 0) return [null, null]
        const idx = Math.floor(Math.random() * activityWithCostAndLocation.length)
        return [idx, activityWithCostAndLocation[idx]]
    })()
    const [acceptedActivies, setAcceptedActivies] = useState([])
    const [gameFinished, setGameFinished] = useState(false)
    const [currentActivity, setCurrentActivity] = useState(firstActivity)

    const usedIndices = useRef(initialIndex !== null ? [initialIndex] : [])

    const generateActivity = () => {
        let randomIndex

        do {
            randomIndex = Math.floor(Math.random() * activityWithCostAndLocation.length)
        } while (usedIndices.current.includes(randomIndex))

        usedIndices.current.push(randomIndex)

        setCurrentActivity(activityWithCostAndLocation[randomIndex])
        if (usedIndices.current.length === gameLength + 1) {
            setGameFinished(true)
            console.log("game finished")
        }
    }

    const activitiesList = acceptedActivies.map(activity => (
        <li key={activity.id}>{activity.title}</li>
    ))

    function addActivity() {
        setAcceptedActivies(prevAccepted => [...prevAccepted, currentActivity])
    }

    return (
        <>
            {gameFinished && <Navigate to="/game/results/" replace={true} />}
            <Routes>
                <Route index element={
                    <section id="game">
                        <div className="activity-card">
                            <p className="card-count">{usedIndices.current.length}/{gameLength}</p>
                            <h2 className="activity-title">{currentActivity.title}</h2>
                            <p className="activity-category">{currentActivity.category}</p>
                            <p className="activity-description">{currentActivity.description}</p>
                            <div className="quick-facts">
                                <p className="location">Location: {currentActivity.location}</p>
                                <p className="cost">Cost: {currentActivity.cost}</p>
                            </div>
                        </div>
                        <div className="decision-buttons">
                            <button onClick={() => { generateActivity(); addActivity(); }} >YES!</button>
                            <button onClick={generateActivity} >NO!</button>
                        </div>
                        <div className="accepted-list">
                            <ul>
                                {activitiesList}
                            </ul>
                        </div>
                    </section>
                } />
                <Route path="results/" element={<Results
                    activitiesList={activitiesList}
                    groupName={props.groupName}
                />} />
            </Routes>
        </>
    )
}