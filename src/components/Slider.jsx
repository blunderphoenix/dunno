import {useState} from "react"
import activities from "../activities"

export default function Slider(props) {

    const [count, setCount] = useState(0)
    const [acceptedActivies, setAcceptedActivies] = useState([])

    function randomizer() {
        const randomId = Math.floor(Math.random() * 29) + 1
        return activities[randomId]
    } 

    return (
        <>
            <p>SLIDER</p>
            <button onClick={randomizer}>hi</button>
        </>
    )
}