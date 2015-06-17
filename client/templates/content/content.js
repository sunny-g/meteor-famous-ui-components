Content = function() {
  famous.core.Node.call(this);

  this.onReceive = function(type, ev) {
    if (type === 'draggingContentBox') {
      console.log('heard ContentBox drag');
    }
  }
};
Content.prototype = Object.create(famous.core.Node.prototype);
Content.prototype.constructor = Content;

ContentBox = function() {
  famous.core.Node.call(this);
  this.position = new famous.components.Position(this);

  this.gestures = new famous.components.GestureHandler(this);

  var startingX = this.position._x._state;
  this.gestures.on('drag', function (ev) {
    this.position.set(this.position._x._state + ev.centerDelta.x);
    this.emit('draggingContentBox');
  }.bind(this));
};
ContentBox.prototype = Object.create(famous.core.Node.prototype);
ContentBox.prototype.constructor = ContentBox;

FView.wrap('Content', Content);
FView.wrap('ContentBox', ContentBox);