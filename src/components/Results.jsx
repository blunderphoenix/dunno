import { useRef } from "react"

export default function Results(props) {
    const promptRef = useRef(null)
    function handleCopy() {
        const textToCopy = props.activitiesList
            .map(activity => activity.props.children)
            .join('\n')
        navigator.clipboard.writeText(textToCopy)
        
        promptRef.current.style.display = "block"
    }

    return (
        <section>
            <h2>{props.groupName}'s Activity List:</h2>
            <ul className="accepted-list">
                {props.activitiesList}
            </ul>
            <button onClick={handleCopy}>
                Copy to Clipboard
            </button>
            <p ref={promptRef} style={{display: "none", marginTop: "1rem", fontSize: "0.7rem"}}>Text copied</p>
        </section>
    )
}   