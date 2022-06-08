import React, { useState } from 'react';
import styled from 'styled-components';
import CalculatorLogic from '../logic/CaculatorLogic';
import CalculatorButton, {CalculatorButtonKind} from './CalculatorButton';

const Container = styled.div``;

const Grid = styled.div`
    display:grid;
    grid-gap: 5px;
    grid-template-columns : repeat(4, 50px);
    grid-template-rows : 120px repeat(5, 50px);
`;

const Result = styled.div`
    background: #fff;
    border-radius: 8px;
    font-size: 48px;
    color: #000;
    grid-column-end: span 4;
    padding: 30px 24px;
    text-align: right;
`;


const Calculator:React.FC<{}> = () => {
    const [inputs, setInputs] = useState('');
    const state = CalculatorLogic.getState(inputs);
    const handleInput = (value:string) => () => {
         if(value !=='=')
         {
             setInputs(prev=> prev + value);
         }
         else
         {
            CalculatorLogic.doCompute(inputs);
         }
    }
    return (
        <Container>
            <Grid>
                <Result>{state.displayValue}</Result>
                <CalculatorButton label="/" position={[1, 2]} width={2}  onClick={handleInput(' / ')}/>
                <CalculatorButton label="*" position={[3, 2]} width={2}  onClick={handleInput(' * ')}/>
                <CalculatorButton label="-" position={[4, 3]}  onClick={handleInput(' - ')}/>
                <CalculatorButton label="+" position={[4, 4]}  onClick={handleInput(' + ')}/>
                <CalculatorButton label="=" position={[4, 5]} height={2} onClick={handleInput('=')}/>
                <CalculatorButton buttonKind={CalculatorButtonKind.Number} label="9" position={[3, 3]} onClick={handleInput('9')}/>
                <CalculatorButton buttonKind={CalculatorButtonKind.Number} label="8" position={[2, 3]} onClick={handleInput('8')}/>
                <CalculatorButton buttonKind={CalculatorButtonKind.Number} label="7" position={[1, 3]} onClick={handleInput('7')}/>
                <CalculatorButton buttonKind={CalculatorButtonKind.Number} label="6" position={[3, 4]} onClick={handleInput('6')}/>
                <CalculatorButton buttonKind={CalculatorButtonKind.Number} label="5" position={[2, 4]} onClick={handleInput('5')}/>
                <CalculatorButton buttonKind={CalculatorButtonKind.Number} label="4" position={[1, 4]} onClick={handleInput('4')}/>
                <CalculatorButton buttonKind={CalculatorButtonKind.Number} label="3" position={[3, 5]} onClick={handleInput('3')}/>
                <CalculatorButton buttonKind={CalculatorButtonKind.Number} label="2" position={[2, 5]} onClick={handleInput('2')}/>
                <CalculatorButton buttonKind={CalculatorButtonKind.Number} label="1" position={[1, 5]} onClick={handleInput('1')}/>
                <CalculatorButton buttonKind={CalculatorButtonKind.Number} label="0" position={[1, 6]} width={3} onClick={handleInput('0')}/>
            </Grid>
        </Container>
    )
}

export default Calculator;