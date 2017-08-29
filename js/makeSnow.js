// Snow from https://codepen.io/radum/pen/xICAB

(function () {
  var COUNT = 10; //no snow by default

  //determine if the date is in december.  it is let it snow!!
  getSnow();

  var masthead = document.querySelector('.sky');
  var canvas = document.createElement('canvas');
  var ctx = canvas.getContext('2d');
  var width = masthead.clientWidth;
  var height = masthead.clientHeight;
  var i = 0;
  var active = false;

  function onResize() {
    width = masthead.clientWidth;
    height = masthead.clientHeight;
    canvas.width = width;
    canvas.height = height;
    ctx.fillStyle = '#FFF';

    var wasActive = active;
    active = width > 600;

    if (!wasActive && active)
      requestAnimFrame(update);
  }

  var Snowflake = function () {
    this.x = 0;
    this.y = 0;
    this.vy = 0;
    this.vx = 0;
    this.r = 0;

    this.reset();
  }

  Snowflake.prototype.reset = function() {
    this.x = Math.random() * width;
    this.y = Math.random() * -height;
    this.vy = 1 + Math.random() * 3;
    this.vx = 0.5 - Math.random();
    this.r = 1 + Math.random() * 2;
    this.o = 0.5 + Math.random() * 0.5;
  }

  canvas.style.position = 'absolute';

  //set the left and top to the offsets of the parent; this prevents the elements from being out of sync
  canvas.style.left = masthead.offsetLeft;
  canvas.style.top = masthead.offsetTop;

  var snowflakes = [], snowflake;
  for (i = 0; i < COUNT; i++) {
    snowflake = new Snowflake();
    snowflake.reset();
    snowflakes.push(snowflake);
  }

  function update() {

    ctx.clearRect(0, 0, width, height);

    if (!active)
      return;

    for (i = 0; i < COUNT; i++) {
      snowflake = snowflakes[i];
      snowflake.y += snowflake.vy;
      snowflake.x += snowflake.vx;

      ctx.globalAlpha = snowflake.o;
      ctx.beginPath();
      ctx.arc(snowflake.x, snowflake.y, snowflake.r, 0, Math.PI * 2, false);
      ctx.closePath();
      ctx.fill();

      if (snowflake.y > height) {
        snowflake.reset();
      }
    }

    requestAnimFrame(update);
  }

  // shim layer with setTimeout fallback
  window.requestAnimFrame = (function(){
    return  window.requestAnimationFrame       ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame    ||
            function( callback ){
              window.setTimeout(callback, 1000 / 60);
            };
  })();

  onResize();
  window.addEventListener('resize', onResize, false);

  masthead.appendChild(canvas);

  /**
    Make the banner snow if it is January or February.  Will cause it to start snowling lightly in Dec and progressively harder until Christmas
  **/
  function getSnow() {
    var today = new Date();
    var month = today.getMonth();

    if (month === 0) { //lots of snow if it's January
      COUNT = 200;
      return;
    }

    if (month === 1 ) { //only a little snow in February
      COUNT = 50;
      return;
    }

    if (month !== 11) return; //if the month isn't December return since we already have Jan/Feb taken care of

    var day = today.getDate();

    if (day >= 1 && day < 5) {
      COUNT = 10; //only a little snow since it's the beginning of the month
    } else if (day >= 5 && day < 10) {
      COUNT = 20; //a little more snow now
    } else if (day >= 10 && day < 15) {
      COUNT = 50; //getting snowier
    } else if (day >= 15 && day < 20) {
      COUNT = 100; //more snow now
    } else if (day >= 20 && day < 24) {
      COUNT = 150; //very snowy
    } else if (day >= 24) {
      COUNT = 200; //so much snow!!
    }
  }
})();
