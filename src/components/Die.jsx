export default function Die(props) {
    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "#FFF"
    }

    return (
        <div style={styles} className="die-face" onClick={props.holdDie}>
            <h2 className="die-num">{props.value}</h2>
        </div>
    )
}
