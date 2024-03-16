import { TTTContext } from "../Helpers/Context";
import TTTSquare from "./TTTSquare";
import '../App.css';
import { useContext, useEffect, useState } from "react";

export default function TTTContainer() {

    const { grid, setGrid } = useContext(TTTContext);
    const [singleGrid, setSingleGrid] = useState([]);

    useEffect(() => {

        const newSingleGrid = [];
        for (let i = 0; i < grid.length; i++) {
            for (let j = 0; j < grid[0].length; j++) {
                newSingleGrid.push(0);
            }
        }

        // Update the state with the singleGrid
        setSingleGrid(newSingleGrid);

    }, [])

    return (
        <div className="TTTContainer">
            {singleGrid.map((item, index) => {
                return <TTTSquare key={index} gridIndex={index} />
            })}

        </div>
    )
}