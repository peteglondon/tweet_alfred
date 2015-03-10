var Twit = require('twit')



var T = new Twit({
    consumer_key:         'fho8yfZXR04uZCh71ggmAw6Ms'
  , consumer_secret:      '7ermDjw7gTjOb2iPv8TRmkgdKgsGzbMLOnnbdIW41xWW8gTxxz'
  , access_token:         '3083655844-y8oSp3ChDtXjv0dnFtxSWPAvSpiypEnbF6Zji0r'
  , access_token_secret:  'LeFCsVoXQ0Sy7v3URFXJFF055HJQQqp7sHrhg2kJRfMqW'
});

var stream = T.stream('user');

var Client = require('node-rest-client').Client;
 
var client = new Client();


var tweetUser = function (name, message){
	var message = '@' + name + ' ' + message;
	console.log('Sending : ' + message);
	T.post('statuses/update', { status:  message}, function(err, data, response) {
		if (err){
			console.log('error: ' + err);
	  		console.log('data : ' + data);
	  	}
	})
};


stream.on('tweet', function (tweet) {
	try{
	    if (tweet.user.screen_name === 'tweet_alfred'){ return;}
	    console.log(tweet.text);
	    var args = {
			  data: { text: tweet.text.replace('@tweet_alfred', '').trim(),
			  twitterId: tweet.user.id },
			  headers:{
			  	"Content-Type": "application/json"
			  } 
			};
		console.log(args)
		client.post("http://askalfred.herokuapp.com/messages", args, function(data, response){
			console.log('handling response');
			console.log(data)
			var parsedData = JSON.parse(data);
		 	tweetUser(tweet.user.screen_name, parsedData.text + ' http://askalfred.herokuapp.com?twitterId=' + tweet.user.id);
		})
	}
	catch(err){
		console.log('Error : ' + err);
	}
})