//trainerBuilder.js
var FALSE = false;
var TRUE = true;

exports.buildTrainer = (txt, callback) => buildTrainer(txt, callback);

var names = require('./names');
var pokemon = require('./pokemon');
var imgBuild = require('./imgBuilder');

function buildTrainer(txt, callback) {
	var trainerText = "";
	var newTrainer;

	if ((txt != '') && (txt != "GYMLEADER")) {

		newTrainer = trainerCopy(player);
		newTrainer.name = txt;
		if (Math.floor(Math.random() * 100) <= 50) {
			newTrainer.gender = "Male";
		} else {
			newTrainer.gender = "Female";
		}

	} else if (txt == "GYMLEADER"){
		if ((Math.random() - 0.15) > 0){
			newTrainer =  trainerCopy(gymLeader);
		}else{
			newTrainer = trainerCopy(eliteFour);
		}

		if (Math.floor(Math.random() * 100) <= 50) {
			newTrainer.gender = "Male";
		} else {
			newTrainer.gender = "Female";
		}

		var pickType = newTrainer.prefTypes[Math.floor(Math.random() * newTrainer.prefTypes.length)]

		newTrainer.prefTypes = [pickType,pickType,pickType,pickType,pickType];
		newTrainer.photoID = newTrainer.photoID +"-"+ newTrainer.prefTypes[0];
		newTrainer.prefBG = newTrainer.prefBG + newTrainer.prefTypes[0]+".png";

		newTrainer.name = getTrainerName(newTrainer.gender, txt)

		console.log(newTrainer);
	
	} else {
		var trainerType = trainerTypes[Math.floor(Math.random() * trainerTypes.length)];

		//trainerType = battlegirl;

		newTrainer = trainerType;
		if (newTrainer.gender == "Any") {
			if (Math.floor(Math.random() * 100) <= 50) {
				newTrainer.gender = "Male";
			} else {
				newTrainer.gender = "Female";
			}
		}
		if (trainerType.numNames > 1) {
			if (trainerType.gender == "Both") {
				newTrainer.name = getTrainerName("Male", txt) + " & " + getTrainerName("Female", txt);
			} else {
				newTrainer.name = getTrainerName(trainerType.gender, txt) + " & " + getTrainerName(trainerType.gender, txt);
			}

		} else {
			newTrainer.name = getTrainerName(trainerType.gender, txt);
		}
	}


	//newTrainer.partyCount = 3;


	var pokeTeam = getPokeTeam(newTrainer)

	imgBuild.buildImage(newTrainer, pokeTeam, function (text) {
		trainerText = text;
		callback(trainerText);

	});

}
var trainerTypes = [
	aquaadmin = { type: "Aqua Admin", gender: "Any", photoID: "aquaadmin", numNames: 1, heightOvrd: -1, prefTypes: ["Water", "Poison", "Dark"], prefEvol: ["First"], gen: 1, balTeam: FALSE, legendary: FALSE, catchPhrase: "I won't let you interfere with Team Aqua's plans!", partyCount: [1, 2, 3], forbidTypes: ["Allothers"], prefRarity: ["Uncommon"], prefBG: "bg-beach.png" },
	aquagrunt = { type: "Aqua Grunt", gender: "Any", photoID: "aquagrunt", numNames: 1, heightOvrd: -1, prefTypes: ["Water", "Poison", "Dark"], prefEvol: ["Base"], gen: 1, balTeam: FALSE, legendary: FALSE, catchPhrase: "I won't let you interfere with Team Aqua's plans!", partyCount: [1, 2, 3], forbidTypes: ["Allothers"], prefRarity: ["Common", "Uncommon"], prefBG: "bg-beach.png" },
	aqualeader = { type: "Aqua Leader", gender: "Male", photoID: "aqualeader", numNames: 1, heightOvrd: -1, prefTypes: ["Water", "Poison", "Dark"], prefEvol: ["Second", "Max"], gen: 1, balTeam: FALSE, legendary: FALSE, catchPhrase: "I won't let you interfere with Team Aqua's plans!", partyCount: [1, 2, 3], forbidTypes: ["Allothers"], prefRarity: ["Rare", "Uncommon"], prefBG: "bg-beach.png" },
	aromalady = { type: "Aroma Lady", gender: "Female", photoID: "aromalady", numNames: 1, heightOvrd: -1, prefTypes: ["Grass"], prefEvol: ["Any"], gen: 1, balTeam: FALSE, legendary: FALSE, catchPhrase: "I want to show you my beautiful Pokemon!", partyCount: [1, 2, 3], forbidTypes: ["Allothers"], prefRarity: ["Uncommon"], prefBG: "bg-meadow.png" },
	backpacker = { type: "Backpacker", gender: "Any", photoID: "backpacker", numNames: 1, heightOvrd: -1, prefTypes: ["Rock", "Ground"], prefEvol: ["Base"], gen: 1, balTeam: FALSE, legendary: FALSE, catchPhrase: "Nothing like a great hike and a Pokemon battle.", partyCount: [2, 4], forbidTypes: ["Allothers"], prefRarity: ["Common", "Uncommon"], prefBG: "bg-field.png" },
	battlegirl = { type: "Battle Girl", gender: "Female", photoID: "battlegirl", numNames: 1, heightOvrd: -1, prefTypes: ["Fighting", "Fighting", "Fighting", "Fighting"], prefEvol: ["Any"], gen: 1, balTeam: TRUE, legendary: FALSE, catchPhrase: "Hiiiiiiiyeeee ya!", partyCount: [1, 2, 3], forbidTypes: ["Allothers"], prefRarity: ["Uncommon"], prefBG: "bg-rocks.png" },
	beauty = { type: "Beauty", gender: "Female", photoID: "beauty", numNames: 1, heightOvrd: -1, prefTypes: ["Dark", "Fairy", "Normal"], prefEvol: ["Base", "First"], gen: 1, balTeam: FALSE, legendary: FALSE, catchPhrase: "I want to show you my beautiful Pokemon!", partyCount: [1, 2, 3], forbidTypes: ["Allothers"], prefRarity: ["Uncommon"], prefBG: "bg-city.png" },
	biker = { type: "Biker", gender: "Male", photoID: "biker", numNames: 1, heightOvrd: 4.5, prefTypes: ["Dark", "Poison", "Electric", "Steel"], prefEvol: ["First"], gen: 1, balTeam: FALSE, legendary: FALSE, catchPhrase: "Get out of my way slowpoke!", partyCount: [1, 2, 3], forbidTypes: ["Allothers"], prefRarity: ["Uncommon"], prefBG: "bg-city.png" },
	birdkeeper = { type: "Bird Keeper", gender: "Male", photoID: "birdkeeper", numNames: 1, heightOvrd: -1, prefTypes: ["Flying", "Flying", "Flying"], prefEvol: ["Any"], gen: 1, balTeam: FALSE, legendary: FALSE, catchPhrase: "Fly my Pokemon!", partyCount: [1, 2, 3], forbidTypes: ["Allothers"], prefRarity: ["Uncommon"], prefBG: "bg-mtn.png" },
	blackbelt = { type: "Blackbelt", gender: "Male", photoID: "blackbelt", numNames: 1, heightOvrd: -1, prefTypes: ["Fighting", "Fighting", "Fighting"], prefEvol: ["Any"], gen: 1, balTeam: FALSE, legendary: FALSE, catchPhrase: "Hiiiiiiiyeeee ya!", partyCount: [1, 2, 3], forbidTypes: ["Allothers"], prefRarity: ["Uncommon"], prefBG: "bg-rocks.png" },
	//boarder = {type: "Boarder", gender:"Male", photoID: "boarder", numNames:1, heightOvrd:-1, prefTypes:["Ice","Ice"], prefEvol:["Any"], gen: 1, balTeam: FALSE, legendary: FALSE, catchPhrase: "Hiiiiiiiyeeee ya!", partyCount: [1,2,3], forbidTypes: ["Allothers"], prefRarity:["Uncommon"]},
	boarder = { type: "Boarder", gender: "Male", photoID: "boarder", numNames: 1, heightOvrd: -1, prefTypes: ["Ice", "Ice"], prefEvol: ["Base"], gen: 1, balTeam: FALSE, legendary: FALSE, catchPhrase: "Woah brah. I nearly wiped out there!", partyCount: [1, 2, 3], forbidTypes: ["Allothers"], prefRarity: ["Uncommon"] , prefBG: "bg-snow.png"},
	boss = { type: "Boss", gender: "Male", photoID: "boss", numNames: 1, heightOvrd: -1, prefTypes: ["Poison", "Dark", "Normal"], prefEvol: ["Second", "Max"], gen: 1, balTeam: FALSE, legendary: FALSE, catchPhrase: "It's impressive you made it this far.", partyCount: [4, 5, 3], forbidTypes: ["Allothers"], prefRarity: ["Rare", "Uncommon"], prefBG: "bg-citynight.png" },
	bugcatcher = { type: "Bug Catcher", gender: "Male", photoID: "bugcatcher", numNames: 1, heightOvrd: 4.5, prefTypes: ["Bug", "Bug", "Bug"], prefEvol: ["Base", "First"], gen: 1, balTeam: FALSE, legendary: FALSE, catchPhrase: "Check out my awesome Bug Pokemon!", partyCount: [2, 3, 6], forbidTypes: ["Allothers"], prefRarity: ["Common"], prefBG: "bg-forrest.png" },
	bugmaniac = { type: "Bug Maniac", gender: "Male", photoID: "bugmaniac", numNames: 1, heightOvrd: -1, prefTypes: ["Bug", "Bug", "Bug"], prefEvol: ["First", "Second"], gen: 1, balTeam: FALSE, legendary: FALSE, catchPhrase: "Bug Pokemon are among the most specialized.", partyCount: [2, 3, 4], forbidTypes: ["Allothers"], prefRarity: ["Uncommon"], prefBG: "bg-forrest.png" },
	burglar = { type: "Burglar", gender: "Male", photoID: "burglar", numNames: 1, heightOvrd: -1, prefTypes: ["Dark", "Normal"], prefEvol: ["Any"], gen: 1, balTeam: FALSE, legendary: FALSE, catchPhrase: "You haven't caught me yet!", partyCount: [1, 2], forbidTypes: ["Allothers"], prefRarity: ["Uncommon"], prefBG: "bg-citynight.png" },
	camper = { type: "Camper", gender: "Male", photoID: "camper", numNames: 1, heightOvrd: -1, prefTypes: ["Rock", "Ground"], prefEvol: ["First"], gen: 1, balTeam: FALSE, legendary: FALSE, catchPhrase: "I love battling pokemon out in nature.", partyCount: [1, 2], forbidTypes: ["Allothers"], prefRarity: ["Uncommon"], prefBG: "bg-forrest.png" },
	champion = { type: "Champion", gender: "Any", photoID: "champion", numNames: 1, heightOvrd: -1, prefTypes: ["Any"], prefEvol: ["Second", "Max"], gen: 1, balTeam: TRUE, legendary: FALSE, catchPhrase: "This is your final challenge.", partyCount: [6], forbidTypes: ["Allothers"], prefRarity: ["Rare"], prefBG: "bg-champion.png" },
	channeler = { type: "Channeler", gender: "Female", photoID: "channeler", numNames: 1, heightOvrd: 4.5, prefTypes: ["Ghost", "Ghost", "Ghost"], prefEvol: ["Any"], gen: 1, balTeam: FALSE, legendary: FALSE, catchPhrase: "I sense dark spirits about.", partyCount: [1, 2, 3], forbidTypes: ["Allothers"], prefRarity: ["Uncommon"] , prefBG: "bg-ghost.png"},
	collector = { type: "Collector", gender: "Male", photoID: "collector", numNames: 1, heightOvrd: -1, prefTypes: ["Steel", "Dragon", "Fairy", "Ice"], prefEvol: ["Max"], gen: 1, balTeam: FALSE, legendary: FALSE, catchPhrase: "I only collect the rarest of Pokemon.", partyCount: [3, 6], forbidTypes: ["Allothers"], prefRarity: ["Rare"] , prefBG: "bg-cave.png"},
	coolcouple = { type: "Cool Couple", gender: "Both", photoID: "coolcouple", numNames: 2, heightOvrd: -1, prefTypes: ["Any"], prefEvol: ["First"], gen: 1, balTeam: FALSE, legendary: FALSE, catchPhrase: "You won't beat us!  Our Pokemon are super strong.", partyCount: [2, 4], forbidTypes: [""], prefRarity: ["Uncommon", "Rare"], prefBG: "bg-city.png" },
	cooltrainer = { type: "Cooltrainer", gender: "Any", photoID: "cooltrainer", numNames: 1, heightOvrd: -1, prefTypes: ["Any"], prefEvol: ["First"], gen: 1, balTeam: TRUE, legendary: FALSE, catchPhrase: "You won't beat me!  My Pokemon are super strong.", partyCount: [3, 6], forbidTypes: [""], prefRarity: ["Rare", "Uncommon"], prefBG: "bg-city.png" },
	crushgirl = { type: "Crush Girl", gender: "Female", photoID: "crushgirl", numNames: 1, heightOvrd: 5, prefTypes: ["Fighting", "Fighting", "Fighting"], prefEvol: ["Base", "First"], gen: 1, balTeam: FALSE, legendary: FALSE, catchPhrase: "Hiiiiiiiiiyyyyaaaaaaaa!", partyCount: [1, 2, 3], forbidTypes: ["Allothers"], prefRarity: ["Uncommon"] , prefBG: "bg-mtn.png"},
	crushkin = { type: "Crush Kin", gender: "Both", photoID: "crushkin", numNames: 2, heightOvrd: -1, prefTypes: ["Fighting", "Fighting", "Fighting"], prefEvol: ["Base", "First"], gen: 1, balTeam: FALSE, legendary: FALSE, catchPhrase: "Let's fight back to back!", partyCount: [2, 4], forbidTypes: ["Allothers"], prefRarity: ["Uncommon"] , prefBG: "bg-mtn.png"},
	cueball = { type: "Cue Ball", gender: "Male", photoID: "cueball", numNames: 1, heightOvrd: -1, prefTypes: ["Poison", "Flying", "Electric"], prefEvol: ["First"], gen: 1, balTeam: FALSE, legendary: FALSE, catchPhrase: "You made me miss my shot!", partyCount: [1, 2, 3], forbidTypes: ["Allothers"], prefRarity: ["Uncommon"] , prefBG: "bg-citynight.png"},
	dragontamer = { type: "Dragon Tamer", gender: "Male", photoID: "dragontamer", numNames: 1, heightOvrd: -1, prefTypes: ["Dragon", "Dragon", "Dragon"], prefEvol: ["Any"], gen: 1, balTeam: FALSE, legendary: FALSE, catchPhrase: "Dragon pokemon are the ultimate type.", partyCount: [1, 2, 3], forbidTypes: ["Allothers"], prefRarity: ["Rare"] , prefBG: "bg-cave.png"},
	engineer = { type: "Engineer", gender: "Male", photoID: "engineer", numNames: 1, heightOvrd: -1, prefTypes: ["Electric", "Steel"], prefEvol: ["First", "Max"], gen: 1, balTeam: FALSE, legendary: FALSE, catchPhrase: "My Union rep says I'm not supposed to battle on the job.", partyCount: [1, 2, 3], forbidTypes: ["Allothers"], prefRarity: ["Uncommon"] , prefBG: "bg-city.png"},
	expert = { type: "Expert", gender: "Any", photoID: "expert", numNames: 1, heightOvrd: -1, prefTypes: ["Fighting", "Fighting", "Fighting"], prefEvol: ["First", "Max"], gen: 1, balTeam: FALSE, legendary: FALSE, catchPhrase: "Let me show you how it's really done.", partyCount: [1, 2, 3], forbidTypes: ["Allothers"], prefRarity: ["Uncommon"] , prefBG: "bg-mtn.png"},
	firebreather = { type: "Firebreather", gender: "Male", photoID: "firebreather", numNames: 1, heightOvrd: -1, prefTypes: ["Fire", "Fire", "Fire", "Fire"], prefEvol: ["First"], gen: 1, balTeam: FALSE, legendary: FALSE, catchPhrase: "WOOOOOOOOOOOSH!", partyCount: [1, 2, 3], forbidTypes: ["Allothers"], prefRarity: ["Uncommon"] , prefBG: "bg-rocks.png"},
	fisherman = { type: "Fisherman", gender: "Male", photoID: "fisherman", numNames: 1, heightOvrd: -1, prefTypes: ["Water", "Water", "Water"], prefEvol: ["Base"], gen: 1, balTeam: FALSE, legendary: FALSE, catchPhrase: "Hook, line and sinker!", partyCount: [2, 3, 6], forbidTypes: ["Allothers"], prefRarity: ["Uncommon"] , prefBG: "bg-beach.png"},
	gambler = { type: "Gambler", gender: "Male", photoID: "gambler", numNames: 1, heightOvrd: -1, prefTypes: ["Dark", "Normal"], prefEvol: ["Any"], gen: 1, balTeam: FALSE, legendary: FALSE, catchPhrase: "The odds are against you", partyCount: [1, 2, 3], forbidTypes: ["Allothers"], prefRarity: ["Uncommon"] , prefBG: "bg-citynight.png"},
	gentleman = { type: "Gentleman", gender: "Male", photoID: "gentleman", numNames: 1, heightOvrd: -1, prefTypes: ["Any"], prefEvol: ["Base", "First"], gen: 1, balTeam: TRUE, legendary: FALSE, catchPhrase: "What a lovely day for a battle.", partyCount: [1, 2, 3], forbidTypes: [""], prefRarity: ["Rare"] , prefBG: "bg-city.png"},
	guitarist = { type: "Guitarist", gender: "Any", photoID: "guitarist", numNames: 1, heightOvrd: -1, prefTypes: ["Electric", "Steel", ""], prefEvol: ["First"], gen: 1, balTeam: TRUE, legendary: FALSE, catchPhrase: "I'm going to shread this solo while we battle.", partyCount: [1, 2, 3], forbidTypes: ["Allothers"], prefRarity: ["Uncommon"] , prefBG: "bg-citynight.png"},
	hexmaniac = { type: "Hex Maniac", gender: "Female", photoID: "hexmaniac", numNames: 1, heightOvrd: 3.5, prefTypes: ["Ghost", "Psychic", "Dark"], prefEvol: ["Base", "First"], gen: 1, balTeam: TRUE, legendary: FALSE, catchPhrase: "I sensed your presence from a mile away.", partyCount: [1, 2, 3], forbidTypes: ["Allothers"], prefRarity: ["Uncommon"] , prefBG: "bg-ghost.png"},
	hiker = { type: "Hiker", gender: "Male", photoID: "hiker", numNames: 1, heightOvrd: -1, prefTypes: ["Rock", "Ground"], prefEvol: ["Any"], gen: 1, balTeam: FALSE, legendary: FALSE, catchPhrase: "I love the outdoors, just me and my pokemon.", partyCount: [2, 3, 4], forbidTypes: ["Allothers"], prefRarity: ["Uncommon"], prefBG:"bg-mtn.png"},
	interviewers = { type: "Interviewers", gender: "Both", photoID: "interviewers", numNames: 2, heightOvrd: -1, prefTypes: ["Any"], prefEvol: ["Base"], gen: 1, balTeam: FALSE, legendary: FALSE, catchPhrase: "This looks like the scoop we've been looking for.", partyCount: [2, 4], forbidTypes: [""], prefRarity: ["Uncommon"], prefBG: "bg-city.png" },
	jrtrainerf = { type: "Jr. Trainer♀", gender: "Female", photoID: "jrtrainer", numNames: 1, heightOvrd: -1, prefTypes: ["Fire", "Water", "Grass", "Electric"], prefEvol: ["Base", "First"], gen: 1, balTeam: TRUE, legendary: FALSE, catchPhrase: "I'm gonna be the very best!", partyCount: [3], forbidTypes: ["Allothers"], prefRarity: ["Common", "Uncommon"], prefBG: "bg-field.png" },
	jrtrainerm = { type: "Jr. Trainer♂", gender: "Male", photoID: "jrtrainer", numNames: 1, heightOvrd: -1, prefTypes: ["Fire", "Water", "Grass", "Electric"], prefEvol: ["Base", "First"], gen: 1, balTeam: TRUE, legendary: FALSE, catchPhrase: "I'm gunna be the very best!", partyCount: [3], forbidTypes: ["Allothers"], prefRarity: ["Common", "Uncommon"], prefBG: "bg-field.png" },
	juggler = { type: "Juggler", gender: "Male", photoID: "juggler", numNames: 1, heightOvrd: -1, prefTypes: ["Poison", "Fire"], prefEvol: ["First", "Max"], gen: 1, balTeam: FALSE, legendary: FALSE, catchPhrase: "Hot stuff coming through!", partyCount: [1, 2, 3], forbidTypes: ["Allothers"], prefRarity: ["Uncommon"] , prefBG: "bg-citynight.png"},
	kimonogirl = { type: "Kimono Girl", gender: "Female", photoID: "kimonogirl", numNames: 1, heightOvrd: 4.5, prefTypes: ["Fire", "Water", "Grass", "Electric", "Fairy", "Dark", "Psychic"], prefEvol: ["First", "Max"], gen: 1, balTeam: FALSE, legendary: FALSE, catchPhrase: "Pokemon battling can be so elegant, don't you think?", partyCount: [1], forbidTypes: ["Allothers"], prefRarity: ["Rare"], prefBG: "bg-rocks.png" },
	kindler = { type: "Kindler", gender: "Male", photoID: "kindler", numNames: 1, heightOvrd: -1, prefTypes: ["Fire", "Fire", "Fire"], prefEvol: ["First", "Max"], gen: 1, balTeam: FALSE, legendary: FALSE, catchPhrase: "Hot stuff coming through!", partyCount: [1, 2, 3], forbidTypes: ["Allothers"], prefRarity: ["Uncommon"] , prefBG: "bg-rocks.png"},
	lady = { type: "Lady", gender: "Female", photoID: "lady", numNames: 1, heightOvrd: -1, prefTypes: ["Grass", "Normal", "Fairy"], prefEvol: ["First"], gen: 1, balTeam: FALSE, legendary: FALSE, catchPhrase: "Check out my pretty Pokemon!", partyCount: [1, 2, 3], forbidTypes: ["Allothers"], prefRarity: ["Uncommon"] , prefBG: "bg-meadow.png"},
	lass = { type: "Lass", gender: "Female", photoID: "lass", numNames: 1, heightOvrd: -1, prefTypes: ["Normal", "Fairy"], prefEvol: ["Base", "First"], gen: 1, balTeam: FALSE, legendary: FALSE, catchPhrase: "Check out my pretty Pokemon!", partyCount: [1, 2, 3], forbidTypes: ["Allothers"], prefRarity: ["Common", "Baby"] , prefBG: "bg-field.png"},
	magmaadmin = { type: "Magma Admin", gender: "Any", photoID: "magmaadmin", numNames: 1, heightOvrd: -1, prefTypes: ["Fire", "Ground", "Rock", "Dark"], prefEvol: ["First"], gen: 1, balTeam: FALSE, legendary: FALSE, catchPhrase: "I won't let you interfere with Team Magma's plans.", partyCount: [1, 2, 3], forbidTypes: ["Allothers"], prefRarity: ["Rare", "Uncommon"] , prefBG: "bg-desert.png"},
	magmagrunt = { type: "Magma Grunt", gender: "Any", photoID: "magmagrunt", numNames: 1, heightOvrd: -1, prefTypes: ["Fire", "Ground", "Rock", "Dark"], prefEvol: ["Base"], gen: 1, balTeam: FALSE, legendary: FALSE, catchPhrase: "I won't let you interfere with Team Magma's plans.", partyCount: [1, 2, 3], forbidTypes: ["Allothers"], prefRarity: ["Common", "Uncommon"] , prefBG: "bg-desert.png"},
	magmaleader = { type: "Magma Leader", gender: "Male", photoID: "magmaleader", numNames: 1, heightOvrd: -1, prefTypes: ["Fire", "Ground", "Rock", "Dark"], prefEvol: ["Second", "Max"], gen: 1, balTeam: FALSE, legendary: FALSE, catchPhrase: "I won't let you interfere with Team Magma's plans.", partyCount: [1, 2, 3], forbidTypes: ["Allothers"], prefRarity: ["Rare", "Uncommon"] , prefBG: "bg-desert.png"},
	medium = { type: "Medium", gender: "Female", photoID: "medium", numNames: 1, heightOvrd: 4.5, prefTypes: ["Psychic", "Ghost"], prefEvol: ["First"], gen: 1, balTeam: FALSE, legendary: FALSE, catchPhrase: "Your mind betrays your strategy.", partyCount: [1, 2, 3], forbidTypes: ["Allothers"], prefRarity: ["Uncommon"] , prefBG: "bg-ghost.png"},
	ninjaboy = { type: "Ninja Boy", gender: "Male", photoID: "ninjaboy", numNames: 1, heightOvrd: 3.5, prefTypes: ["Dark", "Poison"], prefEvol: ["Base", "First"], gen: 1, balTeam: FALSE, legendary: FALSE, catchPhrase: "Boo!", partyCount: [1, 2, 3], forbidTypes: ["Allothers"], prefRarity: ["Uncommon"] , prefBG: "bg-citynight.png"},
	officer = { type: "Officer", gender: "Any", photoID: "officer", numNames: 1, heightOvrd: -1, prefTypes: ["Fire", "Water", "Fighting"], prefEvol: ["Base", "First"], gen: 1, balTeam: FALSE, legendary: FALSE, catchPhrase: "I'm not really a police officer, I just like dressing up.", partyCount: [1, 2], forbidTypes: ["Allothers"], prefRarity: ["Uncommon"], prefBG: "bg-city.png" },
	oldcouple = { type: "Old Couple", gender: "Both", photoID: "oldcouple", numNames: 2, heightOvrd: -1, prefTypes: ["Any"], prefEvol: ["Base", "Max"], gen: 1, balTeam: FALSE, legendary: FALSE, catchPhrase: "We'll show you to respect your elders.", partyCount: [2, 4], forbidTypes: [""], prefRarity: ["Uncommon"] , prefBG: "bg-city.png"},
	parasollady = { type: "Parasol Lady", gender: "Female", photoID: "parasollady", numNames: 1, heightOvrd: -1, prefTypes: ["Grass", "Water"], prefEvol: ["First"], gen: 1, balTeam: FALSE, legendary: FALSE, catchPhrase: "What a lovely day for a battle!", partyCount: [1, 2, 3], forbidTypes: ["Allothers"], prefRarity: ["Uncommon"] , prefBG: "bg-city.png"},
	picknicker = { type: "Picknicker", gender: "Female", photoID: "picknicker", numNames: 1, heightOvrd: -1, prefTypes: ["Grass", "Normal"], prefEvol: ["Base", "First"], gen: 1, balTeam: FALSE, legendary: FALSE, catchPhrase: "I love battling Pokemon when I'm out in nature.", partyCount: [2, 4, 6], forbidTypes: ["Allothers"], prefRarity: ["Uncommon", "Common", "Baby"] , prefBG: "bg-forrest.png"},
	pokebreeder = { type: "Pokémon Breeder", gender: "Any", photoID: "pokebreeder", numNames: 1, heightOvrd: -1, prefTypes: ["Any"], prefEvol: ["Baby"], gen: 1, balTeam: FALSE, legendary: FALSE, catchPhrase: "Let's see how well you've raised your Pokemon.", partyCount: [4, 5, 6], forbidTypes: [""], prefRarity: ["Baby"] , prefBG: "bg-field.png"},
	pokefan = { type: "Pokéfan", gender: "Any", photoID: "pokefan", numNames: 1, heightOvrd: -1, prefTypes: ["Electric"], prefEvol: ["Base"], gen: 1, balTeam: FALSE, legendary: FALSE, catchPhrase: "Check out my Pokemon!  Aren't Pokemon amazing?", partyCount: [1], forbidTypes: ["Allothers"], prefRarity: ["Uncommon", "Baby"] , prefBG: "bg-city.png"},
	pokemaniac = { type: "Pokémaniac", gender: "Male", photoID: "pokemaniac", numNames: 1, heightOvrd: -1, prefTypes: ["Fire", "Water", "Grass", "Electric"], prefEvol: ["Base", "First"], gen: 1, balTeam: FALSE, legendary: FALSE, catchPhrase: "I love Pokemon!", partyCount: [1, 2, 3, 4], forbidTypes: ["Allothers"], prefRarity: ["Rare", "Baby"] , prefBG: "bg-cave.png"},
	pokeranger = { type: "Pokémon Ranger", gender: "Any", photoID: "pokeranger", numNames: 1, heightOvrd: -1, prefTypes: ["Grass", "Normal", "Ground", "Rock"], prefEvol: ["First", "Second"], gen: 1, balTeam: FALSE, legendary: FALSE, catchPhrase: "Pokemon training is a way of life!", partyCount: [1, 2, 3], forbidTypes: ["Allothers"], prefRarity: ["Any"] , prefBG: "bg-forrest.png"},
	psychic = { type: "Psychic", gender: "Any", photoID: "psychic", numNames: 1, heightOvrd: -1, prefTypes: ["Psychic", "Psychic", "Psychic"], prefEvol: ["Base", "First"], gen: 1, balTeam: FALSE, legendary: FALSE, catchPhrase: "I can see your every move!", partyCount: [1, 2, 3], forbidTypes: ["Allothers"], prefRarity: ["Uncommon"] , prefBG: "bg-ghost.png"},
	richboy = { type: "Rich Boy", gender: "Male", photoID: "richboy", numNames: 1, heightOvrd: 5, prefTypes: ["Dragon", "Electric", "Steel", "Ice", "Fire"], prefEvol: ["Base"], gen: 1, balTeam: FALSE, legendary: FALSE, catchPhrase: "I only train the most exotic Pokemon.", partyCount: [1, 2], forbidTypes: ["Allothers"], prefRarity: ["Rare"] , prefBG: "bg-city.png"},
	rival = { type: "Rival", gender: "Any", photoID: "rival", numNames: 1, heightOvrd: -1, prefTypes: ["Any"], prefEvol: ["Max"], gen: 1, balTeam: TRUE, legendary: FALSE, catchPhrase: "Let's see how strong you've gotten", partyCount: [4, 5, 6], forbidTypes: [""], prefRarity: ["Rare", "Uncommon"], prefBG: "bg-champion.png" },
	rocker = { type: "Rocker", gender: "Male", photoID: "rocker", numNames: 1, heightOvrd: -1, prefTypes: ["Electric", "Steel", "Normal"], prefEvol: ["Base", "First"], gen: 1, balTeam: FALSE, legendary: FALSE, catchPhrase: "I love jammin out with my Pokemon", partyCount: [1, 2, 3], forbidTypes: ["Allothers"], prefRarity: ["Uncommon"] , prefBG: "bg-citynight.png"},
	rocketadmin = { type: "Rocket Admin", gender: "Any", photoID: "rocketadmin", numNames: 1, heightOvrd: -1, prefTypes: ["Poison", "Dark", "Normal"], prefEvol: ["Base", "First"], gen: 1, balTeam: FALSE, legendary: FALSE, catchPhrase: "Hey kid! Don't mess with Team Rocket!", partyCount: [1, 2, 3], forbidTypes: ["Allothers"], prefRarity: ["Common", "Uncommon"] , prefBG: "bg-citynight.png"},
	rocketexecutive = { type: "Rocket Executive", gender: "Any", photoID: "rocketexecutive", numNames: 1, heightOvrd: -1, prefTypes: ["Poison", "Dark", "Normal"], prefEvol: ["Base", "First"], gen: 1, balTeam: FALSE, legendary: FALSE, catchPhrase: "Hey kid! Don't mess with Team Rocket!", partyCount: [1, 2, 3], forbidTypes: ["Allothers"], prefRarity: ["Common", "Uncommon"] , prefBG: "bg-citynight.png"},
	rocketgrunt = { type: "Rocket Grunt", gender: "Any", photoID: "rocketgrunt", numNames: 1, heightOvrd: 5, prefTypes: ["Poison", "Dark", "Normal"], prefEvol: ["Base", "First"], gen: 1, balTeam: FALSE, legendary: FALSE, catchPhrase: "Hey kid! Don't mess with Team Rocket!", partyCount: [1, 2, 3], forbidTypes: ["Allothers"], prefRarity: ["Common", "Uncommon"] , prefBG: "bg-citynight.png"},
	ruinmaniac = { type: "Ruin Maniac", gender: "Male", photoID: "ruinmaniac", numNames: 1, heightOvrd: 2, prefTypes: ["Rock", "Water"], prefEvol: ["Base", "First"], gen: 1, balTeam: FALSE, legendary: FALSE, catchPhrase: "These fossils must be around here somewhere...", partyCount: [1, 2, 3], forbidTypes: ["Allothers"], prefRarity: ["Rare"] , prefBG: "bg-cave.png"},
	sage = { type: "Sage", gender: "Male", photoID: "sage", numNames: 1, heightOvrd: -1, prefTypes: ["Psychic", "Dark", "Ghost"], prefEvol: ["Base", "First"], gen: 1, balTeam: FALSE, legendary: FALSE, catchPhrase: "I sense a Pokemon battle in your future", partyCount: [1, 2, 3], forbidTypes: ["Allothers"], prefRarity: ["Uncommon"] , prefBG: "bg-ghost.png"},
	sailor = { type: "Sailor", gender: "Male", photoID: "sailor", numNames: 1, heightOvrd: -1, prefTypes: ["Water", "Water", "Water"], prefEvol: ["Base", "First"], gen: 1, balTeam: FALSE, legendary: FALSE, catchPhrase: "I'm only ashore for a little bit, let's make this quick!", partyCount: [1, 2, 3], forbidTypes: ["Allothers"], prefRarity: ["Uncommon"] , prefBG: "bg-beach.png"},
	schoolkid = { type: "School Kid", gender: "Any", photoID: "schoolkid", numNames: 1, heightOvrd: -1, prefTypes: ["Normal", ""], prefEvol: ["Base"], gen: 1, balTeam: FALSE, legendary: FALSE, catchPhrase: "My teacher says I'm really good at Pokemon.", partyCount: [1, 2, 3], forbidTypes: ["Allothers"], prefRarity: ["Common", "Baby"] , prefBG: "bg-city.png"},
	scientist = { type: "Scientist", gender: "Any", photoID: "scientist", numNames: 1, heightOvrd: -1, prefTypes: ["Electric", "Bug"], prefEvol: ["Base", "First"], gen: 1, balTeam: FALSE, legendary: FALSE, catchPhrase: "My Pokemon research is going to be groundbreaking.", partyCount: [1, 2, 3], forbidTypes: ["Allothers"], prefRarity: ["Uncommon"] , prefBG: "bg-city.png"},
	sisandbro = { type: "Sis And Bro", gender: "Both", photoID: "sisandbro", numNames: 2, heightOvrd: -1, prefTypes: ["Normal"], prefEvol: ["Base", "First"], gen: 1, balTeam: FALSE, legendary: FALSE, catchPhrase: "Together we can beat anyone!", partyCount: [2, 4], forbidTypes: ["Allothers"], prefRarity: ["Common", "Baby"] , prefBG: "bg-beach.png"},
	skiier = { type: "Skiier", gender: "Any", photoID: "skiier", numNames: 1, heightOvrd: 5, prefTypes: ["Ice", "Ice"], prefEvol: ["First"], gen: 1, balTeam: FALSE, legendary: FALSE, catchPhrase: "You're going to eat my powder!.", partyCount: [1, 2, 3], forbidTypes: ["Allothers"], prefRarity: ["Uncommon"] , prefBG: "bg-snow.png"},
	supernerd = { type: "Super Nerd", gender: "Male", photoID: "supernerd", numNames: 1, heightOvrd: 3.5, prefTypes: ["Electric", "Bug"], prefEvol: ["Base", "First"], gen: 1, balTeam: FALSE, legendary: FALSE, catchPhrase: "Have you EV trained your Pokemon?", partyCount: [1, 2, 3], forbidTypes: ["Allothers"], prefRarity: ["Rare", "Uncommon"] , prefBG: "bg-city.png"},
	swimmer = { type: "Swimmer", gender: "Any", photoID: "swimmer", numNames: 1, heightOvrd: 5, prefTypes: ["Water", "Water", "Water"], prefEvol: ["Base", "First"], gen: 1, balTeam: FALSE, legendary: FALSE, catchPhrase: "I love the ocean waves, makes me want to battle!", partyCount: [1, 2, 3], forbidTypes: ["Allothers"], prefRarity: ["Uncommon"] , prefBG: "bg-beach.png"},
	tamer = { type: "Tamer", gender: "Male", photoID: "tamer", numNames: 1, heightOvrd: -1, prefTypes: ["Normal"], prefEvol: ["Max"], gen: 1, balTeam: FALSE, legendary: FALSE, catchPhrase: "You haven't seen Pokemon THIS strong!", partyCount: [1, 2, 3], forbidTypes: ["Allothers"], prefRarity: ["Uncommon"] , prefBG: "bg-field.png"},
	teacher = { type: "Teacher", gender: "Female", photoID: "teacher", numNames: 1, heightOvrd: -1, prefTypes: ["Normal"], prefEvol: ["First"], gen: 1, balTeam: FALSE, legendary: FALSE, catchPhrase: "Let's see what you've learned.", partyCount: [1, 2], forbidTypes: ["Allothers"], prefRarity: ["Uncommon"] , prefBG: "bg-city.png"},
	teammates = { type: "Teammates", gender: "Female", photoID: "teammates", numNames: 2, heightOvrd: 4.5, prefTypes: ["Fire", "Water", "Grass", "Electric"], prefEvol: ["First"], gen: 1, balTeam: FALSE, legendary: FALSE, catchPhrase: "You can beat us when we battle together!", partyCount: [2, 4], forbidTypes: ["Allothers"], prefRarity: ["Uncommon"] , prefBG: "bg-field.png"},
	triathlete = { type: "Triathlete", gender: "Any", photoID: "triathlete", numNames: 1, heightOvrd: 4.5, prefTypes: ["Water", "Grass", "Fire"], prefEvol: ["Base", "First"], gen: 1, balTeam: TRUE, legendary: FALSE, catchPhrase: "Pokemon battling is my strongest event!", partyCount: [3], forbidTypes: ["Allothers"], prefRarity: ["Uncommon"] , prefBG: "bg-cycling.png"},
	tuber = { type: "Tuber", gender: "Any", photoID: "tuber", numNames: 1, heightOvrd: 3.5, prefTypes: ["Water", "Water"], prefEvol: ["Base"], gen: 1, balTeam: FALSE, legendary: FALSE, catchPhrase: "Going tubing is almost as fun as battling Pokemon!", partyCount: [1, 2, 3], forbidTypes: ["Allothers"], prefRarity: ["Common", "Uncommon"] , prefBG: "bg-beach.png"},
	twins = { type: "Twins", gender: "Female", photoID: "twins", numNames: 2, heightOvrd: 3.5, prefTypes: ["Fairy", "Electric", "Bug"], prefEvol: ["Base"], gen: 1, balTeam: FALSE, legendary: FALSE, catchPhrase: "You can't beat us when we battle together!", partyCount: [2, 4], forbidTypes: ["Allothers"], prefRarity: ["Common", "Baby"] , prefBG: "bg-city.png"},
	youngcouple = { type: "Young Couple", gender: "Both", photoID: "youngcouple", numNames: 2, heightOvrd: -1, prefTypes: ["Any"], prefEvol: ["First"], gen: 1, balTeam: FALSE, legendary: FALSE, catchPhrase: "Darling, should we battle? Why yes, I think we should.", partyCount: [2, 4], forbidTypes: [""], prefRarity: ["Uncommon"] , prefBG: "bg-city.png"},
	youngster = { type: "Youngster", gender: "Male", photoID: "youngster", numNames: 1, heightOvrd: 3.5, prefTypes: ["Normal", "Bug"], prefEvol: ["Base"], gen: 1, balTeam: FALSE, legendary: FALSE, catchPhrase: "I love shorts!  They're comfy and easy to wear.", partyCount: [1, 2, 3], forbidTypes: ["Allothers"], prefRarity: ["Common", "Baby"] , prefBG: "bg-forrest.png"}];

var player = { type: "Player", gender: "Male", photoID: "player", numNames: 1, heightOvrd: -1, prefTypes: ["Any"], prefEvol: ["Max", "Second"], gen: 0, balTeam: true, legendary: true, catchPhrase: "I wanna be the very best!", partyCount: [6], forbidTypes: [""], prefRarity: ["Uncommon", "Rare"] , prefBG: "bg-holodeck.png"};

var gymLeader = { type: "Gym Leader", gender: "Any", photoID: "gymLeader", numNames: 1, heightOvrd: -1, prefTypes: ["Normal", "Bug", "Fire", "Water", "Grass", "Electric", "Rock", "Ground", "Fighting", "Flying", "Psychic", "Dark", "Poison", "Ice", "Steel", "Fairy", "Dragon"], prefEvol: ["First","Second"], gen: 1, balTeam: FALSE, legendary: FALSE, catchPhrase: "Let me see how strong you really are!", partyCount: [2, 3, 4], forbidTypes: ["Allothers"], prefRarity: ["Uncommon", "Rare"] , prefBG: "bg-gl"};
var eliteFour = { type: "Elite Four", gender: "Any", photoID: "gymLeader", numNames: 1, heightOvrd: -1, prefTypes: ["Normal", "Bug", "Fire", "Water", "Grass", "Electric", "Rock", "Ground", "Fighting", "Flying", "Psychic", "Dark", "Poison", "Ice", "Steel", "Fairy", "Dragon"], prefEvol: ["Second","Max"], gen: 1, balTeam: FALSE, legendary: FALSE, catchPhrase: "So, you've beaten all the gym leaders?", partyCount: [5, 6], forbidTypes: ["Allothers"], prefRarity: ["Uncommon", "Rare"] , prefBG: "bg-gl"};




function getTrainerName(gender, txt) {

	if ((txt != '') && (txt != "GYMLEADER")) {

		return txt;

	} else {
		if (gender == "Male") {
			return names.maleName();
		} else {
			return names.femaleName();
		}

	}
	return 'Le Fail';
}

function getPokeTeam(trainer) {

	var team = pokemon.buildTeam(trainer);

	return team;
}

function trainerCopy(trainer) {
	var output = {type: trainer.type, gender: trainer.gender, photoID: trainer.photoID, numNames: trainer.numNames, heightOvrd: trainer.heightOvrd, prefTypes: trainer.prefTypes, prefEvol: trainer.prefEvol, gen: trainer.gen, balTeam: trainer.balTeam, legendary: trainer.legendary, catchPhrase: trainer.catchPhrase, partyCount: trainer.partyCount, forbidTypes: trainer.forbidTypes, prefRarity: trainer.prefRarity , prefBG: trainer.prefBG};
	return output;
}