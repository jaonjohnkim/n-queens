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
  
  var recurse = function (rowIdx) {
    for (var i = 0; i < n; i++) {
      board.togglePiece(rowIdx, i);
      if (board.hasAnyColConflicts(i)) {
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
  
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  
  if (n === 0) {
    return [];
  } else if (n === 1) {
    return [[1]];
  }
  var solutionMatrix;
  
  var board = new Board({n: n});
  
  var recurse = function (rowIdx) {
    for (var i = 0; i < n; i++) {
      board.togglePiece(rowIdx, i);
      if (board.hasAnyQueenConflictsOn(rowIdx, i)) {
        //do nothing
      } else if (rowIdx === n - 1) {
        solutionMatrix = board.rows();
      } else {
        recurse(rowIdx + 1);
      }
      board.togglePiece(rowIdx, i);
    }
    
  };
  recurse(0);

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(board.rows()));
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
