var Knight = function(config) {
    this.type = 'knight';
    this.constructor(config); // Call the constructor with the configuration
};

// Inherit from the base Piece class
Knight.prototype = new Piece({});

Knight.prototype.moveTo = function(cell) {
    const currentPosition = this.position;
    
    // Validate if the knight's movement follows its allowed moves
    if (!this.isValidMove(currentPosition, cell.row, cell.col)) {
        console.warn("Move is invalid for Knight");
        return false; // Indicate that the move was not valid
    }

    // Check if there's a piece at the destination
    let targetPiece = this.board.getPieceAt(cell);

    // If there is a target piece and it's of the opposite color, execute kill
    if (targetPiece && targetPiece.color !== this.color) {
        targetPiece.kill(targetPiece);  // Call the kill method from Piece
    }

    // Update position if valid and re-render the piece
    this.position = cell.col + cell.row;
    this.render();

    return true; // Indicate that the move was valid
}


Knight.prototype.isValidMove = function(currentPosition, destinationRow, destinationCol) {
    // Transform the current column letter into a number (A=1, B=2, ...)
    const currentColumn = currentPosition[0].toUpperCase().charCodeAt(0) - 'A'.charCodeAt(0) + 1;
    
    // Get current row
    const currentRow = parseInt(currentPosition[1], 10);

    // Convert destination column letter to its numeric equivalent
    const destinationColumn = destinationCol.toUpperCase().charCodeAt(0) - 'A'.charCodeAt(0) + 1;

    // Calculate differences in row and column to check if it matches a knight's move pattern
    const rowDifference = Math.abs(destinationRow - currentRow);
    const columnDifference = Math.abs(destinationColumn - currentColumn);

    // Knight moves either 2 squares in one direction and 1 in the other, or vice versa
    return (rowDifference === 2 && columnDifference === 1) || (rowDifference === 1 && columnDifference === 2);
};
