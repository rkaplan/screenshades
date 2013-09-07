#!/usr/bin/env node 
var jsdom = require("jsdom");

jsdom.env(
  "http://en.wikipedia.org/wiki/breaking_bad_episodes",
  ["http://code.jquery.com/jquery.js"],
  function (errors, window) {
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
	console.log('next');

	var episodes = window.$('.vevent');
	var episodes_parsed = [];
	var x = [];

	for (var i = episodes.length - 1; i >= 0; i--) {
		if (!(parseInt(window.$(window.$(window.$('.vevent')[i]).find("td")[0]).text()) > 0)){
			continue;
		}
		episodes_parsed.push({
			title: window.$(window.$(window.$('.vevent')[i]).find("td")[1]).text(),
			total_number: window.$(window.$('.vevent th')[i]).text(),
			date: (window.$(window.$(window.$(window.$('.vevent')[i]).find("td")[4]).find("span")).text()).split(')')[1],
			season: episode_num[window.$(window.$('.vevent th')[i]).text()],
			episode_number: window.$(window.$(window.$('.vevent')[i]).find("td")[0]).text()
		})
	};
	console.log(episodes_parsed);
  }
);

