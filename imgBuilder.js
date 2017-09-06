var Jimp = require('jimp');
var config = require('./config');
const aws = require('aws-sdk');
/*
let s3 = new aws.S3({
	accessKeyId: config.S3_KEY,
	secretAccessKey: config.S3_SECRET
});
*/
exports.buildImage = (trainer, poketeam, callback) => buildImage(trainer, poketeam, callback);

function buildImage(trainer, poketeam, callback) {
	var trainerIMGname = config.s3db + "trainers/" + trainer.photoID;
	switch (trainer.gender) {
		case "Male":
			trainerIMGname += "-m";
			break;
		case "Female":
			trainerIMGname += "-f";
			break;
		case "Both":
			trainerIMGname += "-b";
			break;
	}
	trainerIMGname += ".png";

	//console.log(poketeam);
	//console.log(poketeam[0].name);

	if (trainer.heightOvrd == -1) {
		if (trainer.gender == "Male") {
			trainer.heightOvrd = 5.7;
		} else {
			trainer.heightOvrd = 5.5;
		}
	}
	var maxHeight = trainer.heightOvrd;
	var heightLtd = 9;
	var pokeIMGnames = [];
	var totalMissingPkmn = 0;
	for (var i = 0; i < 6; i++) {
		if (i < poketeam.length) {
			//console.log(poketeam[i].photoID);

			pokeIMGnames.push({ name: poketeam[i].name, imgname: config.s3db + "pokemon/" + poketeam[i].photoID, height: poketeam[i].height });
			if (maxHeight < poketeam[i].height) {
				if (poketeam[i].height <= heightLtd) {
					maxHeight = poketeam[i].height;
				} else {
					maxHeight = heightLtd;
				}

			}

		} else {
			pokeIMGnames.push({ name: '', imgname: config.s3db + "pokemon/empty.png", height: 0.1 });
			totalMissingPkmn++;
		}

	}

	pokeIMGnames.sort(function (a, b) {
		return a.height - b.height;
	});
	//console.log(pokeIMGnames);

	var imgspace = 180;
	var imgposy = 305;
	var imgposx = [80, 160, 240, 320, 400, 480, 560];
	var textposx = [80, 160, 240, 320, 400, 480, 560];
	var fontPath = "./node_modules/jimp/fonts/PokemonGB/PokemonGB";

	/*
	s3.getObject({ Bucket: "poketrainerrg", Key: "images/pokemon/0.png" }, function (err, data) {
		console.log(data);
	});
	*/

	Jimp.read(config.s3db + trainer.prefBG, function (err, bgImg) {
		if (err) throw err;
		Jimp.read(config.s3db + "textbox.png", function (err, textBox) {
			if (err) throw err;

			Jimp.read(pokeIMGnames[0].imgname, function (err, pokeImg0) {
				if (err) throw err;
				Jimp.read(pokeIMGnames[1].imgname, function (err, pokeImg1) {
					if (err) throw err;
					Jimp.read(pokeIMGnames[2].imgname, function (err, pokeImg2) {
						if (err) throw err;
						Jimp.read(pokeIMGnames[3].imgname, function (err, pokeImg3) {
							if (err) throw err;
							Jimp.read(pokeIMGnames[4].imgname, function (err, pokeImg4) {
								if (err) throw err;
								Jimp.read(pokeIMGnames[5].imgname, function (err, pokeImg5) {
									if (err) throw err;
									Jimp.read(trainerIMGname, function (err, trainerImg) {
										if (err) throw err;
										Jimp.loadFont("pkgb-16.fnt", function (err, fontBig) {
											if (err) throw err;
											Jimp.loadFont("pkgb-8.fnt", function (err, fontSm) {
												if (err) throw err;
												Jimp.loadFont("pkgb-12.fnt", function (err, fontMed) {
													if (err) throw err;



													pokeImg0.resize(Jimp.AUTO, (imgspace * pokeIMGnames[0].height / maxHeight), Jimp.RESIZE_BICUBIC);
													pokeImg1.resize(Jimp.AUTO, (imgspace * pokeIMGnames[1].height / maxHeight), Jimp.RESIZE_BICUBIC);
													pokeImg2.resize(Jimp.AUTO, (imgspace * pokeIMGnames[2].height / maxHeight), Jimp.RESIZE_BICUBIC);
													pokeImg3.resize(Jimp.AUTO, (imgspace * pokeIMGnames[3].height / maxHeight), Jimp.RESIZE_BICUBIC);
													pokeImg4.resize(Jimp.AUTO, (imgspace * pokeIMGnames[4].height / maxHeight), Jimp.RESIZE_BICUBIC);
													pokeImg5.resize(Jimp.AUTO, (imgspace * pokeIMGnames[5].height / maxHeight), Jimp.RESIZE_BICUBIC);
													trainerImg.resize(Jimp.AUTO, (imgspace * trainer.heightOvrd / maxHeight), Jimp.RESIZE_BICUBIC);

													var sortedImgs = [pokeImg0, pokeImg1, pokeImg2, pokeImg3, pokeImg4, pokeImg5];



													console.log("images resized");
													//console.log(pokeImg0.bitmap.width);

													var printOrder = [2, 4, 1, 5, 0, 6];
													for (var i = 0; i < totalMissingPkmn; i++) {
														printOrder.pop();

													}

													printOrder.sort(function (a, b) { return 0.5 - Math.random() });

													for (var i = 0; i < totalMissingPkmn; i++) {
														printOrder.unshift(6);

													}


													//console.log(printOrder);

													/*
													console.log(imgposx);
													var lastImgDiff = Math.max(90 - trainerImg.bitmap.width / 2, 0);
													console.log("trainerImgDif: " + lastImgDiff);

													imgposx[2] += lastImgDiff;
													imgposx[4] -= lastImgDiff;
													imgposx[1] += Math.max(90 - sortedImgs[5].bitmap.width / 2, 0);
													imgposx[5] -= Math.max(90 - sortedImgs[4].bitmap.width / 2, 0);
													imgposx[0] += Math.max(90 - sortedImgs[3].bitmap.width / 2, 0);
													imgposx[6] -= Math.max(90 - sortedImgs[2].bitmap.width / 2, 0);

													console.log(imgposx);
													*/

													for (var i = 5; i >= 0; i--) {
														imgposx[printOrder[i]] -= (sortedImgs[i].bitmap.width / 2);

														bgImg.composite(sortedImgs[i], imgposx[printOrder[i]], imgposy - sortedImgs[i].bitmap.height);
													}



													bgImg.composite(trainerImg, imgposx[3] - (trainerImg.bitmap.width / 2), imgposy - trainerImg.bitmap.height);

													bgImg.composite(textBox, 0, 0);

													if (trainer.numNames > 1) {
														bgImg.print(fontMed, 30, 30, trainer.type + ' ' + trainer.name + ' want to battle!');
													} else {
														bgImg.print(fontMed, 30, 30, trainer.type + ' ' + trainer.name + ' wants to battle!');
													}

													bgImg.print(fontSm, 35, 60, "\"" + trainer.catchPhrase + "\"");

													var teamLabel = "Team:";
													for (var i = 5; i >= 0; i--) {


														teamLabel += ' ' + pokeIMGnames[i].name;

														//bgImg.print(fontSm, textposx[printOrder[i]] - 10, 305, pokeIMGnames[i].name);	
													}


													bgImg.print(fontSm, 15, 310, teamLabel);

													//newTrainer.type + ' ' + newTrainer.name + ' wants to battle!
													console.log("composite completed");

													var randomnum = Math.floor(Math.random() * 10000000);

													//var outputDir = "./TestOutput/" + trainer.type + "-" + randomnum + ".png";
													var outputDir = "upload.png";


													bgImg.write(outputDir, function () {
														callback(outputDir);
													});
												});
											});
										});
									});
								});
							});
						});
					});
				});
			});
		});


		console.log("ready to return");

		return "upload.png";
	});

	return "upload.png";

}
