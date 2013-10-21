// utility functions
function randomly_select(arr) {
  // "Return a random element from the input array"
  return arr[Math.floor(Math.random() * arr.length)];
}

function rand(i) {
  // returns a random number between 0 and i
  return Math.floor(Math.random() * (i+1));
}



// VISIBLE OUTSIDE THIS FILE (on the client side)
generate_expert = function() {
  // returns an expert {name: "blah", spec: "spec", skills: [{name: "shooting", level: 1}, {name: "disguise", level: 5}]}

  var specsAndSkills = {
    hacker:       ["hacking", "recon"],
    infiltrator:  ["disguise", "charm", "acrobatics"],
    heavy:        ["gunfighting", "demolition", "brawling"],
    transporter:  ["transportation"],
    safecracker:  ["lockpicking"]
  };

  // BUILD THE HUMAN
  // TODO: do this through the actual hash above (write randomly_select for hashes)
  spec = randomly_select(["hacker", "infiltrator", "heavy", "transporter", "safecracker"]);
  
  var specialist = {
    spec: spec,
    skills: []
  };

  for (var i = specsAndSkills[spec].length - 1; i >= 0; i--) {
    specialist["skills"].push({name: specsAndSkills[spec][i], level: (rand(10)+1)});
  }

  // extra skills: (true or false)
  specialist.skills.push({name: "blabbing", level: (rand(100) < 10)});
  specialist.skills.push({name: "is_undercover_cop", level: (rand(100) < 5)});
  specialist.skills.push({name: "luck", level: (rand(100) < 24)});

  // naming
  var names = generate_name();
  specialist.firstname = names["firstname"];
  specialist.nickname = names["nickname"];
  specialist.lastname = names["lastname"];
  specialist.sex = names["sex"];


  return specialist;
};




function generate_name() {
  // return a hash: {sex: s, firstname: f, lastname: l, nickname: n}
  var first, nick, last, sex, randysex;
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
    "Bearclaw", "Moosefart", "Morgan"
  ];

  var lastnames = [
    "Evans", "Morgan", "Stevens", "Chen", "Lin", "Johnson", "Schmarmigans", "Smith", "Stevens", "Lopez",
    "Martinez", "Hernandez", "Mitchell", "Campbell", "Phillips", "Parker", "Reed", "Rogers", "Gray",
    "Henderson", "Coleman", "Hayes"
  ];

  randysex = rand(100);
  // all babies start out female
  sex = "female";
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