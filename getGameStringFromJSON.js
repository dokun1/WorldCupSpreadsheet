var ss = SpreadsheetApp.getActiveSpreadsheet();
var sheet = ss.getSheetByName('WC2022Picks');
var standingsRange = ss.getSheetByName('Standings').getRange(3, 2, 12, 2);

/// This function helped me draw out a friendly string depicting each match that was going to occur.
function getGameStringFromJSON(game) {
    if (game == null) {
      return "no game";
    }
    if (game.home_team == null) {
      return "no game";
    }
    var homeTeam = game.home_team.name;
    var awayTeam = game.away_team.name;
    if (homeTeam == "Korea Republic") {
      homeTeam = "South Korea";
    }
    if (homeTeam == "To Be Determined") {
      homeTeam = game.home_team.country;
    }
    if (awayTeam == "Korea Republic") {
      awayTeam = "South Korea"
    }
    if (awayTeam == "To Be Determined") {
      awayTeam = game.away_team.country;
    }
    var gameString = homeTeam + " v " + awayTeam;
    return gameString;
  }