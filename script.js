class Calculator{
    constructor(previousOparendTextElement,currentOparendTextElement){
        this.previousOparendTextElement = previousOparendTextElement
        this.currentOparendTextElement = currentOparendTextElement
        this.clear();
    }
clear(){
this.previousOperand = ''
this.currentOperand = ''
this.operation = undefined

}
delete(){
this.currentOperand = this.currentOperand.toString().slice(0, -1)
}
appendNumber(number){
if(number=='.' && this.currentOperand.includes('.')) return
this.currentOperand = this.currentOperand.toString()+ number.toString();
}
choseOperation(operation){
 if(this.currentOperand === '') return
 if(this.previousOperand !== ''){
 this.compute()
 }
 this.operation = operation
 this.previousOperand = this.currentOperand
 this.currentOperand = ''
}
compute(){
    let computetion
    const prev = parseFloat(this.previousOperand)
    const current = parseFloat(this.currentOperand)
    if(isNaN(prev) || isNaN(current))return
    switch(this.operation){
    case '+':
        computetion = prev + current
        break
    case '-':
        computetion = prev - current
        break
    case '*':
        computetion = prev * current
        break
    case '/':
        computetion = prev / current
        break
    default:
        return

    }
    this.currentOperand = computetion
    this.operation = undefined
    this.previousOperand = ''

}

getDisplayNumber(number) {

const stringNumber = number.toString()
const integerDigit = parseFloat(stringNumber.split('.')[0])
const decimalDigit = stringNumber.split('.')[1]
let integerDisplay;
if(isNaN(integerDigit)) {
integerDisplay=''
}
else {
integerDisplay = integerDigit.toLocaleString('en',{
maximumFractionDigits: 0})
}
if(decimalDigit != null){
 return `${integerDisplay}.${decimalDigit}`
}
else{
return integerDisplay
}

}

updateDisplay(){
this.currentOparendTextElement.innerText = this.getDisplayNumber(this.currentOperand)

if(this.operation !=null){
this.previousOparendTextElement.innerText =
 `${this.getDisplayNumber(this.previousOperand)}${this.operation}`
}
else{
    this.previousOparendTextElement.innerText = ' '
}
}


}

const numberButtons = document.querySelectorAll('[data-number]')
const operationButton = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equal]')
const deteleButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-clear-all]')
const previousOparendTextElement = document.querySelector('[data-previous-operand]')
const currentOparendTextElement = document.querySelector('[data-current-operand]')

const  calculator = new Calculator(previousOparendTextElement,currentOparendTextElement)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationButton.forEach(button => {
    button.addEventListener('click', () => {
        calculator.choseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click', button => {
    calculator.compute();
    calculator.updateDisplay();
})

allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})
deteleButton.addEventListener('click',button =>{
    calculator.delete()
    calculator.updateDisplay()
})

