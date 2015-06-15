Template.header.helpers({
  childSize: "proportional:.7; renderSize",
  childMountPoint: "[0.5, 0.5]",
  childAlign: "[0.5, 0.5]",

  headerElements: function() {
    return [
      {
        index: 0,
        title: 'Frontpg'
      },
      {
        index: 1,
        title: 'Rewards'
      },
      {
        index: 2,
        title: 'Account'
      }
    ];
  }
});

Template.headerElement.onCreated(function() {
  var fview = FView.current();
  fview.node.addUIEvent('click');

  fview.node.onReceive = function(type, ev) {
    console.log('headerElement', arguments);
  }
});

Template.headerElement.helpers({
  templateGestures: {
    'swipe li': function() {
      console.log('swiped', arguments);
    }
  }
});

Template.headerElement.events({
  'click li' : function() {
    //console.log('clicked the headerElement');
    alert('clicked the headerElement!');
  }
});