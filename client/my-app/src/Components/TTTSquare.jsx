import io from "socket.io-client";
import '../App.css';
import { useState, useEffect, useContext } from 'react';
import { TTTContext } from '../Helpers/Context';

const socket = io.connect("http://localhost:3001");

export default function TTTSquare({ gridIndex }) {

    const { grid, setGrid, currPlayer, setCurrPlayer, room, currClientId, playersIn, isOnline, isGameOver } = useContext(TTTContext);
    const [index, setIndex] = useState(gridIndex);
    const [pos, setPos] = useState({ row: 0, col: 0 });

    useEffect(() => {

        const row = Math.floor(gridIndex / grid.length);
        const col = gridIndex - (row * grid[0].length);

        setPos({ row, col });

    }, []);

    const updateGrid = () => {

        if (isGameOver) {
            return;
        }

        if (grid[pos.row][pos.col] !== 0) {
            return;
        }

        if (isOnline) {
            if (playersIn.length !== 0 && playersIn.length !== 1) {
                console.log("THE CURRENT PLAYER IS: ", playersIn[currPlayer - 1], "and current ID is: ", currClientId);
                if (playersIn[currPlayer - 1].id !== currClientId) {
                    return;
                }
            } else {
                console.log("no friends lmaooooooooo");
                return;
            }
        } else {
            setCurrPlayer(currPlayer === 1 ? 2 : 1);
        }

        const newGrid = [...grid];
        newGrid[pos.row][pos.col] = currPlayer;
        setGrid(newGrid);

        socket.emit("update-grid", { newGrid, currPlayer, room, currClientId })

    };

    return (
        <div className="TTTSquare" onClick={updateGrid}>
            {grid && grid[pos.row][pos.col] === 1 && <h1>X</h1>}
            {grid && grid[pos.row][pos.col] === 2 && <h1>O</h1>}
        </div>
    )

}