var Rook = function(config){
    this.type = 'rook';
    this.constructor(config);
};



Rook.prototype = new Piece({});

// Method to check if the new position is valid for a rook
Rook.prototype.isValidPosition = function(targetPosition) {
    // Convert current position to row and column
    let currentCol = this.position.charAt(0);
    let currentRow = parseInt(this.position.charAt(1));

    // Rook can move any number of squares along the same row or column
    if (targetPosition.col === currentCol) {
        // Moving vertically (same column)
        return targetPosition.row !== currentRow.toString(); // Not the same position
    } else if (targetPosition.row === currentRow.toString()) {
        // Moving horizontally (same row)
        return true; // Valid horizontal move
    }

    // If none of the above conditions are met, the move is invalid
    console.warn("Invalid move for rook");
    return false;
};

// Move method to change the rook's position
Rook.prototype.moveTo = function(targetPosition) {
    if (this.isValidPosition(targetPosition)) {
        this.position = targetPosition.col + targetPosition.row;
        this.render(); // Update the visual representation of the rook
    } else {
        console.warn("Invalid move for rook");
    }
};

// Optionally implement the kill method
Rook.prototype.kill = function(targetPiece) {
    if (targetPiece.color !== this.color) {
        console.log(`${this.type} captured ${targetPiece.type} at ${targetPiece.position}`);
        // Remove the target piece from the game
        targetPiece.$el.parentNode.removeChild(targetPiece.$el);
        targetPiece.position = null; // Optionally mark the piece as dead
    } else {
        console.warn("Cannot capture your own piece.");
    }
};
