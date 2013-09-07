#!/usr/bin/env node 
var jsdom = require("jsdom");

jsdom.env(
  "http://en.wikipedia.org/wiki/seinfeld_episodes",
  ["http://code.jquery.com/jquery.js"],
  function (errors, window) {
    // console.log("there have been", window.$("a").length, "nodejs releases!");
	var episode_num = {};
	var next_episode = 1;
	var seasons = window.$(window.$(window.$('.wikitable')[0]).find('tr'));
	for (var i = 2; i <= seasons.length - 1; i++) {
		var season_num = window.$(window.$(seasons[i]).find('td')[1]).text();
		var episode_amount = Number(window.$(window.$(seasons[i]).find('td')[2]).text());
		for (var x = next_episode; x < episode_amount + next_episode; x++) {
			episode_num[x] = season_num;
		};
		next_episode = episode_amount + next_episode;
	};
	// console.log(episode_num);
	console.log('next');

	var episodes = window.$('.vevent');
	var episodes_parsed = [];
	var x = [];
	for (var i = episodes.length - 1; i >= 0; i--) {
		episodes_parsed.push({
			title: window.$(window.$(window.$('.vevent')[i]).find("td")[1]).text(),
			number: window.$(window.$('.vevent th')[i]).text(),
			date: window.$(window.$(window.$('.vevent')[i]).find("td")[4]).text(),
			season: episode_num[window.$(window.$('.vevent th')[i]).text()],
			episode_number: window.$(window.$(window.$('.vevent')[i]).find("td")[0]).text()
		})
	};
	console.log(episodes_parsed);
  }
);