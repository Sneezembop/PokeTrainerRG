console.log('the bot is starting');
var Twit = require('twit');
var Trainer = require('./trainerBuilder')

var fs = require('fs');

var config = require('./config');
const aws = require('aws-sdk');

let s3 = new aws.S3({
	accessKeyId: config.S3_KEY,
	secretAccessKey: config.S3_SECRET
});

//var newTrainer = new Trainer();
var T = new Twit(config);

var reachOutList = [''];

reachOut(reachOutList.pop());
//buildTweet('MilesLeMighty');
//makeTest('Sneezembop');
setInterval(buildTweet, 1000 * 60 * 60 * 3, '');
setInterval(buildTweet, 1000 * 60 * 60 * 7, 'GYMLEADER');
setInterval(reachOut, 1000 * 60 * 60 * 13, reachOutList[0]);
//setInterval(makeTest,1000*10,'GYMLEADER');


// follower stream reply
var stream = T.stream('user');
stream.on('follow', followed);

function followed(eventMsg) {
	if (eventMsg.source.screen_name != "PokeTrainerRG") {
		console.log('you were followed');
		var screenName = eventMsg.source.screen_name;
		buildTweet(screenName);
	}
}

function buildTweet(txt) {
	Trainer.buildTrainer(txt, function (tweet) {
		tweetPic(tweet, txt);
	});


}



function tweetPic(img, txt) {

	var base64 = fs.readFileSync(img, { encoding: 'base64' });

	T.post('media/upload', { media_data: base64 }, uploaded);

	function uploaded(err, data, response) {
		// this is where I will tweet a picture
		var message = "#PokeTrainerRG"
		if (txt != '') {
			message += " @" + txt;
		}

		var id = data.media_id_string;
		var tweet = {
			status: message,
			media_ids: [id]
		}
		T.post('statuses/update', tweet, tweeted);
	}

}

// tweets the given text.
function tweetIt(txt) {

	var tweet = {
		status: txt
	}
	T.post('statuses/update', tweet, tweeted);

}

function tweeted(err, data, response) {
	if (err) {
		console.log("Error:");
		console.log(err);

	} else {

		console.log("It worked!");
	}

}

function makeTest(txt) {
	Trainer.buildTrainer(txt, function (tweet) { });
}

function reachOut(target) {
	if (target != '') {
		buildTweet(target);
	} else {
		T.get('search/tweets', { q: '#Pokemon Pokemon filter:safe', count: 5 }, function (err, data, response) {
			if (err) throw err;



			for (i = 0; i < data.search_metadata.count; i++) {

				//console.log(data.statuses[i].user);

				//if(data.statuses[i].user.screen_name)
				reachOutList.push(data.statuses[i].user.screen_name);
			}
			console.log(reachOutList);

			if (reachOutList[0] == undefined) {
				reachOutList[0] = '';

			} else {
				buildTweet(reachOutList.pop());

				console.log(reachOutList);
			}



		});
	}

}