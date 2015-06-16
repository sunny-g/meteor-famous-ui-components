Template.body.helpers({
  size: "P:.5; P:.5",
  mountPoint: "[0.5, 0.5]",
  align: "[0.5, 0.5]",
  origin: "[0.5, 0.5]",

  headers: function() {
    return [
      {title: 'World View'},
      // {title: 'Local View'},
      // {title: 'Account'}
    ];
  }
});

Header = function() {
  famous.core.Node.call(this);
};
Header.prototype = Object.create(famous.core.Node.prototype);
Header.prototype.constructor = Header;

HeaderTitle = function() {
  famous.core.Node.call(this);
   this.position = new famous.components.Position(this);
  // this
  //   .setMountPoint(0.5, 0.5)
  //   .setAlign(0.5, 0.5)
  //   .setMode(famous.core.Node.PROPORTIONAL_SIZE, famous.core.Node.PROPORTIONAL_SIZE);
  //   .setProportional(0.5, 0.5);

  this.gestures = new famous.components.GestureHandler(this);
  this.gestures.on('drag', function(ev) {
    console.log('dragged', arguments);
    this.position.set(ev.center.x, ev.center.y);
  }.bind(this));

  //this.addUIEvent('touchstart');
  //this.onReceive = function(type, ev) {
  //  console.log('clicked an element', arguments);
  //}
};
HeaderTitle.prototype = Object.create(famous.core.Node.prototype);
HeaderTitle.prototype.constructor = HeaderTitle;

FView.wrap('Header', Header);
FView.wrap('HeaderTitle', HeaderTitle);