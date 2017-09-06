
var pokedata = require('./PokemonData.js');
// pokemon.js
// holds the pokemon database and selection files.
var FALSE = false;
var TRUE = true;
exports.buildTeam = (trainer) => buildTeam(trainer);

// evolutions: "Base", "1st", "Max", "2nd", "Baby", "Any"
// generation: 1, 2, 3, 4, 5, 6, 7    0 -> 'Any'

var default_pokedex = pokedata.pokedex;
//console.log(pokedata.pokedex);

function buildTeam(trainer) {
	var c_trainer = trainer;

	var pokeCount = getCount(c_trainer);
	var pokeTeam = [];

	var pokedex = adjustWeights(c_trainer, default_pokedex);

	for (var i = 0; i < pokeCount; i++) {

		var newPokemon = getPokemon(c_trainer, pokedex)
		if (pokeTeam == []) {
			pokeTeam.push(newPokemon);

		} else {

			if (((trainer.balTeam) && (typeSatisfied(newPokemon, pokeTeam))) ||
				((pokeTeam.includes(newPokemon)) && (Math.random > 0.5))) {
				//console.log("picking again!");
				i--;

			} else {
				pokeTeam.push(newPokemon);
			}
		}
	}



	return pokeTeam;
}



function getCount(trainer) {
	var count = Math.floor(Math.random() * trainer.partyCount.length);


	return trainer.partyCount[count];
}

function getPokemon(trainer, pokedex) {

	var pokemon = pokedata.missingno;

	var totWgt = 0;

	var copy_pokedex = pokedex;


	for (var i = 0; i < copy_pokedex.length; i++) {

		//console.log(copy_pokedex[i].weight);
		totWgt += copy_pokedex[i].weight;

	}

	var pick = Math.random() * totWgt;

	for (var j = 0; j < copy_pokedex.length; j++) {
		pick -= copy_pokedex[j].weight;

		if (pick <= 0) {
			return copy_pokedex[j];

		}

	}

	return pokemon;
}

function adjustWeights(trainer, pokedex) {

	var copy_trainer = trainer;
	var pokedex = pokedex;

	for (var i = 0; i < pokedex.length; i++) {




		for (var j = 0; j < copy_trainer.prefTypes.length; j++) {
			if ((pokedex[i].types.includes(copy_trainer.prefTypes[j])) || (copy_trainer.prefTypes.includes('Any'))) {
				pokedex[i].weight = pokedex[i].weight + 1000;
				//console.log("Type Match!");
			}
			if ((copy_trainer.forbidTypes.includes('Allothers')) && (!pokedex[i].types.includes(copy_trainer.prefTypes[j]))) {
				pokedex[i].weight = pokedex[i].weight / 100;
			}

		}

		for (var k = 0; k < copy_trainer.prefEvol.length; k++) {
			if ((pokedex[i].evolution.includes(copy_trainer.prefEvol[k])) || (copy_trainer.prefEvol.includes('Any'))) {
				pokedex[i].weight = pokedex[i].weight * 10;
				//console.log("EVOL Match!");
			}
		}

		for (var l = 0; l < copy_trainer.forbidTypes.length; l++) {
			if ((pokedex[i].types.includes(copy_trainer.forbidTypes[l])) && (!copy_trainer.forbidTypes.includes('Allothers'))) {
				pokedex[i].weight = pokedex[i].weight / 100;
			}
		}

		if (copy_trainer.prefRarity.includes(pokedex[i].rarity)) {
			pokedex[i].weight *= 10;
		} else {
			pokedex[i].weight *= 1 / 10;
		}


		if ((!copy_trainer.legendary) && (pokedex[i].legendary)) {
			pokedex[i].weight *= 0;
			//console.log("Legendary Ban!");
		} else if ((copy_trainer.legendary) && (pokedex[i].legendary)) {
			pokedex[i].weight *= 10;
		} else if ((!copy_trainer.legendary) && (pokedex[i].evolution.includes('Mega'))) {
			pokedex[i].weight *= 0;

		}



	}

	//console.log(pokedex);
	return pokedex;
}

function typeSatisfied(pokemon, team) {

	for (var i = 0; i < team.length; i++) {
		for (var j = 0; j < team[i].types.length; j++) {
			for (var k = 0; k < pokemon.types.length; k++) {

				if (pokemon.types[k] == team[i].types[k]) {
					return true;
				}

			}
		}
	}

	return false;
}