$(document).ready(function(){
  var element = $('#daysTillChristmas');

  var today = new Date();
  var christmas = new Date(today.getFullYear(), 11, 25);

  var days = parseInt((christmas - today) / (24 * 3600 * 1000)); //number of days till Christmas

  var message = '';
  if (days >= 100) {
    message = 'You have a long way to go...';
  } else if (days >=50 && days < 100) {
    message = 'Christmas is getting closer..';
  } else if (days >= 25 && days < 50) {
    message = 'Christmas is in the air now...'
  } else if (days >= 10 && days < 25) {
    message = 'Getting very close now...';
  } else if (days >= 5 && days < 10) {
    message = 'Santa is warming up his sled and getting the reindeer ready...';
  } else if (days >= 2 && days < 5) {
    message = 'I hope you have been good this year!  It is almost Ciristmas!!';
  } else if (days >= 1 && days < 2) {
    message = 'It is Christmas Eve!! I hope you already got your Christmas list to Santa!!';
  }

  if (days > 1) {
    element.append('<h2 class="padTopFivePct">' + days + ' days until Christmas!</h2><h4 class="padBottomFivePct">' + message + '</h4>');
  } else if (days <= 1 && days > 0) {
    element.append('<h2 class="padTopFivePct">1 day until Christmas!</h2><h4 class="padBottomFivePct">' + message + '</h4>');
  } else if (days <= 0 && days > -4) {
    element.append('<h1>MERRY CHRISTMAS!!!</h1>');
  } else if (days >= -4) {
    element.append('<h2>Happy New Year!  Check back when we are getting close to next Christmas!</h2>');
  }
});
