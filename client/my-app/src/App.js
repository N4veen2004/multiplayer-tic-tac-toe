import io from "socket.io-client";
import './App.css';
import { useState, useEffect } from "react";
import { TTTContext } from "./Helpers/Context";
import MainMenu from './Components/MainMenu';
import TicTacToe from './Components/TicTacToe';
import JoinRoom from "./Components/JoinRoom";


const socket = io.connect("http://localhost:3001");


function App() {

  const setInitialGrid = () => {
    return [[0, 0, 0], [0, 0, 0], [0, 0, 0]]
  }

  const [isGameOver, setIsGamerOver] = useState(false);
  const [currClientId, setCurrClientId] = useState("")
  const [playersIn, setPlayersIn] = useState([]);
  const [isOnline, setIsOnline] = useState(false);
  const [currPlayer, setCurrPlayer] = useState(1);
  const [gameState, setGameState] = useState("menu");
  const [grid, setGrid] = useState(setInitialGrid);
  const [room, setRoom] = useState("");

  socket.on("connect", () => {
    console.log("Connected to server!");
    setCurrClientId(socket.id);
  });

  useEffect(() => {

    console.log("use effect called");

    const playerJoinedHandler = (players) => {
      console.log("player-joined!");

      if (players.length === 1) {
        console.log("player-joined! - player.length = 1");
        setPlayersIn(players);
        //setCurrClientId(socket.id);
      }
      else if ((players.length === 2)) {
        console.log("player-joined! - player.length = 2");
        setPlayersIn(players);
        //setCurrClientId(socket.id);
      }
      else {
        console.log("player-joined! - player.length > 2");
        //setCurrClientId("not-playing");
      }
    }

    const playerMoveHandler = (data) => {
      const { win, newGrid, currPlayer } = data;
      console.log("player-move! - should only run in local");
      setGrid(newGrid);

      setCurrPlayer(currPlayer === 1 ? 2 : 1);

      if(win !== 0){
        setIsGamerOver(true);
      }

    }

    socket.on("player-move", playerMoveHandler);
    socket.on("player-joined", playerJoinedHandler);

    // Cleanup function to remove the previous event listener
    return () => {
      socket.off("player-move", playerMoveHandler);
      socket.off("player-joined", playerJoinedHandler);
    };
  }, [socket]);


  return (
    <TTTContext.Provider value={{
      gameState, setGameState,
      grid, setGrid,
      currPlayer, setCurrPlayer,
      socket,
      room, setRoom,
      isOnline, setIsOnline,
      playersIn, setPlayersIn,
      currClientId, setCurrClientId,
      isGameOver, setIsGamerOver
    }}>
      <div className="App">
        {gameState === "menu" && <MainMenu></MainMenu>}
        {gameState === "tictactoe" && <TicTacToe></TicTacToe>}
        {gameState === "joinroom" && <JoinRoom></JoinRoom>}
      </div>
    </TTTContext.Provider>
  );
}

export default App;
