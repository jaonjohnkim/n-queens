/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
  // input : number
  // output : matrix of our first solution, a valid array
  // rooks don't care about diagonal, only row and col conflicts
  
  var board = new Board({n: n});
  var solutionMatrix = [];
  // console.log(board);
  //Systematically switch 0 to 1, and check if these spots are valid
    // if the spots have conflict, we need to swtich back to 0
  for (var i = 0; i < board.attributes.n; i++) {
    for (var j = 0; j < board.attributes.n; j++) {
      // first place the 1
      board.attributes[i][j] = 1;
      // check for conflict
      if (board.hasAnyRooksConflicts()) {
        // if conflict, then switch back tp 0
        board.attributes[i][j] = 0;
      }
    }
  } 
  for (var key in board.attributes) {
    if (key !== 'n') {
      solutionMatrix.push(board.attributes[key]);
    }
  }
  // console.log(solutionMatrix);
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solutionMatrix));
  return solutionMatrix;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0;
  
  var board = new Board({n: n});
  
  var recurse = function (rowIdx, occupiedCols) {
    for (var i = 0; i < n; i++) {
      if (occupiedCols.includes(i)) {
        continue;
      }
      board.togglePiece(rowIdx, i); // row[j] = 1;
      if (board.hasAnyColConflicts(i)) {
        //do nothing
      } else if (rowIdx === n - 1) {
        solutionCount++;
        
      } else {
        // occupiedCols.push(i);
        // occupiedCols = [0] 
        // console.log('occupied columns, ', occupiedCols);
        recurse(rowIdx + 1, occupiedCols.concat(i)); // array = [0, 1]
        // occupiedCols = [0]
      }
      board.togglePiece(rowIdx, i); // row[j] = 0; 
    }
    
  };
  recurse(0, []);
  
  // console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  
  if (n === 0) {
    return [];
  }

  var solutionMatrix = [];
  var board = new Board({n: n});
  var foundSolution = false;

  var confirmSolution = function(row) {
    if (row === n) {
      foundSolution = true;
      console.log('Solution found! ', board.attributes);
      return;
    }
    for (var col = 0; col < n; col++) {
      board.get(row)[col] = 1;
      if (!board.hasAnyQueenConflictsOn(row, col)) {
        confirmSolution(row + 1); 
      }
      if (foundSolution) {
        return;
      }
      board.get(row)[col] = 0;
    }
  };
  confirmSolution(0);
  for (var key in board.attributes) {
    if (key !== 'n') {
      solutionMatrix.push(board.attributes[key]);
    }
  }
  // console.log(solutionMatrix);
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solutionMatrix));
  return solutionMatrix;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  if (n === 0) {
    return 1;
  }
  var solutionCount = 0;
  
  var board = new Board({n: n});
  
  var recurse = function (rowIdx) {
    for (var i = 0; i < n; i++) {
      board.togglePiece(rowIdx, i);
      if (board.hasAnyQueenConflictsOn(rowIdx, i)) {
        //do nothing
      } else if (rowIdx === n - 1) {
        solutionCount++;
        
      } else {
        recurse(rowIdx + 1);
      }
      board.togglePiece(rowIdx, i);
    }
    
  };
  recurse(0);

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
