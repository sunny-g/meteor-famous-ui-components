HeaderSwiper = function() {
  famous.core.Node.call(this);

  this.onReceive = function(type, ev) {
    if (type === 'draggingHeaderTitle') {
      console.log('heard headerTitle drag');
    }
  }
};
HeaderSwiper.prototype = Object.create(famous.core.Node.prototype);
HeaderSwiper.prototype.constructor = HeaderSwiper;

HeaderTitle = function() {
  famous.core.Node.call(this);

  // constants
  this.HEADER_HEIGHT = 0;
  this.SWIPE_THRESHOLD = (function(distanceFromCenter) {
    return [-window.innerWidth * distanceFromCenter, window.innerWidth * distanceFromCenter];
  })(0.45);
  this.EASE_RETURN = 'outCubic';
  this.EASE_CHANGE = 'outCubic';

  this.position = new famous.components.Position(this);

  // GESTURE HANDLING
  this.gestures = new famous.components.GestureHandler(this);
  this.gestures.on('drag', headerSwipeHandler.bind(this));
};
HeaderTitle.prototype = Object.create(famous.core.Node.prototype);
HeaderTitle.prototype.constructor = HeaderTitle;

function headerSwipeHandler(ev) {
  /*
  MEANWHILE ELSEWHERE
    hearing a viewchange event triggers something...?
   */
  this.position.set(this.position._x._state + ev.centerDelta.x);

  if (ev.status === 'end') {
    var posX = this.getPosition()[0];
    if (posX > this.SWIPE_THRESHOLD[0] && posX < this.SWIPE_THRESHOLD[1]) {
      // within threshold
      this.position.set(0,0,this.HEADER_HEIGHT, {
        duration: 1000,
        curve: this.EASE_RETURN
      });
    } else {
      // escapes threshold
      /*
      3) if x pos passes some threshold
        element springs to new position
        emit a viewchange event
       */

    }

  }
}

FView.wrap('HeaderSwiper', HeaderSwiper);
FView.wrap('HeaderTitle', HeaderTitle);