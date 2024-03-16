import { useContext } from "react"
import { TTTContext } from "../Helpers/Context"

export default function MainMenu() {
    const { gameState, setGameState } = useContext(TTTContext);

    return (
        <div className="MainMenu">
            <h1>Main Menu</h1>

            {/* <button onClick={() => setGameState("tictactoe")}>Play local</button> */}
            <button onClick={() => setGameState("joinroom")}>Play online</button>
        </div>
    )
}