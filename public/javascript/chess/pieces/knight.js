// var Knight = function(config){
//     this.type = 'knight';
//     this.constructor(config);
// };



// Knight.prototype = new Piece({});
// Knight.prototype.move = function(newPosition){

// }


var Knight = function(config) {
    this.type = 'knight';
    this.constructor(config); // Call the constructor with the configuration
};

// Inherit from the base Piece class
Knight.prototype = new Piece({});

Knight.prototype.moveTo = function(cell, switchPlayer) {
    const currentPosition = this.position;
    
    // Get new position from the cell object
    const destinationRow = cell.row;
    const destinationCol = cell.col;

    // Validate if the knight's movement follows its allowed moves
    if (!this.isValidMove(currentPosition, destinationRow, destinationCol)) {
        console.warn("Move is invalid for Knight");
        return;
    }

    // Update position if valid and re-render the piece
    this.position = destinationCol + destinationRow;
    this.render();
    switchPlayer();  // Switch player after the move
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



// var Knight = function(config) {
//     this.type = 'knight';
//     this.constructor(config); // Call the constructor with the configuration
// };

// // Inherit from the base Piece class
// Knight.prototype = new Piece({});

// Knight.prototype.moveTo = function(cell, switchPlayer) {
//     const currentPosition = this.position;
    
//     // Get new position from the cell object
//     const destinationRow = cell.row;
//     const destinationCol = cell.col;

//     // Validate if the knight's movement follows its allowed moves
//     if (!this.isValidMove(currentPosition, destinationRow, destinationCol)) {
//         console.warn("Move is invalid for Knight");
//         return;
//     }

//     // Check if there's a piece at the destination that can be captured
//     if (cell.piece && this.isOpponentPiece(cell.piece)) {
//         this.kill(cell.piece);
//     }

//     // Update position if valid and re-render the piece
//     this.position = destinationCol + destinationRow;
//     this.render();
//     switchPlayer();  // Switch player after the move
// }

// Knight.prototype.isValidMove = function(currentPosition, destinationRow, destinationCol) {
//     // Transform the current column letter into a number (A=1, B=2, ...)
//     const currentColumn = currentPosition[0].toUpperCase().charCodeAt(0) - 'A'.charCodeAt(0) + 1;
    
//     // Get current row
//     const currentRow = parseInt(currentPosition[1], 10);

//     // Convert destination column letter to its numeric equivalent
//     const destinationColumn = destinationCol.toUpperCase().charCodeAt(0) - 'A'.charCodeAt(0) + 1;

//     // Calculate differences in row and column to check if it matches a knight's move pattern
//     const rowDifference = Math.abs(destinationRow - currentRow);
//     const columnDifference = Math.abs(destinationColumn - currentColumn);

//     // Knight moves either 2 squares in one direction and 1 in the other, or vice versa
//     return (rowDifference === 2 && columnDifference === 1) || (rowDifference === 1 && columnDifference === 2);
// };

// // Check if the piece belongs to the opponent
// Knight.prototype.isOpponentPiece = function(piece) {
//     return piece && piece.color !== this.color;
// };

// // Capture the opponent's piece
// Knight.prototype.kill = function(piece) {
//     console.log(`${this.type} captures ${piece.type}`);
//     piece.remove(); // Assume the `remove` method handles removing the captured piece from the board
// }

// // Check if the knight can attack an opponent piece in the next move
// Knight.prototype.canKill = function(cell) {
//     return cell.piece && this.isOpponentPiece(cell.piece) && this.isValidMove(this.position, cell.row, cell.col);
// };
