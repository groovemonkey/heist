Experts = new Meteor.Collection("experts");

// publish all Experts
Meteor.publish("all-experts", function() {
  return Experts.find();
});

// initialization
Meteor.startup(function() {
  // delete experts
  Experts.remove({});
  // delete gameObjects
  clientGameObjects.remove({});
  

  // insert experts
  if (Experts.find().count() === 0) {
    Experts.insert({


    });
  }
});


function randomly_select(arr) {
  // "Return a random element from the input array"
  return arr[Math.floor(Math.random() * arr.length)];
}

function generate_name() {
  var firstnames_m = [
    "Steve", "Bob", "Hendrick", "Benton", "Dave", "David", "Shawn", "Sean", "Michael", "Mike", "Robert",
    "Benny", "Benjamin", "Bendrick", "Kenneth", "Ken", "Kendrick", "Morgan", "Fred", "Seamus", "Anil",
    "Khalil", "Mohammed", "Alexander", "Alex", "Pete", "Peter", "Dwayne", "Dan", "Danny", "John", "Philip",
    "Phil", "Earl", "Curtis", "Norman", "Jesus", "Randall", "Francisco", "Jim", "Jimminy", "Raul"
  ];

  var firstnames_f = [
    "Linda", "Mildred", "Beth", "Jessica", "Jenny", "Jennifer", "Morgan", "Meghan", "Megan", "Maegan", "Aleyna",
    "Alex", "Alexis", "Alexia", "Glenda", "Faye", "Natasha", "Sabrina", "Eunice", "Jasmine", "Muriel",
    "Ginger", "Hope", "Leigh", "Olive", "Sherrie", "Francine", "Deloris", "Bettie"
  ];

  var nicknames = [
    "the Claw", "Penny-Pincher", "Lucky", "the Face", "Sweet-tits", "Biggs", "Hammer", "Froggie",
    "Frosty", "the Baker", "Coalminer", "Assquatch", "Smalls", "Queen Kong", "Short Stack", "Dimmy",
    "Bearclaw", "Moosefart"
  ];

  var lastnames = [
    "Evans", "Morgan", "Stevens", "Chen", "Lin", "Johnson", "Schmarmigans", "Smith", "Stevens", "Lopez",
    "Martinez", "Hernandez", "Mitchell", "Campbell", "Phillips", "Parker", "Reed", "Rogers", "Gray",
    "Henderson", "Coleman", "Hayes"
  ];

  var randysex = Math.floor(Math.random() * 100);
  var first, nick, last;
  // all babies start out female
  var sex = "female";
  first = randomly_select(firstnames_f);

  if (randysex > 50) {
    sex = "male";
    first = randomly_select(firstnames_m);
  }

  nick = randomly_select(nicknames);
  last = randomly_select(lastnames);

  return {
    firstname: first,
    nickname: nick,
    lastname: last,
    sex: sex
  };

}