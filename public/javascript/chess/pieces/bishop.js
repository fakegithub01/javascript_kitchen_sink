var Bishop = function(config) {
    this.type = 'bishop';
    this.constructor(config);
};

Bishop.prototype = new Piece({});
Bishop.prototype.isValidPosition = function(targetPosition) {
    let currentCol = this.position[0].toUpperCase();  // Current column (letter)
    let currentRow = parseInt(this.position[1], 10);  // Current row (number)
    let targetRow = parseInt(targetPosition.row, 10);
    let targetCol = targetPosition.col.toUpperCase();

    console.log('currR: ', currentRow, " type: ", typeof currentRow);
    console.log('currC: ', currentCol, " type: ", typeof currentCol);
    console.log('targetR: ', targetRow, " type: ", typeof targetRow);
    console.log('targetC: ', targetCol, " type: ", typeof targetCol);

    // Calculate row and column differences
    let rowDiff = Math.abs(targetRow - currentRow);
    let colDiff = Math.abs(targetCol.charCodeAt(0) - currentCol.charCodeAt(0));

    // Bishop moves diagonally, so rowDiff must equal colDiff
    if (this.color === this.board.currentPlayer && rowDiff === colDiff) {
        return true;
    }

    console.warn("Invalid move for Bishop");
    return false;
}

Bishop.prototype.isPathClear = function(targetPosition) {
    let currentCol = this.position[0].toUpperCase();
    let currentRow = parseInt(this.position[1], 10);
    let targetRow = parseInt(targetPosition.row, 10);
    let targetCol = targetPosition.col.toUpperCase();

    let rowStep = targetRow > currentRow ? 1 : -1;
    let colStep = targetCol.charCodeAt(0) > currentCol.charCodeAt(0) ? 1 : -1;

    let checkRow = currentRow + rowStep;
    let checkCol = currentCol.charCodeAt(0) + colStep;

    // Iterate through each square between the current position and the target
    while (checkRow !== targetRow && checkCol !== targetCol.charCodeAt(0)) {
        let checkPosition = String.fromCharCode(checkCol) + checkRow;
        if (this.board.getPieceAt({ col: String.fromCharCode(checkCol), row: checkRow })) {
            console.warn("Path is not clear for Bishop");
            return false;
        }
        checkRow += rowStep;
        checkCol += colStep;
    }

    return true;
}

Bishop.prototype.moveTo = function(targetPosition) {
    if (this.isValidPosition(targetPosition) && this.isPathClear(targetPosition)) {
        console.log("start");
        let targetPiece = this.board.getPieceAt(targetPosition);

        if (targetPiece && targetPiece.color !== this.color) {
            targetPiece.kill(targetPiece);
        }
        this.position = targetPosition.col + targetPosition.row;
        this.render();
        this.board.switchPlayer();
        return console.log("yes end");
    }
    return console.log("no");
}
