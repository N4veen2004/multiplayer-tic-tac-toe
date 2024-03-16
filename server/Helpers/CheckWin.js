

function CheckWin(grid, player, winLength = 3) {

  let win = 0;

  const rows = grid.length;
  const cols = grid[0].length;

  const checkVertical = (col) => {

    const checkRows = rows - (winLength - 1);

    let count = 0;
    console.log("player: ", player);
    for (let i = 0; i < checkRows; i++) {

      for (let r = 0; r < winLength; r++) {

        if (grid[r][col] !== player) {

          count = 0;

        } else {
          count++;
        }

        if (count === winLength) {
          win = player;
        }

      }

    }

  }

  const checkHorizontal = (row) => {

    const checkCols = cols - (winLength - 1);

    let count = 0;

    for (let i = 0; i < checkCols; i++) {

      for (let c = 0; c < winLength; c++) {

        if (grid[row][c] !== player) {
          count = 0;

        } else {
          count++;
        }

        if (count === winLength) {
          win = player;
        }

      }

    }

  }

  if (grid === undefined) {
    console.log("GRID IS UNDEFINED");
    return;
  }

  const tempGrid = [...grid];

  for (let c = 0; c < cols; c++) {
    checkVertical(c)
  }

  for (let r = 0; r < rows; r++) {
    checkHorizontal(r);
  }

  if (grid[0][0] !== 0 && (grid[0][0] === grid[1][1]) && (grid[1][1] === grid[2][2])) {
    return grid[0][0];
  }

  if (grid[0][2] !== 0 && (grid[0][2] === grid[1][1]) && (grid[1][1] === grid[2][0])) {
    return grid[0][2];
  }

  return win;

}

module.exports = CheckWin;