import React, { useState } from "react";
import Board from "./Board";
import "./Container.css";


function Container() {

    const [penColor, setPenColor] = useState("black");

    const changeColor = (e) => {
        setPenColor(penColor);
    };

    return (
        <div className="container">
            <div className="color-picker-container">
                <input type="color" id="favcolor" onChange={changeColor}/>
            </div>
            <div className="board-container">
                <Board penColor={penColor} />
            </div>
        </div>
    );
};


export default Container;