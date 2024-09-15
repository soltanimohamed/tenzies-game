import { useState, useEffect } from 'react'
import {nanoid} from "nanoid"
import Confetti from "react-confetti"
import './App.css'
import Die from "./components/Die"

function App() {

    const [dice, setDice] = useState(allNewDice())
    const [tenzies, setTenzies] = useState(false)
    const [count, setCount] = useState(0)

    useEffect(() => {
      const allHeld = dice.every(die => die.isHeld)
      const firstValue = dice[0].value
      const allSameValue = dice.every(die => die.value === firstValue)
      if (allHeld && allSameValue) {
          setTenzies(true)
      }
  }, [dice])

  function generateNewDie() {
    return {
        num: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid()
    }
}

  function allNewDice(){
    const newDice = []
    for(let i=0; i<10; i++){
      newDice.push(generateNewDie())
    }
    return newDice
  }

  function rollDice() {
    if(!tenzies) {
        setDice(oldDice => oldDice.map(die => {
            return die.isHeld ? 
                die :
                generateNewDie()
        }))
        setCount(prev => prev +1)
    } else {
        setTenzies(false)
        setDice(allNewDice())
        setCount(0)
    }
}

function holdDice(id) {
    setDice(oldDice => oldDice.map(die => {
        return die.id === id ? 
            {...die, isHeld: !die.isHeld} :
            die
    }))
}

const diceElements = dice.map(die => (
    <Die 
        key={die.id} 
        value={die.num} 
        isHeld={die.isHeld} 
        holdDice={() => holdDice(die.id)}
    />
))

  return (
    <main>
    {tenzies && <Confetti />}
    <h1 className="title">Tenzies</h1>
    <p className="instructions">Roll until all dice are the same. 
    Click each die to freeze it at its current value between rolls.</p>
    <div className="dice-container">
        {diceElements}
    </div>
    <div className="bottom-container">
    <h3>Number of tries: {count}</h3>
    <button 
        className="roll-dice" 
        onClick={rollDice}
    >
        {tenzies ? "New Game" : "Roll"}
    </button>
    </div>
</main>
  )
}

export default App
