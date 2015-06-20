HeaderSwiper = function() {
  famous.core.Node.call(this);
  this
    .setSizeMode('default', 'absolute')
    .setAbsoluteSize(null, 100);

  // constants
  this.HEADER_HEIGHT = 0;
  this.SWIPE_THRESHOLD = (function(distanceFromCenter) {
    return [-window.innerWidth * distanceFromCenter, window.innerWidth * distanceFromCenter];
  })(0.45);
  this.EASE_RETURN = 'outCubic';
  this.EASE_CHANGE = 'outCubic';

  this.position = new famous.components.Position(this);

  this.layout = new HeaderSwiperLayout(this);
  /*
  TODO: avoid using a setTimeout to setLayout
    preferable to use some kind of event listener
   */
  famous.core.FamousEngine.getClock().setTimeout(function() {
    this.layout.setLayout();
  }.bind(this), 200);

  this.onReceive = function(type, ev) {
    if (type === 'headerSwiperChange') {
      headerSwipeHandler.call(this, ev);
    }
  };

  console.log(this);
};
HeaderSwiper.prototype = Object.create(famous.core.Node.prototype);
HeaderSwiper.prototype.constructor = HeaderSwiper;

var HeaderSwiperLayout = function(node) {
  this.node = node;
};

HeaderSwiperLayout.prototype.setLayout = function() {
  var children = this.node.getChildren();
  for (var i = 0; i < children.length; i++) {
    children[i].position.set(window.innerWidth * i / 2);
  }
};

function headerSwipeHandler(ev) {
  /*
  MEANWHILE ELSEWHERE
    hearing a viewchange event triggers something...?
   */
  this.position.set(this.position._x._state + ev.centerDelta.x);

  if (ev.status === 'end') {
    /*
      TODO: have node be bound to headerTitle positions
        (every window.innerWidth/2 px)


     */

    var posX = this.getPosition()[0];
    if (posX > this.SWIPE_THRESHOLD[0] && posX < this.SWIPE_THRESHOLD[1]) {
      this.position.set(0,0,this.HEADER_HEIGHT, {
        duration: 1000,
        curve: this.EASE_RETURN
      });
    } else {
      // escapes threshold
      /*
      3) if x pos passes some threshold
        element eases to next/previous headerTitle
        emit a viewchange event
       */

    }
  }
}

FView.wrap('HeaderSwiper', HeaderSwiper);