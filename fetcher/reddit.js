// (r.json)[1]['data']['children'][0]['data']['body']
// http://www.reddit.com/comments/1ljphv.json

var request = require('request');

module.exports = function(episode) {
	var events = require('events');
	var eventEmitter = new events.EventEmitter();
	queryTwitter(episode);
	return eventEmitter;
}

var queryReddit = function(options) {
	// var x = new Date(options.airDate);
	request.get({
		url: options.url, //'http://www.reddit.com/comments/1ljphv.json'
		qs: {
			sort: 'top'
		}},
		function(err, res, data){
			if (err){
				console.log("error");
				process.exit(0);
			}
			try{
				data = JSON.parse(data);
			} catch (e){
				console.log("JSON error", e);
				return process.exit(0);
			}

			comments = data[1]['data']['children'];
			var x = [];
			for (var i = 0; i < comments.length; i++) {
				if (comments[i]['data']['body'] !== undefined &&
					comments[i]['data']['author'] !== undefined &&
					comments[i]['data']['created_utc'] !== undefined) {
					x.push({
						comment: comments[i]['data']['body'],
						user_name: comments[i]['data']['author'],
						date: comments[i]['data']['created_utc']
					})
			}
		};
		eventEmitter.emit('comments', {id:options._id, 'comments':x});
	});
}