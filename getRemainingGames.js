var ss = SpreadsheetApp.getActiveSpreadsheet();
var sheet = ss.getSheetByName('WC2022Picks');
var standingsRange = ss.getSheetByName('Standings').getRange(3, 2, 12, 2);

/// I had to cheat with this a little bit. The games started getting mixed up when the group stages were ending, and games had to start at the same time.
function getRemainingGames() {
  var response = UrlFetchApp.fetch("https://worldcupjson.net/matches").toString();
  var json = JSON.parse(response);
  for (var game = 48; game < json.length; game++) {
    var gameRow = game + 10;
    var gameRange = sheet.getRange(gameRow, 2, 1, 1);
    gameRange.setValue(getGameStringFromJSON(json[game]));
  }
}