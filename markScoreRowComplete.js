var ss = SpreadsheetApp.getActiveSpreadsheet();
var sheet = ss.getSheetByName('WC2022Picks');
var standingsRange = ss.getSheetByName('Standings').getRange(3, 2, 12, 2);

function markScoreRowComplete(row) {
    var scoringCompleteRange = sheet.getRange(row, 29, 1, 1);
    scoringCompleteRange.setValue("Yes");
}