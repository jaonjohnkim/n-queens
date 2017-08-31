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
      if (board.hasAnyRowConflicts() || board.hasAnyColConflicts()) {
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

  if (n === 1) { return 1; }
  var solutionMatrices = [];
  var solutionCount = 0;
  var recurse = function(board) {
    var row = [];
    for (var i = 0; i < n; i++) {
      row.push(0);
    }
    for (var j = 0; j < n; j++) {
      var conflict = false;
      // console.log('board ', board);
      for (var k = 0; k < board.length; k++) {
        if (!conflict && board[k] !== undefined && board[k][j] === 1) {
          conflict = true;          
        }
      }
      if (board.length === 0 || !conflict) {
        row[j] = 1;
        if (board.length === n - 1) {
          console.log('Single solution: ', JSON.stringify(board.concat([row])));
          // console.log(JSON.stringify(board));
          var duplicate = _.any(solutionMatrices, function(value) {
            return value === JSON.stringify(board.concat([row]));
          });
          if (!duplicate) {
            solutionMatrices.push(JSON.stringify(board.concat([row])));
            solutionCount++;
          }
        } else {
          recurse(board.concat([row]));
        }
        // console.log('before resetting', row);
        row[j] = 0;
      }
      // console.log('after resetting', row);
    }
  };
  // debugger;
  recurse([]);
  // this.findNRooksSolution(n);
  // console.log(JSON.stringify(solutionMatrices));
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  
  var solution = undefined;

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
