Header = function() {
  famous.core.Node.call(this);

  this.onReceive = function(type, ev) {
    if (type === 'draggingHeaderTitle') {
      console.log('heard headerTitle drag');
    }
  }
};
Header.prototype = Object.create(famous.core.Node.prototype);
Header.prototype.constructor = Header;

HeaderTitle = function() {
  famous.core.Node.call(this);
  this.position = new famous.components.Position(this);

  this.gestures = new famous.components.GestureHandler(this);


  this.gestures.on('drag', headerSwipeHandler.bind(this));

};
HeaderTitle.prototype = Object.create(famous.core.Node.prototype);
HeaderTitle.prototype.constructor = HeaderTitle;

function headerSwipeHandler(ev) {
  /*
  on drag:
    √ 1) set position to drag element
      y stays the same
      x offsets the click loc
   */
  /*
  MEANWHILE ELSEWHERE
    hearing a viewchange event triggers something...?
   */
  this.position.set(this.position._x._state + ev.centerDelta.x);
  //this.emit('draggingHeaderTitle');

  if (ev.status === 'end') {
    /*
    2) if x pos doesnt move by some threshold
      have element spring back to original position
    3) if x pos passes some threshold
      element springs to new position
      emit a viewchange event
     */
  }
}

FView.wrap('Header', Header);
FView.wrap('HeaderTitle', HeaderTitle);