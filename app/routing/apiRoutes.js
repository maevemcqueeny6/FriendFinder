var friends = require("../data/friends");

module.exports = function(app) {

  app.get("/api/friends", function(req, res) {
    res.json(friends);
  });

  app.post("/api/friends", function(req, res){

    var user = req.body;
    // var newUsersScore = req.body.scores;
    var greatestPossDiff = 20;
    var bestPossFriend = 0;
    // var rank = [];
    // var match = 0;

    for(var i = 0; i < friends.length; i++) {
        var totalDifference = 0;
        for(var j = 0; j < friends[i].scores.length; j++) {
          var difference = Math.abs(user.scores[j] - friends[i].scores[j]);
          totalDifference += difference;
        }
  
        // if there is a new minimum, change the best friend index and set the new minimum for next iteration comparisons
        if(totalDifference < greatestPossDiff) {
          bestPossFriend = i;
          greatestPossDiff = totalDifference;
        }
      }
  
      // after finding match, add user to friend array
      friends.push(user);
  
      // send back to browser the best friend match
      res.json(friends[bestPossFriend]);

    });
};
  