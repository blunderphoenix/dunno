import { useState } from "react"
import Results from "./Results"

export default function Slider(props) {

    const initialRandomIndex = Math.floor(Math.random() * props.activities.length)

    const [usedIndices, setUsedIndices] = useState([initialRandomIndex])
    const [acceptedActivies, setAcceptedActivies] = useState([])
    const [currentActivity, setCurrentActivity] = useState(props.activities[initialRandomIndex])

    const activitiesList = acceptedActivies.map(activity => (
        <li key={activity.id}>{activity.title}</li>
    ))

    function generateActivity() {
        let randomIndex

        do {
            randomIndex = Math.floor(Math.random() * props.activities.length)
        } while (usedIndices.includes(randomIndex))

        setUsedIndices(prevUsed => [...prevUsed, randomIndex])
        setCurrentActivity(props.activities[randomIndex])
    }

    function addActivity() {
        setAcceptedActivies(prevAccepted => [...prevAccepted, currentActivity])
    }

    return (
        <>
            {usedIndices.length >= props.activities.length ? <Results username={props.username} activitiesList={activitiesList}/> :
                <section id="slider">
                    <div className="activity-card">
                        <p className="card-count">{usedIndices.length}/{props.activities.length}</p>
                        <h2 className="activity-title">{currentActivity.title}</h2>
                        <p className="activity-category">{currentActivity.category}</p>
                        <p className="activity-description">{currentActivity.description}</p>
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
            }
        </>
    )
}