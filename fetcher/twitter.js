var request = require('request');
var requested = 0;

module.exports = function(episode) {
	var events = require('events');
	var eventEmitter = new events.EventEmitter();
	queryTwitter();
	return eventEmitter;
}

var queryTwitter = function(show, airDate, _id) {
	var x = new Date(airDate);
	request.get({
			url: 'https://api.twitter.com/1.1/search/tweets.json',
			form: {
				q: show.replace(' ','_') + ' #spoiler',
				until: x.getYear() + '-' + x.getMonth() + '-' + x.getDay(),
				count: 100
			},
			headers: {
				Authorization: 'Bearer AAAAAAAAAAAAAAAAAAAAAJoMTQAAAAAAT%2FPSdfp9Hh5tDPPnJ9UlQTokHWY%3DJGg4pQ5NkGtH4GlyBDVy0wEHWQfpAiS24PgaYG22k'
			},
			success: function(data){
				console.log(data['statuses'].length);
				var x = [];
				for (var i = data['statuses'].length - 1; i >= 0; i--) {
					x.push({
						tweet: data['statuses'][i]['text'],
						handle: data['statuses'][i]['user']['screen_name'],
						date: data['statuses'][i]['created_at']
					})
				};
				console.log(x);
				eventEmitter.emit('tweets', {id:_id, 'tweets':x});
			}
		}, function () {
			requested++;
			if (requested <= 100) {
				queryTwitter();
			}
		});
}