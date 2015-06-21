/**
 * Creates a single child node of a HeaderSwiper.
 *
 * @constructor
 */
HeaderSwiperElement = function() {
  famous.core.Node.call(this);
  this
    .setProportionalSize(0.7, 0.5);

  this.position = new famous.components.Position(this);

  // GESTURE HANDLING
  this.gestures = new famous.components.GestureHandler(this);
  this.gestures.on('drag', function(ev) {
    this.emit('headerSwiperDrag', ev);
  }.bind(this));
};

HeaderSwiperElement.prototype = Object.create(famous.core.Node.prototype);
HeaderSwiperElement.prototype.constructor = HeaderSwiperElement;

FView.wrap('HeaderSwiperElement', HeaderSwiperElement);