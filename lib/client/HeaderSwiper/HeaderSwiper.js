/**
 * Creates a HeaderSwiper node.
 *
 * @constructor
 */
HeaderSwiper = function() {
  famous.core.Node.call(this);
  // DEFAULT SIZE (if not specified in template)
  this
    .setSizeMode('default', 'absolute')
    .setAbsoluteSize(null, 100);

  // constants
  this.HEADER_Z_INDEX = 0;
  this.RELATIVE_HEADER_ELEMENT_WIDTH = 0.7;
  this.EASE_CHANGE = 'outCubic';

  this.position = new famous.components.Position(this);
  this.layout = new HeaderSwiperLayout(this);
  /*
  TODO: avoid using a setTimeout to call setLayout
    preferable to use something that sets layout after last child has been added
   */
  famous.core.FamousEngine.getClock().setTimeout(function() {
    this.layout.setLayout(this.RELATIVE_HEADER_ELEMENT_WIDTH);
  }.bind(this), 200);

  this.onReceive = function(type, ev) {
    if (type === 'headerSwiperDrag') {
      this.dragHandler(ev);
    }
  };
};

HeaderSwiper.prototype = Object.create(famous.core.Node.prototype);
HeaderSwiper.prototype.constructor = HeaderSwiper;

/**
 * Handles state changes and animations that occur when dragging.
 *
 * @this {HeaderSwiper}
 * @param ev
 */
HeaderSwiper.prototype.dragHandler = function(ev) {
  this.position.set(this.position._x._state + ev.centerDelta.x);

  if (ev.status === 'start') {
    this.startingPosX = this.getPosition()[0];
  }

  if (ev.status === 'end') {
    /*
    TODO: listen for swiper state changes AT THE PARENT
      call a fn that compares start to end posX
      if diff is >
        emit viewChange event, along with header's id
        (to identify the view that should be rendered)
     */

    var endingPosX = this.getPosition()[0];
    var diff = endingPosX - this.startingPosX;

    var stateTuple = this.nearestPosition(endingPosX);
    console.log('endingPosX:', endingPosX, stateTuple);

    this.position.set(stateTuple[1], 0, this.HEADER_Z_INDEX, {
      duration: 1000,
      curve: this.EASE_CHANGE
    });

  }
};

/**
 * Returns tuple of index and a position of a state given a position of the HeaderSwiper
 *
 * @this {HeaderSwiper}
 * @param posX
 */
HeaderSwiper.prototype.nearestPosition = function(posX) {
  // TODO: handle overflows in swiping
  /*
  if pos
   */
  var elemWidth = window.innerWidth * this.RELATIVE_HEADER_ELEMENT_WIDTH;
  // if we scroll too much to the right
  if (posX > elemWidth * 0.5) { return [0,0]; }
  var index = Math.round(Math.abs(posX) / elemWidth);
  if (index >= this.getChildren().length) {return [index - 1, -1 * (index - 1) * elemWidth]}
  return [index, -1 * index * elemWidth];
};

/**
 * Creates a layout for the HeaderSwiper and its child elements.
 *
 * @constructor
 * @param node {HeaderSwiper}
 */
var HeaderSwiperLayout = function(node) {
  this.node = node;
};

/**
 * Sets the layout for the HeaderSwiper's children elements.
 *
 * @this {HeaderSwiper}
 */
HeaderSwiperLayout.prototype.setLayout = function(relativeWidth) {
  var children = this.node.getChildren();
  for (var i = 0; i < children.length; i++) {
    var posX = window.innerWidth * i * relativeWidth;
    children[i].position.set(posX);
  }
};

FView.wrap('HeaderSwiper', HeaderSwiper);