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

Bishop.prototype.moveTo = function(targetPosition) {
    if (this.isValidPosition(targetPosition)) {
        console.log("start");
        let targetPiece = this.board.getPieceAt(targetPosition);
        
        if (targetPiece && targetPiece.color !== this.color) {
            targetPiece.kill(targetPiece);
        }
        this.position = targetPosition.col + targetPosition.row;
        this.render();
        this.board.switchPlayer();
        return console.log("move made");
    }
    return console.log("move not made");
}
