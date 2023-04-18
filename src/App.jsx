import { useState, useEffect } from 'react'
import Die from './components/Die.jsx'
import Scorecard from "./components/Scorecard.jsx"
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'

function App() {

  const [dice, setDice] = useState(allNewDice())
  const [tenzies, setTenzies] = useState(false)
  const [numRolls, setNumRolls] = useState(0)
  const [highScore, setHighScore] = useState(JSON.parse(localStorage.getItem("react-tenzies-highScore")) || 0)
  const [windowDimensions, setWindowDimensions] = useState([window.innerWidth, window.innerHeight])

  // Tenzies Win Condition
  useEffect(function() {
    const allHeld = dice.every(die => die.isHeld)
    const firstValue = dice[0].value
    const allSameValue = dice.every(die => die.value === firstValue)
    if (allHeld && allSameValue) {
      setTenzies(true)
      console.log("You won!")
    }
  }, [dice])

  useEffect(function() {
    setWindowDimensions([window.innerWidth, window.innerHeight])
  }, [window.innerWidth, window.innerHeight])

  useEffect(function() {
    localStorage.setItem("react-tenzies-highScore", JSON.stringify(highScore))
  })

  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid()
    }
  }

  function allNewDice() {
    const newDice = []
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDie())
    }
    return newDice
  }

  function rollDice() {
    if (tenzies) {
      setTenzies(false)
      setDice(allNewDice())
      if (numRolls < highScore || numRolls > 0 && highScore === 0) {
        setHighScore(numRolls)
      }
      setNumRolls(0)
    } else {
      setDice(oldDice => oldDice.map(die => {
        return die.isHeld ? die : generateNewDie()
      }))
      setNumRolls(oldNumRolls => oldNumRolls + 1)
    }
  }

  function holdDie(id) {
    setDice(oldDice => oldDice.map(die => {
      return die.id === id ? 
        {...die, isHeld: !die.isHeld} :
        die
    }))
  }

  const diceElements = dice.map(die => 
    <Die
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      holdDie={() => holdDie(die.id)} 
    />
  )

  return (
    <main>
      {tenzies &&
        <Confetti 
          width={windowDimensions[0]}
          height={windowDimensions[1]}
        />
      }
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className="dice-container">
        { diceElements }
      </div>
      <button className="roll-dice" onClick={rollDice}>
        {tenzies ? "New Game" : "Roll"}
      </button>
      <Scorecard numRolls={numRolls} highScore={highScore} />
    </main>
  )
}

export default App
