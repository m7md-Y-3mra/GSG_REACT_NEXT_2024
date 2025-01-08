import { useState } from 'react'
import { evaluate } from 'mathjs'
import ResultDisplay from './components/ResultDisplay';
import Button from './components/Button';

function App() {
  const [currentEquation, setCurrentEquation] = useState<string>("");
  const [calculationResult, setCalculationResult] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  function handleAddOperand(operand: string) {
    setCalculationResult("");
    setErrorMessage("");
    setCurrentEquation(currentEquation + operand);
  }

  function handleDeleteLastOperand() {
    setCalculationResult("");
    setErrorMessage("");
    setCurrentEquation(currentEquation.substring(0, currentEquation.length - 1));
  }

  function handleCalculate() {
    try {
      let result = "";
      if (currentEquation.length !== 0) {
        result = evaluate(currentEquation);
      }
      setCalculationResult(result);
    } catch (error) {
      // console.error('Error evaluating expression:', error);
      setErrorMessage("the expression is incorrect");
      setCalculationResult("");
    }
  }

  function handleClear() {
    setCurrentEquation("");
    setCalculationResult("");
    setErrorMessage("");
  }

  function renderCalculator() { 
    const calculatorButtons = [
      "%", "^", "CE", "C",
      "7", "8", "9", "-", 
      "4", "5", "6", "+",
      "1", "2", "3", "*",
      "0", ".", "=", "/"
    ];

    // Define background colors for each button
    const buttonStyles: { [key: string]: string } = {
      // "%": "bg-gray-200",
      // "^": "bg-gray-200",
      // "CE": "bg-gray-200",
      "C": "bg-blue-900 text-white",
      "-": "bg-red-500 text-white",
      "+": "bg-green-500 text-white",
      "*": "bg-yellow-500 text-white",
      "=": "bg-cyan-500 text-white",
      "/": "bg-blue-500 text-white",
    };

    return calculatorButtons.map((button) => {
      const bgColor = buttonStyles[button] || "bg-[#D1D5DB] text-black"; // Default color

      switch (button) { 
        case "=":
          return <Button key={button} value={button} bg={bgColor} onClick={handleCalculate} /> 
        case "CE":
          return <Button key={button} value={button} bg={bgColor} onClick={handleDeleteLastOperand} /> 
        case "C":
          return <Button key={button} value={button} bg={bgColor} onClick={handleClear} /> 
        default:
          return <Button key={button} value={button} bg={bgColor} onClick={handleAddOperand} /> 
      }
    });
  }

  return (
    <div className='bg-[#F5F5F5] h-screen flex justify-center items-center'>
      <div className='bg-white shadow-md p-5 rounded-lg min-w-[600px]'>
        <ResultDisplay
          result={`${currentEquation} ${calculationResult.length != 0 ? "=" : ""} ${calculationResult}`}
          error={errorMessage}
        />
        <div className='grid grid-cols-4 gap-2'>
          {
            renderCalculator()
          }
        </div>
      </div>
    </div>
  )
}

export default App;

