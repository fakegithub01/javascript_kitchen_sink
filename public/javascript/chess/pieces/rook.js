var Rook = function(config){
    this.type = 'rook';
    this.constructor(config);
};



Rook.prototype = new Piece({});

// Method to check if the new position is valid for a rook
Rook.prototype.isValidPosition = function(targetPosition) {

    let currentCol = this.position[0].toUpperCase();  // Current column (letter)
    let currentRow = parseInt(this.position[1], 10);  // Current row (number)
    let targetRow = parseInt(targetPosition.row, 10);
    let targetCol = targetPosition.col.toUpperCase();

    // Check if the target position is in the same row or column
    const isSameRow = currentRow === targetRow;
    const isSameColumn = currentCol === targetCol;

    // Rook can only move in straight lines (same row or column)
    if (this.color === this.board.currentPlayer && (isSameRow || isSameColumn)) {
        // Check for pieces in between
        if (this.isPathClear(targetPosition)) {
            return true; // Move is valid
        }
    }
    // If none of the above conditions are met, the move is invalid
    console.warn("Invalid move for rook");
    return false;
};

// Move method to change the rook's position
Rook.prototype.moveTo = function(targetPosition) {
    if (this.isValidPosition(targetPosition)) {
        let targetPiece = this.board.getPieceAt(targetPosition);
        
        // Capture the target piece if it's not of the same color
        if (targetPiece && targetPiece.color !== this.color) {
            targetPiece.kill(targetPiece);
        }
        // Update the rook's position
        this.position = targetPosition.col + targetPosition.row;
        this.render();
        this.board.switchPlayer();
        return console.log("Move made");
    } else {
        console.warn("Invalid move for rook");
    }
};

// Method to check if the path is clear for the rook's move
Rook.prototype.isPathClear = function(targetPosition) {
    let currentCol = this.position[0].toUpperCase();
    let currentRow = parseInt(this.position[1], 10);
    let targetRow = parseInt(targetPosition.row, 10);
    let targetCol = targetPosition.col.toUpperCase();

    // Determine the direction of movement
    let checkRow, checkCol;
    
    if (currentRow === targetRow) {
        // Horizontal move
        const colStep = targetCol.charCodeAt(0) > currentCol.charCodeAt(0) ? 1 : -1;
        checkCol = currentCol.charCodeAt(0) + colStep;

        while (checkCol !== targetCol.charCodeAt(0)) {
            let checkPosition = { row: currentRow.toString(), col: String.fromCharCode(checkCol) };
            if (this.board.getPieceAt(checkPosition)) {
                console.warn(`Path is not clear for Rook at row: ${currentRow}, col: ${String.fromCharCode(checkCol)}`);
                return false; // Path is blocked
            }
            checkCol += colStep;
        }
    } else if (currentCol === targetCol) {
        // Vertical move
        const rowStep = targetRow > currentRow ? 1 : -1;
        checkRow = currentRow + rowStep;

        while (checkRow !== targetRow) {
            let checkPosition = { row: checkRow.toString(), col: currentCol };
            if (this.board.getPieceAt(checkPosition)) {
                console.warn(`Path is not clear for Rook at row: ${checkRow}, col: ${currentCol}`);
                return false; // Path is blocked
            }
            checkRow += rowStep;
        }
    } else {
        console.warn("Rook cannot move diagonally");
        return false; // Rook can only move straight
    }

    return true; // Path is clear
};
