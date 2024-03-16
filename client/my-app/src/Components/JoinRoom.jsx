import io from "socket.io-client";
import { useContext, useState } from "react";
import { TTTContext } from "../Helpers/Context";
import '../App.css';


const socket = io.connect("http://localhost:3001");

export default function JoinRoom() {

    const { setGameState, socket, setRoom, room, setIsOnline, setCurrClientId } = useContext(TTTContext);
    const [username, setUsername] = useState("");

    const handleSubmit = () => {

        const trimmedUsername = username.trim();
        const trimmedRoom = room.trim();

        if (trimmedUsername === "") {
            alert("Username cannot be empty");
            return;
        }

        if (trimmedRoom === "") {
            alert("Room cannot be empty");
            return;
        }

        socket.emit("join-room", { username, room, currClientId: socket.id });
        setCurrClientId(socket.id);
        setGameState("tictactoe");
        setIsOnline(true);
        setRoom(room);

    }


    return (
        <div className="JoinRoom">
            <input type="text" name="user" id="user" placeholder="username" onChange={(evt) => setUsername(evt.target.value)} />
            <input type="text" name="room" id="room" placeholder="room name" onChange={(evt) => setRoom(evt.target.value)} />
            <button onClick={() => handleSubmit()}>join room</button>
        </div>
    )

}