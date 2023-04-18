export default function Scorecard(props) {
    return (
        <div className="scorecard--container">
            <h4 className="scorecard--scoreText">Score: {props.numRolls}</h4>
            <h4 className="scorecard--scoreText">High Score: {props.highScore}</h4>
        </div>
    )
}
