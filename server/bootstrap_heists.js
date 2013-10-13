Heists = new Meteor.Collection("heists");
clientGameObjects = new Meteor.Collection("clientGameObjects");

// publish all Heists
Meteor.publish("all-heists", function() {
  return Heists.find();
});
// publish the user's GameObject
Meteor.publish("gameObject", function() {
  return clientGameObjects.find({"clientID": this.userId});
});



Meteor.startup(function() {
  // delete heists
  Heists.remove({});
  // delete gameObjects
  clientGameObjects.remove({});
  

  // insert heists
  if (Heists.find().count() === 0) {
    Heists.insert({
      name: "Convenience Store",
      chance: 20, // chance % that this will come up in a turn
      turns_available: 2, // time that this will be available
      base_payout: 200, // base amount of money you make from this heist

      vulnerable_to: ['security_physical', 'security_guards'],
      security_physical: 1,
      security_computer: 1,
      security_guards: 0,
      security_safe: 0,
      getaway_difficulty: 2,
      variance: 0.2
    });

    Heists.insert({
      name: "Art Gallery",
      chance: 10,
      turns_available: 3,
      base_payout: 4000,

      vulnerable_to: ['security_physical', 'security_guards', 'security_safe'],
      security_physical: 2,
      security_computer: 1,
      security_guards: 0,
      security_safe: 0,
      getaway_difficulty: 2,
      variance: 0.2
    });



  }
});

