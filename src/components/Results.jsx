export default function Results(props) {
    return (
        <section>
            <h2>{props.username}'s Activity List:</h2>
            <ul className="accepted-list">
                {props.activitiesList}
            </ul>
        </section>
    )
}   