var readline = require('readline');

var reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


var TowersOfHanoi = function() {
  this.stacks = [[3,2,1],[],[]];
};


TowersOfHanoi.prototype.isWon = function(){
  if ((this.stacks[1].length === 3) || (this.stacks[2].length === 3)){
    return true;
  }
  else {
    return false;
  }
};


TowersOfHanoi.prototype.isValidMove = function(start, end) {
  var startStackLength = this.stacks[start].length;
  var endStackLength = this.stacks[end].length;
  console.log(startStackLength);
  console.log(endStackLength);
  return startStackLength !== 0 && (endStackLength === 0 ||
  (this.stacks[start][startStackLength - 1] < this.stacks[end][endStackLength - 1]));
};

TowersOfHanoi.prototype.move = function(start, end){
  this.stacks[end].push(this.stacks[start].pop());
};

TowersOfHanoi.prototype.print = function() {
  console.log("Stacks: " + JSON.stringify(this.stacks));
};

TowersOfHanoi.prototype.promptMove = function (callback) {
  reader.question("Start index?", function (answer) {
    reader.question("End index?", function (answer1) {
      var start = parseInt(answer);
      var end = parseInt(answer1);
      callback(start, end);
    });
  });
};

TowersOfHanoi.prototype.run = function (completionCallback) {
  var that = this;
  var runCallback = function (start, end) {
    if (that.isValidMove(start, end)) {
      that.move(start, end);
      that.print();
      if (that.isWon() === false) {
        that.promptMove(runCallback);
      }
      else {
        completionCallback();
      }
    }
    else {
      console.log("Invalid Move!");
      that.promptMove(runCallback);
    }
  };

  that.promptMove(runCallback);



};



var newGame = new TowersOfHanoi();
newGame.run(function () {
  console.log("You've won!");
  reader.close();
  });
