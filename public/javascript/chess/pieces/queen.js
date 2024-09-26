var Queen = function(config){
    this.type = 'queen';
    this.constructor(config);
};

Queen.prototype = new Piece({});

Queen.prototype.moveTo = function(targetPosition, switchPlayer) {
  this.move(targetPosition);
  switchPlayer();
};

Queen.prototype.move = function(newPosition) {
  // Check if the new position is valid for a queen
  if (this.isValidPosition(newPosition)) {
    // Update the queen's position
    this.position = newPosition.col + newPosition.row;
    // Render the queen at the new position
    this.render();
  } else {
    console.warn("Invalid move for queen");
  }
};

Queen.prototype.isValidPosition = function(targetPosition) {
  // Convert current position to row and column
  let currentCol = this.position.charAt(0);
  let currentRow = parseInt(this.position.charAt(1));

  // Check if the target position is on the same row or column
  if (targetPosition.col === currentCol || targetPosition.row === currentRow.toString()) {
    // Check if the target position is not the same as the current position
    if (targetPosition.col !== currentCol || targetPosition.row !== currentRow.toString()) {
      return true;
    }
  }

  // Check if the target position is on the same diagonal
  let rowDiff = Math.abs(currentRow - parseInt(targetPosition.row));
  let colDiff = Math.abs(currentCol.charCodeAt(0) - targetPosition.col.charCodeAt(0));
  if (rowDiff === colDiff) {
    return true;
  }

  // If none of the above conditions are met, the move is invalid
  console.warn("Invalid move for queen");
  return false;
};