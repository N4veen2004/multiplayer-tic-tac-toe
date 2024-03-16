import { useContext } from "react";
import { TTTContext } from "../Helpers/Context";
import TTTContainer from "./TTTContainer";
import '../App.css';

export default function TicTacToe() {

    const { gameState, setGameState, currPlayer, setCurrPlayer, isOnline, playersIn, setGrid, isGameOver } = useContext(TTTContext);

    const handleReset = () => {
        setGrid([[0, 0, 0], [0, 0, 0], [0, 0, 0]]);
        setGameState("menu");

    }

    const getStringState = () => {

        let str = "";

        if (isOnline) {
            playersIn.length === 1 || playersIn.length === 0 ? str = "Get a friend" : str = `${playersIn[currPlayer - 1].username}'s turn`;
            if (isGameOver) {
                return `${currPlayer === 1 ? playersIn[1].username : playersIn[0].username} WON!!!`;
            }
        } else {
            str = `${currPlayer === 1 ? "X" : "O"}'s turn`;
            if (isGameOver) {
                return `${currPlayer === 1 ? "O" : "X"} WON!!!`;
            }
        }

        return str;

    }

    return (
        <div className="TicTacToe">
            <h1>{getStringState()}</h1>

            <TTTContainer></TTTContainer>
            <br />
            <button onClick={handleReset}>back to main menu</button>
        </div>
    )

}