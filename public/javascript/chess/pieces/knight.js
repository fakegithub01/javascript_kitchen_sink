var Knight = function(config) {
    this.type = 'knight';
    this.constructor(config);
};

// Inherit from the base Piece class
Knight.prototype = new Piece({});

Knight.prototype.moveTo = function(targetPosition) {
    if (this.isValidPosition(targetPosition)) {
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
};

Knight.prototype.isValidPosition = function(targetPosition) {
    let currentCol = this.position[0].toUpperCase();  // Current column (letter)
    let currentRow = parseInt(this.position[1], 10);  // Current row (number)
    let targetRow = parseInt(targetPosition.row, 10);
    let targetCol = targetPosition.col.toUpperCase();

    // Convert column letters to numbers for easier calculations
    let currentColNum = currentCol.charCodeAt(0) - 'A'.charCodeAt(0) + 1;
    let targetColNum = targetCol.charCodeAt(0) - 'A'.charCodeAt(0) + 1;

    // Calculate the differences between rows and columns
    let rowDiff = Math.abs(targetRow - currentRow);
    let colDiff = Math.abs(targetColNum - currentColNum);

    // Check if the move follows the L-shape pattern of the knight (2,1 or 1,2 move)
    if (this.color === this.board.currentPlayer && 
        ((rowDiff === 2 && colDiff === 1) || (rowDiff === 1 && colDiff === 2))) {
        return true;
    }
    
    console.warn("Invalid move for Knight");
    return false;
};


