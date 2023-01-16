var ss = SpreadsheetApp.getActiveSpreadsheet();
var sheet = ss.getSheetByName('WC2022Picks');
var standingsRange = ss.getSheetByName('Standings').getRange(3, 2, 12, 2);

function tallyScore(row, col, result) {
  console.log("tallying score for row " + row + ", column " + col);
  var playerChoice = sheet.getSheetValues(row, col, 1, 1).toString().toLowerCase();
  var pointValueRange = sheet.getRange(row, col + 1, 1, 1);
  var playerSelectionRange = sheet.getRange(row, col, 1, 2);
  var points = sheet.getSheetValues(row, col + 1, 1, 1);
  /* 
    If you pick a team and they win, you get 3 points			
    If you pick a team and they draw, you get 1 point			
    If you pick a team and they lose, you get 0 points			
    If you pick a draw and they draw, you get 2 points			
    If you pick a draw and a team wins, you get 1 point			
  */
  if (playerChoice == "--------") { // short circuit, no points
    console.log("player did not make a pick");
    points = 0;
    playerSelectionRange.setBackgroundRGB(255, 0, 0);
    playerSelectionRange.setFontColor('white');
    pointValueRange.setValue(points);
    return;
  }
  if (playerChoice == result) {
    if (result == "draw") { // 2 points
      console.log("player picked draw correctly");
      points = 2;
      playerSelectionRange.setBackgroundRGB(128, 255, 128);
    } else { // 3 points
      console.log("player picked correct team to win");
      points = 3;
      playerSelectionRange.setBackgroundRGB(0, 255, 0);
    }
  } else {
    if (result == "draw") { // 1 point
      console.log("player picked team but result was draw");
      points = 1;
      playerSelectionRange.setBackgroundRGB(254, 221, 0);
    } else if (playerChoice == "draw") { // 1 point
      console.log("player picked draw but result was win");
      points = 1;
      playerSelectionRange.setBackgroundRGB(254, 221, 0);
    } else { // 0 points
      console.log("player picked incorrect team to win");
      points = 0;
      playerSelectionRange.setBackgroundRGB(255, 0, 0);
      playerSelectionRange.setFontColor('white');
    }
  }
  pointValueRange.setValue(points);
}