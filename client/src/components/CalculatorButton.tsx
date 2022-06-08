import React from 'react';
import styled from 'styled-components';


export enum CalculatorButtonKind {
    Number, 
    Operation
} 
type CalculatorButtonProps = React.HTMLProps<HTMLButtonElement> & {
    label:string;
    position?:[x:number, y:number]; /* 1 indexed */
    width?:number;
    height?:number;
    buttonKind?:CalculatorButtonKind;
}

const CalculatorButtonStyle = styled.button`
    background:#727171;
    border:none;
    border-radius: 8px;
    font-size:20px;
    color:#fff;
`;

const CalculatorButton: React.FC<CalculatorButtonProps> = ({buttonKind= CalculatorButtonKind.Operation ,label, position, width, height, onClick}) => {
    const styles:React.CSSProperties ={}
    if(position)
    {
        styles.gridColumnStart = position[0];
        styles.gridRowStart = position[1];
    }
    if(width)
    {
        styles.gridColumnEnd = `span ${width}`;
    }
    if(height)
    {
        styles.gridRowEnd = `span ${height}`;
    }
    if(buttonKind === CalculatorButtonKind.Number)
    {
        styles.color = "#000";
        styles.background = "#e48900";
    }
    return (
        <CalculatorButtonStyle onClick={onClick} style={styles}>{label}</CalculatorButtonStyle>
    )
} 

export default CalculatorButton;