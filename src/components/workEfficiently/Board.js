import React, { useEffect, useRef, useState } from "react";
import "./Board.css"


function Board() {

    const canvasRef = useRef(null);
    const contextRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [penColor, setPenColor] = useState("#000000");

    
    
    useEffect(() => {
        const canvas = canvasRef.current;
        canvas.width = window.innerWidth * 2;
        canvas.height = window.innerHeight * 2;
        
        canvas.style.width = `${window.innerWidth}px`;
        canvas.style.height = `${window.innerHeight}px`;
        
        const context = canvas.getContext("2d");
        context.scale(2, 2);
        context.lineCap = "round";
        context.strokeStyle = `${penColor}`;
        context.lineWidth = 2;
        contextRef.current = context;
    }, [penColor]);
    
    
    const startDraw = ({nativeEvent}) => {
        const {offsetX, offsetY} = nativeEvent;                 // get mouse position
        
        contextRef.current.beginPath();
        contextRef.current.moveTo(offsetX, offsetY);
        setIsDrawing(true);
    };
    
    
    const draw = ({nativeEvent}) => {
        if (isDrawing)
        {
            const {offsetX, offsetY} = nativeEvent;
            contextRef.current.lineTo(offsetX, offsetY);
            contextRef.current.stroke();
        }
    };
    
    
    const stopDraw = () => {
        contextRef.current.closePath();
        setIsDrawing(false);
    };
    
    
    const changeColor = (e) => {
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        setPenColor(e.target.value);
        context.strokeStyle = `${penColor}`;
    };


    return (
        <div className="container">
            <div className="color-picker-container">
                <input type="color" id="favcolor" value={penColor} onChange={changeColor}/>
            </div>
            <div className="board">
                <canvas className="board" id="board"
                    ref={canvasRef}
                    onMouseDown={startDraw}
                    onMouseUp={stopDraw}
                    onMouseMove={draw}
                />
            </div>
        </div>
    );
};


export default Board;