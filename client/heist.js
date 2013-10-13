// Client Code
Heists = new Meteor.Collection("heists");
Experts = new Meteor.Collection("experts");
clientGameObjects = new Meteor.Collection("clientGameObjects");

Meteor.subscribe("heists");
Meteor.subscribe("gameObject");

Session.set("clientGameObject", false);



function takeTurn(gameObj) {
  var gameObjectID = gameObj["_id"];
  
  // remove heists that have expired
  for (var h = gameObj["heists_available"].length - 1; h >= 0; h--) {
    var age = gameObj.turn - gameObj["heists_available"][h].createdTurn;
    if (gameObj["heists_available"][h]["turns_available"] < age) {
      gameObj["heists_available"].splice(h,1);
    }
  }




  // remove experts that have expired
  for (var e = gameObj["experts_available"].length - 1; e >= 0; h--) {
    var age = gameObj.turn - gameObj["experts_available"][e].createdTurn;
    if (gameObj["experts_available"][e]["turns_available"] < age) {
      gameObj["experts_available"].splice(h,1);
    }
  }




  // // add new heists
  allAvailableHeists = Heists.find({});

  allAvailableHeists.forEach(function(heist) {
    var rand = Math.floor(Math.random() * 100);
    if (rand < heist.chance) {
      heist["createdTurn"] = gameObj.turn;
      gameObj.heists_available.push(heist);
    }
  });
  


  // add new expert (new -- client-side)
  var exp = generate_expert();
  exp["createdTurn"] = gameObj.turn;
  exp["turns_available"] = 3;

  gameObj.experts_available.push(exp);


  // ///add new experts (OLD --server-based method)
  // allAvailableExperts = Experts.find({});
  // allAvailableExperts.forEach(function(exp) {
  //   var rand = Math.floor(Math.random() * 100);
  //   if (rand < exp.chance_of_creation) {
  //     exp["createdTurn"] = gameObj.turn;
  //     gameObj.experts_available.push(exp);
  //   }
  // });



  // end turn + save gameObject
  gameObj.turn += 1;
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
  // if none exists, create a new Client Game Object
  if (Session.equals("clientGameObject", false)) {
    var cgoID = clientGameObjects.insert({
      clientId: Meteor.user(),
      heists_available: [],
      heist_accepted: null,
      experts_available: [],
      experts_hired: [],
      turn: 0
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

