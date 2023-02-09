const previousOperationText = document.querySelector("#previous-operation")
const currentOperationText = document.querySelector("#current-operation")
const buttons = document.querySelectorAll("button-container button");

class Calculator{
    constructor(previousOperationText, currentOperationText){
    this.previousOperationText = previousOperationText
    this.currentOperationText = currentOperationText
    this.currentOperation = ""    
}
// add digit to calculator screen
  addDigit(digit){
    // check if current operation already has a dot 
    if(digit === "." && this.currentOperationText.innerText.includes(".")){
    return;
    }
    
    this.currentOperation = digit
    this.updateScreen()
  }



  // process all calculator operations
  processOperation(operation){
    //Check if current is empty
    if(this.currentOperationText.innerText === "" && operation !== "C"){
        // Change operation
        if(this.previousOperationText.innerText !== ""){
            this.chanceOperation(operation);

            

        }
        return;
    }
    
    // Get current ad previous value 
    let operationValue
    const previous = +this.previousOperationText.innerText.split(" ")[0];
    const current = +this.currentOperationText.innerText;

    switch(operation){
        case "+":
            operationValue = previous + current
            this.updateScreen(operationValue,operation, current, previous);
            break;
    
        case "-":
            operationValue = previous - current
            this.updateScreen(operationValue,operation, current, previous);
            break;

         case "/":
            operationValue = previous / current
            this.updateScreen(operationValue,operation, current, previous);
            break;

         case "*":
            operationValue = previous * current
            this.updateScreen(operationValue,operation, current, previous);
            break;

            case "DEL":
                 this.processDelOperator();
                break;
           
                case "CE":
                    this.processClearCurrentOperation();
                    break;

                    case "C":
                    this.processClearOperation();
                    break;

                    case "=":
                        this.processEqualsOperator();
                        break;

                        

            default:
                return;
    }
  }

  // chance values of the calculator screen
  updateScreen(
    operationValue = null,
     operation = null,
      current = null,
       previous = null
       ){
    
        console.log(operationValue, operation, current, previous);

        if(operationValue === null){

      
    this.currentOperationText.innerText += this.currentOperation;
  }else{
    // check if value is zero, if it is just and  current  value
    if(previous === 0){
        operationValue = current
    }
    // Add  current value to previous 
    this.previousOperationText.innerText = `${operationValue}  ${operation}`
    this.currentOperationText.innerText = "";
  }
}

// chance math operation

chanceOperation(operation){

    const mathOperations = ["*", "/", "+", "-"]
    if(!mathOperations.includes(operation)){
        return
    }
    this.previousOperationText.innerText=
    this.previousOperationText.innerText = this.previousOperationText.innerText.slice(0, -1) +operation;
}
// Delete the last digit
processDelOperator(){
    this.currentOperationText.innerText.slice(0, -1);
}
// Clear current operation
processClearCurrentOperation(){
this.currentOperationText.innerText = "";
}

//Clear all operations
processClearOperation(){
    this.currentOperationText.innerText = "";
    this.previousOperationText.innerText="";
}
// Process an operation
 processOperation(){

    const operation = previousOperationText.innerText.split(" ")[1]
    this.processClearOperation(operation);
 }
}

const calc = new Calculator(previousOperationText, currentOperationText);

buttons.forEach((btn) =>{
    BigInt.addEventlistener("click", (e) =>{

        const value = e.target.innerText;
         
        if(+value >= 0 || value === "."){
           console.log(value);
        }else{
            calc.processOperation(value);

        }
   
    });
});
 