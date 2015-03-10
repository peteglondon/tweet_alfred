var Twit = require('twit')

var T = new Twit({
    consumer_key:         'fho8yfZXR04uZCh71ggmAw6Ms'
  , consumer_secret:      '7ermDjw7gTjOb2iPv8TRmkgdKgsGzbMLOnnbdIW41xWW8gTxxz'
  , access_token:         '3083655844-y8oSp3ChDtXjv0dnFtxSWPAvSpiypEnbF6Zji0r'
  , access_token_secret:  'LeFCsVoXQ0Sy7v3URFXJFF055HJQQqp7sHrhg2kJRfMqW'
});

var stream = T.stream('user')

stream.on('tweet', function (tweet) {
	try{
	    tweetUser(tweet.user.screen_name, 
	  	getReply(tweet.text))
	}
	catch(err){
		console.log('Error : ' + err);
	}
})