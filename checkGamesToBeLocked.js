var ss = SpreadsheetApp.getActiveSpreadsheet();
var sheet = ss.getSheetByName('WC2022Picks');
var standingsRange = ss.getSheetByName('Standings').getRange(3, 2, 12, 2);

/// As part of the game, I didn't want people to be able to change their selections after the game started.
/// I used this function to see whether a row needed to be locked because the game had started.
function checkGamesToBeLocked() {
  for (let rowCounter = 10; rowCounter < 74; rowCounter++) {
    var gameDateString = sheet.getSheetValues(rowCounter, 3, 1, 1).toString();
    var withoutComma = gameDateString.replace(',', '');
    var gameDateStringArray = withoutComma.split(' ');
    var gameDay = gameDateStringArray[0];
    var gameMonth = gameDateStringArray[1] == "Nov" ? 11 : 12;
    var gameHour = gameDateStringArray[2].slice(0, -2);
    
    if (gameHour == 2) {
      gameHour = 14;
    }

    let currentDate = new Date();
    let gameDate = new Date(2022, gameMonth - 1, gameDay, gameHour);

    if (currentDate > gameDate) {
      console.log("game on row " + rowCounter + " should be locked");
      lockRange(rowCounter);
    }
  }
}