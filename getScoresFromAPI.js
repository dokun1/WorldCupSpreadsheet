var ss = SpreadsheetApp.getActiveSpreadsheet();
var sheet = ss.getSheetByName('WC2022Picks');
var standingsRange = ss.getSheetByName('Standings').getRange(3, 2, 12, 2);

function getScoresFromAPI() {
  var response = UrlFetchApp.fetch("https://worldcupjson.net/matches").toString();
  var json = JSON.parse(response);
  for (var game = 0; game < json.length; game++) {
    var gameRow = game + 10;
    let isScoringComplete = sheet.getSheetValues(gameRow, 29, 1, 1).toString().toLowerCase();
    if (isScoringComplete == "yes") {
      console.log("already got scores for row " + gameRow);
      continue;
    }
    console.log("will fetch score for row " + gameRow);
    var actualGameString = sheet.getSheetValues(gameRow, 2, 1, 1).toString();
    var theseTeams = actualGameString.split(' v ');
    var teamOne = theseTeams[0];
    var teamTwo = theseTeams[1];
    let possibleGames = json.filter(game => 
      getGameStringFromJSON(game).includes(teamOne) && getGameStringFromJSON(game).includes(teamTwo)
    );
    if (possibleGames.length == 1) {
      const matchingGame = possibleGames[0];
      var winner = matchingGame.winner;
      if (winner != null) {
        if (winner == "Korea Republic") {
          winner = "South Korea"
        }
        var scoreString = winner + " (" + matchingGame.home_team.goals + " - " + matchingGame.away_team.goals;
        if (matchingGame.home_team.goals == matchingGame.away_team.goals && matchingGame.home_team.penalties != null && matchingGame.away_team.penalties != null) {
          scoreString += " PK " + matchingGame.home_team.penalties + " - " + matchingGame.away_team.penalties + ")";
        } else {
          scoreString += ")";
        }
        var resultRange = sheet.getRange(gameRow, 4, 1, 1);
        resultRange.setValue(scoreString);
        console.log("game was won by " + scoreString);
      } else {
        console.log("game is not over yet");
      }
    } else {
      console.log("no matching games for row: " + gameRow);
    }
  }
}