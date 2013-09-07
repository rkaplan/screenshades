#!/usr/bin/env node 
var nodeio = require('node.io');
exports.job = new nodeio.Job({
    input: false,
    run: function () {
        var url = 'http://en.wikipedia.org/wiki/' + this.options.args.join('_') + '_episodes';
        this.getHtml(url, function(err, $) {
            if (err) {
                this.exit(err);
            } else {
                // var episode_num = {};
                // var next_episode = 1;
                // var seasons = $($('.wikitable')[0]).find('tr');
                // for (var i = 2; i <= seasons.length - 1; i++) {
                // 	var season_num = $($(seasons[i]).find('td')[1]).text();
                // 	var episode_amount = $($(seasons[i]).find('td')[2]).text();
                // 	for (var x = next_episode; x < episode_amount + next_episode; x++) {
                // 		episode_num[x] = season_num;
                // 	};
                // 	next_episode = this.emit($($(seasons[i]).find('td')[1]).text());
                // };

                var episodes = $('.vevent');
                var episodes_parsed = [];
            	var x = [];
            	$('.vevent').each(function(a) {
            		console.log(a);
            		x.push(a.find('th').text);
            	});
                console.log(x);
                for (var i = episodes.length - 1; i >= 0; i--) {
                	this.exit();
                	// console.log($($('.vevent')[i]).find("th"));
                	episodes_parsed = {
                		// title: $($($('.vevent')[i]).find("td")[1]).text,
                		// number: $($('.vevent th')[i]).text,
                		// date: $($($('.vevent')[i]).find("td")[4]).text
                		// season: 
                	}
                };
            }
        });
    }
});