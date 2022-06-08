import axios from 'axios';

export enum InputKind {
    Number, 
    Operation
}

export enum OperationKind {
    Add,
    Substract, 
    Multiply,
    Divide,
    Equals
}


export type CalculatorInput =
| {type : InputKind.Number, value :number}  
| {type : InputKind.Operation, operation :OperationKind}  

export type CalculatorState = {
    displayValue:string;
}

const getState = (inputs:string):CalculatorState => {

    return { displayValue: inputs };
};

const doCompute = (inputs:string):CalculatorState => {
    async function makeCompute(inputs:string){
        const { data } = await axios.post(
            'http://localhost:8000/compute', 
            {inputs: inputs},
            {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
            }, 
        );
        console.log(JSON.stringify(data));
        return data;
    }
    var res = makeCompute(inputs);
    console.log(res);
    return { displayValue: String(42) };
};

const CalculatorLogic = {
    getState, 
    doCompute,  
};

export default CalculatorLogic;