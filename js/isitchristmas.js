$(document).ready(function(){
  var today = new Date();
  var month = today.getMonth();
  var day = today.getDate();

  var isChristmas = (month === 11 && day >= 25) || (month >= 0 && month <= 4);
  //isChristmas = true; //FOR TESTING PURPOSES ONLY
  if (isChristmas) {
    $('#ischristmas').show();
  } else {
    $('#notchristmas').show();
  }
});
