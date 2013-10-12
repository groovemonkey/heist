// Client Code
Heists = new Meteor.Collection("heists");
clientGameObjects = new Meteor.Collection("clientGameObjects");

Meteor.subscribe("heists");
Meteor.subscribe("gameObject");

Session.set("clientGameObject", false);



function takeTurn(gameObj) {
  var gameObjectID = gameObj["_id"];
  
  // remove heists that have expired

  // remove experts that have expired

  // // add new heists
  allAvailableHeists = Heists.find({});

  allAvailableHeists.forEach(function(heist) {
    var rand = Math.floor(Math.random() * 100);
    if (rand > heist.chance) {
      gameObj.heists_available.push(heist);
    }
  });
  
  // add new experts




  // save gameObject
  clientGameObjects.update(gameObj["_id"], gameObj);
}


function runHeist(gameObj) {
  console.log(gameObj);
  if (gameObj.heist_accepted) {
    var heist = gameObj.heist_accepted;
    var experts = gameObj.experts_hired;

  }
}


Template.mainScreen.cgo = function() {
  // if none exists, create a new cgo
  if (Session.equals("clientGameObject", false)) {
    var cgoID = clientGameObjects.insert({
      clientId: Meteor.user(),
      heists_available: [],
      heist_accepted: null,
      experts_available: [],
      experts_hired: []
    });
    Session.set("clientGameObject", cgoID);
  }
  // whether it's new or not, return the cgo...
  var id = Session.get("clientGameObject");
  return clientGameObjects.findOne({_id: id});
};
Template.mainScreen.heists_available = function() {
  return Template.mainScreen.cgo().heists_available;
};
Template.mainScreen.experts_available = function() {
  return Template.mainScreen.cgo().experts_available;
};




Template.mainScreen.events({
  'click .takeTurn' : function () {
    // template data, if any, is available in 'this'
    takeTurn(Template.mainScreen.cgo());
    console.log("\ngame object is now:");
    console.log(Template.mainScreen.cgo());
  }



}); // end mainScreen.events

