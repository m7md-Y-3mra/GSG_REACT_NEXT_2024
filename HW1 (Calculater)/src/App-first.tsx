import { useState } from 'react'
import './App.css'

function App() {
  const [isOprandOne, setIsOprandOne] = useState(true);
  const [oprandOne, setOprandOne] = useState(0);
  const [oprandTwo, setOprandTwo] = useState(0);
  const [operation, setOperation] = useState("");

  function handleClickOperand(num: number) {
    if(isOprandOne) {
      operation == "-" ? setOprandOne(num * -1) : setOprandOne(num); 
    } else {
      setOprandTwo(num)
    }
  }

  function handleClickOperation(operation: string) {
    setIsOprandOne(false);
    setOperation(operation);
  }

  function handleClickEqual() {
    console.log(oprandOne, oprandTwo);
    
    switch(operation) {
      case "+":
          return oprandOne + oprandTwo;
      case "-":
          return oprandOne - oprandTwo;
      case "*":
          return oprandOne * oprandTwo;
      case "/":
          return oprandOne / oprandTwo;
    }
  }


  return (
    <>
      <div style={{ display: "flex", gap: "10px" }}>
        <button onClick={() => handleClickOperand(1)}>1</button>
        <button onClick={() => handleClickOperand(2)}>2</button>
        <button onClick={() => handleClickOperand(3)}>3</button>
        <button onClick={() => handleClickOperation("+")}>+</button>
        <button onClick={() => handleClickOperation("-")}>-</button>
        <button onClick={() => handleClickOperation("*")}>x</button>
        <button onClick={() => handleClickOperation("/")}>/</button>

        <button onClick={() => console.log(handleClickEqual())}>=</button>
      </div>
    </>
  )
}

export default App
