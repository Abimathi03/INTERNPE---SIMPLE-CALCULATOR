class Calculator 
{
  constructor(previousOperandTextElement, currentOperandTextElement) 
  {
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    this.clear();
  }
  clear() 
  {
    this.currentOperand = '';
    this.previousOperand = '';
    this.operation = undefined;
  }
  delete() 
  {
    this.currentOperand = this.currentOperand.toString().slice(0,-1)
  }
  appendNumber(number) 
  {
    if(number === '.' && this.currentOperand.includes('.')) return;
    this.currentOperand = this.currentOperand + number.toString();
  }
  chooseOperation(operation) 
  {
    if(this.currentOperand === '') return;
    if(this.previousOperand !== '')
    {
      this.compute();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = ''
  }
  // calculate function
  compute()
  {
    let computation;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    if(isNaN(prev) || isNaN(current)) return;
    switch(this.operation)
    {
      case '+':
        computation = prev + current;
        break;
      case '-':
        computation = prev - current;
        break;
      case '*':
        computation = prev * current;
        break;
      case '/':
        computation = prev / current;
        break;
      default:
        return;
    }

    this.currentOperand = computation;
    this.operation = undefined;
    this.previousOperand = ''
  }
  getDisplayNumber(number) 
  {
      const stringNumber = number.toString();
      const integerDigits = parseFloat(stringNumber.split(".")[0]);
      const decimalDigits = stringNumber.split(".")[1];
      let integerDisplay;
      if (isNaN(integerDigits)) 
      {
        integerDisplay = "";
      } 
      else 
      {
        integerDisplay = integerDigits.toLocaleString("en",
        {
          maximumFractionDigits: 0,
        }
        );
      }
      if (decimalDigits != null) 
      {
        return `${integerDisplay}.${decimalDigits}`;
      } 
      else 
      {
        return integerDisplay;
      }
  }
  updateDisplay() 
  {
    this.currentOperandTextElement.innerText = this.getDisplayNumber
    (
      this.currentOperand
    );
    if (this.operation != null) 
    {
      this.previousOperandTextElement.innerText = `${this.getDisplayNumber
        (
        this.previousOperand
      )
    } 
    ${this.operation}`;
    } 
    else 
    {
      this.previousOperandTextElement.innerText = "";
    }
  }
}
const numberButtons = document.querySelectorAll('.number');
const operationButtons = document.querySelectorAll('.operation');
const equalsButton = document.querySelector('.equals');
const delButton = document.querySelector('.delete');
const clearButton = document.querySelector('.all-clear');
const previousOperandTextElement = document.querySelector('.previous-operand');
const currentOperandTextElement = document.querySelector(".current-operand");
const calculator = new Calculator
(
  previousOperandTextElement,
  currentOperandTextElement
);
// number buttons functions
numberButtons.forEach(button => 
  {
  button.addEventListener('click', ()=>
  {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  }
  )
}
)
// operation buttons 
operationButtons.forEach(button => 
  {
  button.addEventListener('click', ()=>
  {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  }
  )
}
)
// equals buttons 
equalsButton.addEventListener('click', button =>
{
  calculator.compute();
  calculator.updateDisplay();
}
)
// Clear all
clearButton.addEventListener("click", (button) => 
{
  calculator.clear();
  calculator.updateDisplay();
}
);
delButton.addEventListener("click", (button) => 
{
  calculator.delete();
  calculator.updateDisplay();
}
);